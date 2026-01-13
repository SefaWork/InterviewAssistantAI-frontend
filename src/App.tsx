import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import { useState } from 'react'
import Header from './components/header/Header'

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="App" data-theme={darkMode? "dark" : "light"}>
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
        <Routes>
          {/*Pages of the website. */}
          <Route path='/' element={<Home />} />

          {/*Wild route to catch all invalid routes. */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
