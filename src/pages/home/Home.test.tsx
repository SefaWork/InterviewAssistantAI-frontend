/*
    This is an example test file!
*/

import { render, screen } from  '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Home from './Home'

describe('Home', () => {
    it('renders welcome message', () => {
        render(<Home />)
        expect(screen.getByText('Welcome!')).toBeInTheDocument()
    })

    it('renders homepage text', () => {
        render(<Home />)
        expect(screen.getByText('This is the homepage!')).toBeInTheDocument()
    })
})