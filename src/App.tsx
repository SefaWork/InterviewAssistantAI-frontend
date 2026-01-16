import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/home/NotFound'
import './App.css'
import Header from './components/header/Header'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
            <Header />
            <Routes>
              {/*Pages of the website. */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              {/*Wild route to catch all invalid routes. */}
              <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
