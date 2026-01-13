import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/home/NotFound'
import './App.css'
import Header from './components/header/Header'
import Login from './pages/login/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/*Pages of the website. */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/*Wild route to catch all invalid routes. */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
