import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { useConnectToGit } from '../useConnectToGit'
import { API_BASE, OWNER, PULLS, REPO } from '../../utils/constants'

// Mock axios
vi.mock('axios')

// Mock data
const mockPullRequests = [
  {
    id: 1,
    number: 100,
    title: 'Test PR',
    state: 'open',
    html_url: 'https://github.com/test/pr/1',
    user: {
      login: 'testuser',
      avatar_url: 'https://github.com/testuser.png',
      html_url: 'https://github.com/testuser'
    },
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    labels: [
      {
        id: 1,
        name: 'bug',
        color: 'red'
      }
    ]
  }
]

describe('useConnectToGit', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch pull requests successfully', async () => {
    // Mock successful API response
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPullRequests })

    // Render the hook
    const { result } = renderHook(() => useConnectToGit())

    // Initial state
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)
    expect(result.current.pullRequests).toEqual([])

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check final state
    expect(result.current.pullRequests).toEqual(mockPullRequests)
    expect(result.current.error).toBe(null)

    // Verify API call
    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE}${OWNER}/${REPO}/${PULLS}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )
  })

  it('should handle API error correctly', async () => {
    // Mock API error with proper Axios error structure
    const errorMessage = 'Failed to fetch PRs.'
    const mockAxiosError = {
        isAxiosError: true,
        response: {
            data: {
                message: errorMessage
            }
        }
    }
    vi.mocked(axios.get).mockRejectedValueOnce(mockAxiosError)

    // Render the hook
    const { result } = renderHook(() => useConnectToGit())

    // Wait for the API call to reject
    await waitFor(() => {
        expect(result.current.loading).toBe(false)
    })

    // Check error state
    expect(result.current.error).toBe(errorMessage)
    expect(result.current.pullRequests).toEqual([])
  })

  it('should handle unexpected errors', async () => {
    // Mock unexpected error
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('Network error'))

    // Render the hook
    const { result } = renderHook(() => useConnectToGit())

    // Wait for the API call to reject
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check error state
    expect(result.current.error).toBe('An unexpected error occurred.')
    expect(result.current.pullRequests).toEqual([])
  })

  it('should handle empty response', async () => {
    // Mock empty response
    vi.mocked(axios.get).mockResolvedValueOnce({ data: [] })

    // Render the hook
    const { result } = renderHook(() => useConnectToGit())

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check final state
    expect(result.current.pullRequests).toEqual([])
    expect(result.current.error).toBe(null)
  })
}) 