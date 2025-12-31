import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Pages of the website. */}
        <Route path='/' element={<Home />} />

        {/*Wild route to catch all invalid routes. */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
