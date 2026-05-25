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
import AccountSettings from './pages/account/AccountSettings'
import InterviewHistory from './pages/account/InterviewHistory'
import Logout from './pages/login/Logout'

import './App.css'
import PersistLogin from './components/auth/PersistLogin'

function App() {
  return (
      <div className='app'>
          <Header />
          <Topnav />
          <div className='app-content'>
            <Routes>
              {/*Routes inside this will have updated access token. */}
              <Route element={<PersistLogin />}>
                {/*Pages of the website that can be accessed regardless of authentication. */}
                <Route path='/' element={<Home />} />
                <Route path='/about/' element={<About />} />
                
                {/*These are pages that require user to be authenticated. Redirects to login if not authenticated. */}
                <Route element={<RequireAuth />}>
                  <Route path='/interview/:session/:ticket/' element={<InterviewPage />} />
                  <Route path='/interview/' element={<InterviewSetup />} />
                  <Route path='/account/' element={<AccountSettings />} />
                  <Route path='/history/:session/' element={<InterviewResults />} />
                  <Route path='/history/' element={<InterviewHistory />} />
                  <Route path='/account/' element={<AccountSettings />} />
                </Route>

                <Route path='/logout/' element={<Logout />} />

                {/*Wild route to catch all other routes. */}
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='/login/' element={<Login />} />
              <Route path='/register/' element={<Register />} />
            </Routes>
          </div>
      </div>
  )
}

export default App
