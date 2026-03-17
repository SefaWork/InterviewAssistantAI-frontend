import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'
import Header from './components/header/Header'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import AuthProvider from './context/AuthProvider'
import InterviewSetup from './pages/interview/InterviewSetup'
import InterviewPage from './pages/interview/InterviewPage'
import Topnav from './components/header/Topnav'
import PreferenceProvider from './context/PreferenceProvider'
import './App.css'
import About from './pages/home/About'

function App() {
  return (
    <AuthProvider>
      <PreferenceProvider>
        <BrowserRouter>
          <div className='app'>
              <Header />
              <Topnav />
              <div className='app-content'>
                <Routes>
                  {/*Pages of the website. */}
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/interview/setup' element={<InterviewSetup />} />
                  <Route path='/interview' element={<InterviewPage />} />
                  <Route path='/about' element={<About />} />

                  {/*Wild route to catch all invalid routes. */}
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
          </div>
        </BrowserRouter>
      </PreferenceProvider>
    </AuthProvider>
  )
}

export default App
