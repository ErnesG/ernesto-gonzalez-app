# Pull Request Viewer Documentation

## Project Overview

This is a React application built with TypeScript and Vite that displays and filters GitHub pull requests. The application uses a component-based architecture following atomic design principles.

## Prerequisites

- Node.js 22.13.1
- npm 10.9.2

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Key Features

- Fetches and displays pull requests from GitHub
- Filters pull requests by labels
- Responsive design using Tailwind CSS
- Loading states and error handling


## Architecture

The project follows Atomic Design methodology:

- Atoms (Basic Components)
  - Button: Reusable button component with active states
  - Label: Displays individual PR labels
  - Text: Typography component with variants
  - Link: External link component
  - Loader: Loading spinner animation
- Molecules (Compound Components)
  - FilterBar: Label filtering interface
  - GitCard: Pull request card display
- Organisms (Composite Components)
  - PullRequestList: List of pull requests with filtering and sorting options
- Templates (Page Templates)
  - Content: Main content area with header, filter, and pull request list
- Pages (Route-Specific Components)
  - Home: Root component for the application



## Key Dependencies

- React 19
- TypeScript
- Axios for API calls
- Tailwind CSS for styling 3.4.17, latest version is not stable for development.
- Vite for build tooling


## Best Practices Implemented

- Type Safety
- Comprehensive TypeScript interfaces
- Strict type checking enabled
- Error Handling
- API error management
- Loading states
- User feedback
- Component Architecture
- Atomic Design pattern
- Reusable components
- Props interface definitions
