import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import { useState } from 'react'
import Toggle from './components/Toggle'

function App() {

  const [isDark, setIsDark] = useState(true);

  return (
    <div className="App" data-theme={isDark? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)}></Toggle>
      <BrowserRouter>
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
