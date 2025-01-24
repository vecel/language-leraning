import { useState } from 'react'
import './App.css'
import AuthForm from './components/AuthForm/AuthForm'

export default function App() {

  const [user, setUser] = useState(null)

  return (
    <>
      {
        user === null
          ? <AuthForm setUser={setUser} />
          : 'Hello ' + user.username
      }
    </>
  )
}
