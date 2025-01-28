import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FormInput from "../atoms/FormInput";
import ErrorMessage from "../atoms/ErrorMessage";
import authService from '../../services/auth';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export default function AuthForm({ handleLogin }) {

    const navigate = useNavigate()

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
            handleLogin(user)
            navigate('/')
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
                <FormInput name={name} type={type} onChange={handleChange} />
                <ErrorMessage message={errors[name + 'Error'] || ''} />
            </>
        )
    }

    return (
        <Form key={isLogin} onSubmit={handleSubmit}>
            { field('username', 'text') }
            { !isLogin && field('email', 'email') }
            { field('password', 'password') }
            <button type='submit'>Submit</button>
            <ErrorMessage message={errors['error'] || ''} />
            { isLogin 
                ? <span>Don't have an account? Let's <span onClick={toggleLogin}>sign up</span></span>
                : <span>Already have an account? Let's <span onClick={toggleLogin}>log in</span></span>
            }
        </Form>
    )
}