import { useState } from "react";
import axios from "axios";

export default function Form() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username, password)
        const credentials = {username, password}
        axios
            .post('http://localhost:8000/api/login', credentials)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text' 
                onChange={handleUsernameChange} 
            />
            <input 
                type='password'
                onChange={handlePasswordChange} 
            />
            <button type='submit'>Submit</button>
        </form>
    )
}