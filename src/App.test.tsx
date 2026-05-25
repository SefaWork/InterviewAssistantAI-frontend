import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from './test/test-util'
import App from './App'

import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'

vi.mock('./hooks/useRefresh', () => ({
    default: () => vi.fn().mockResolvedValue(undefined)
}))

describe('App Routing', () => {
    it('renders NotFound component on invalid route', async () => {
        window.history.pushState({}, '', '/invalid-route')
        const { getByTestId } = renderWithProviders(<App />)
        await waitFor(() => expect(getByTestId('NotFound')).toBeInTheDocument())
    })

    it('renders Header component on all routes', async () => {
        window.history.pushState({}, '', '/')
        const { getByTestId } = renderWithProviders(<App />)
        await waitFor(() => expect(getByTestId('Header')).toBeInTheDocument())
    })
})