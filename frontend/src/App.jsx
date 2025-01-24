import { useState } from 'react'
import './App.css'
import AuthForm from './components/AuthForm/AuthForm'

export default function App() {

  const [user, setUser] = useState(null)

  return (
    <>
      {
        user === null
          ? <AuthForm fields={['username', 'email', 'password']} endpoint='http://localhost:8000/api/signup' login={setUser} />
          : 'Hello ' + user.username
      }
    </>
  )
}
