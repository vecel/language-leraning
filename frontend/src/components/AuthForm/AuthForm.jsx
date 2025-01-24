import { useState } from "react";

import authService from '../../services/auth'

export default function AuthForm({ setUser }) {

    const initialFormData = { 
        username: '',
        email: '',
        password: ''
    }

    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrors({})
        try {
            console.log('here')
            const user = isLogin
                ? await authService.login({ username: formData.username, password: formData.password})
                : await authService.signup({...formData})
            setUser(user)
        } catch (exception) {
            console.log(exception)
            // status code 500 -> exception.response is undefined (should change in the backend)
            // status 401 -> exception.response.data is an object with errors
            setErrors(exception.response.data)
        }
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

    const auth = () => {
            
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