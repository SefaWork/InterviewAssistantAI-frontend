import { render } from '@testing-library/react'
import AuthProvider from '../context/AuthProvider'
import PreferenceProvider from '../context/PreferenceProvider'
import { BrowserRouter } from 'react-router-dom'

import '@testing-library/jest-dom'

export function renderWithProviders(ui: React.ReactElement) {
    return render(
        <BrowserRouter>
            <PreferenceProvider>
                <AuthProvider>
                    {ui}
                </AuthProvider>
            </PreferenceProvider>
        </BrowserRouter>
    )
}