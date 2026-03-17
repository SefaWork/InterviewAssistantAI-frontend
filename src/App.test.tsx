import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

import '@testing-library/jest-dom'

describe('App Routing', () => {
  it('renders NotFound component on invalid route', () => {
    window.history.pushState({}, '', '/invalid-route')
    const {getByTestId} = render(<App />)
    
    // Check if NotFound page is rendered.
    expect(getByTestId('NotFound')).toBeInTheDocument()
  })

  it('renders Header component on all routes', () => {
    window.history.pushState({}, '', '/')
    const {getByTestId} = render(<App />)
    
    // Header should be present on all pages.
    expect(getByTestId('Header')).toBeInTheDocument()
  })
})
