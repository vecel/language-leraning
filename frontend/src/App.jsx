import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Authorization from './pages/Authorization'
import Index from './pages/Index'
import Home from './pages/Home'

export default function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
      const userToken = JSON.parse(window.localStorage.getItem('userToken'))
      if (userToken)
        setUser(userToken)
  }, [])

  const handleLogin = (userToken) => {
    window.localStorage.setItem('userToken', JSON.stringify(userToken))
    setUser(userToken)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('userToken')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home handleLogout={handleLogout} /> : <Index />} />
        <Route path='/authorization' element={<Authorization handleLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  )
}
