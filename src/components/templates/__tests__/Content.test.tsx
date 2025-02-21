import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Content from '../Content'
import * as GitHook from '../../../hooks/useConnectToGit'

// Mock the useConnectToGit hook
vi.mock('../../../hooks/useConnectToGit', () => ({
  useConnectToGit: vi.fn()
}))

const mockPullRequests = [
  {
    id: 1,
    number: 100,
    title: 'First PR',
    state: 'open',
    html_url: 'https://github.com/test/pr/1',
    user: {
      login: 'user1',
      avatar_url: 'https://github.com/user1.png',
      html_url: 'https://github.com/user1'
    },
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    labels: [{ id: 1, name: 'bug', color: 'red' }]
  },
  {
    id: 2,
    number: 101,
    title: 'Second PR',
    state: 'open',
    html_url: 'https://github.com/test/pr/2',
    user: {
      login: 'user2',
      avatar_url: 'https://github.com/user2.png',
      html_url: 'https://github.com/user2'
    },
    created_at: '2024-03-21T10:00:00Z',
    updated_at: '2024-03-21T10:00:00Z',
    labels: [{ id: 2, name: 'feature', color: 'blue' }]
  }
]

describe('Content', () => {
  it('should render loading state', () => {
    vi.spyOn(GitHook, 'useConnectToGit').mockReturnValue({
      pullRequests: [],
      loading: true,
      error: null
    })

    render(<Content />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should render error state', () => {
    vi.spyOn(GitHook, 'useConnectToGit').mockReturnValue({
      pullRequests: [],
      loading: false,
      error: 'Failed to fetch PRs'
    })

    render(<Content />)
    expect(screen.getByText(/Error fetching pull request from Github/i)).toBeInTheDocument()
  })

  it('should render pull requests and filter labels', async () => {
    vi.spyOn(GitHook, 'useConnectToGit').mockReturnValue({
      pullRequests: mockPullRequests,
      loading: false,
      error: null
    })

    render(<Content />)

    // Check if both PRs are rendered
    expect(screen.getByText('First PR')).toBeInTheDocument()
    expect(screen.getByText('Second PR')).toBeInTheDocument()

    // Check if filter buttons are rendered - use role to be specific
    const bugButton = screen.getByRole('button', { name: /bug/i })
    const featureButton = screen.getByRole('button', { name: /feature/i })
    expect(bugButton).toBeInTheDocument()
    expect(featureButton).toBeInTheDocument()

    // Test filtering
    fireEvent.click(bugButton)
    await waitFor(() => {
      expect(screen.getByText('First PR')).toBeInTheDocument()
      expect(screen.queryByText('Second PR')).not.toBeInTheDocument()
    })
  })

  it('should clear filter when clicking active label', async () => {
    vi.spyOn(GitHook, 'useConnectToGit').mockReturnValue({
      pullRequests: mockPullRequests,
      loading: false,
      error: null
    })

    render(<Content />)

    // Apply filter - use role to be specific
    const bugButton = screen.getByRole('button', { name: /bug/i })
    fireEvent.click(bugButton)
    await waitFor(() => {
      expect(screen.queryByText('Second PR')).not.toBeInTheDocument()
    })

    // Clear filter
    fireEvent.click(bugButton)
    await waitFor(() => {
      expect(screen.getByText('First PR')).toBeInTheDocument()
      expect(screen.getByText('Second PR')).toBeInTheDocument()
    })
  })
}) 