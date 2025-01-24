import { useState } from "react";
import { Fragment } from "react";
import axios from "axios";

export default function AuthForm({ login }) {

    const initialFormData = { 
        username: '',
        email: '',
        password: ''
    }

    const url = 'http://localhost:8000/api'

    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors({})
        const endpoint = url + (isLogin ? '/login' : '/signup')
        const postData = isLogin
            ? { username: formData.username, password: formData.password }
            : { ...formData }

        axios
            .post(endpoint, postData)
            .then(response => login(response.data))
            .catch(error => setErrors(error.response.data))
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const toggleLogin = () => {
        setIsLogin(!isLogin)
        setFormData(initialFormData)
        setErrors({})
    }

    const field = (name, type) => {
        return (
            <>
                <input 
                    name={name}
                    type={type}
                    placeholder={name}
                    onChange={handleChange}
                    required
                />
                <span>
                    {errors[name + 'Error'] || ''}
                </span>
            </>
        )
    }

    return (
        <form key={isLogin} onSubmit={handleSubmit}>
            { field('username', 'text') }
            { !isLogin && field('email', 'email') }
            { field('password', 'password') }
            <span>
                {errors['error'] || ''}
            </span>
            <button type='submit'>Submit</button>
            { isLogin 
                ? <span>Don't have an account? Let's <span onClick={toggleLogin}>sign up</span></span>
                : <span>Already have an account? Let's <span onClick={toggleLogin}>log in</span></span>
            }
        </form>
    )
}