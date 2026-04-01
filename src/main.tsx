import './i18n.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '@fontsource/roboto/400.css'
import './main.css'
import PreferenceProvider from './context/PreferenceProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PreferenceProvider>
        <AuthProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
        </AuthProvider>
      </PreferenceProvider>
    </BrowserRouter>
  </StrictMode>,
)
