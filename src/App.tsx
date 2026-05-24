import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'
import Header from './components/header/Header'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import InterviewSetup from './pages/interview/InterviewSetup'
import InterviewPage from './pages/interview/InterviewPage'
import Topnav from './components/header/Topnav'
import About from './pages/home/About'
import RequireAuth from './components/auth/RequireAuth'
import InterviewResults from './pages/interview/InterviewResults'
import './App.css'
import AccountSettings from './pages/account/AccountSettings'
import InterviewHistory from './pages/account/InterviewHistory'

function App() {
  return (
      <div className='app'>
          <Header />
          <Topnav />
          <div className='app-content'>
            <Routes>
              {/*Pages of the website that can be accessed regardless of authentication. */}
              <Route path='/' element={<Home />} />
              <Route path='/login/' element={<Login />} />
              <Route path='/register/' element={<Register />} />
              <Route path='/about/' element={<About />} />
              
              {/*These are pages that require user to be authenticated. Redirects to login if not authenticated. */}
              <Route element={<RequireAuth />}>
                <Route path='/interview/:session/:ticket/' element={<InterviewPage />} />
                <Route path='/interview/:session/' element={<InterviewResults />} />
                <Route path='/interview/' element={<InterviewSetup />} />
                <Route path='/account/' element={<AccountSettings />} />
                <Route path='/history/' element={<InterviewHistory />} />
              </Route>

              <Route path='/test_account_settings/' element={<AccountSettings />} />

              {/*Wild route to catch all other routes. */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
      </div>
  )
}

export default App
