import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Input from "../atoms/Input";
import ErrorMessage from "../atoms/ErrorMessage";
import authService from '../../services/auth';

import { TailSpin } from "react-loader-spinner"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 50vh;
`

const H1 = styled.h1`
    font-size: 2rem;
`

const Span = styled.span`
    cursor: ${props => props.$action ? 'pointer' : 'default' };
    color: ${props => props.$action ? 'var(--light-blue)' : 'inherit' }
`

export default function AuthForm({ handleLogin }) {

    const navigate = useNavigate()

    const initialFormData = { 
        username: '',
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setErrors({})
        try {
            const user = isLogin
                ? await authService.login({ username: formData.username, password: formData.password})
                : await authService.signup({...formData})
            handleLogin(user)
            setLoading(false)
            navigate('/')
        } catch (exception) {
            console.log(exception)
            if (!Object.hasOwn(exception, 'response')) {
                setErrors({ error: 'Network Error, cannot connect to server' })
            } else {
                setErrors(exception.response.data)
            }
            setLoading(false)
            // status code 500 -> exception.response is undefined (should change in the backend)
            // status 401 -> exception.response.data is an object with errors
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
                <Input name={name} type={type} onChange={handleChange} />
                <ErrorMessage message={errors[name + 'Error'] || ''} />
            </>
        )
    }

    return (
        <Form key={isLogin} onSubmit={handleSubmit}>
            <H1>
                { isLogin ? 'Welcome back!' : 'Create an account!' }
            </H1>
            { field('username', 'text') }
            { !isLogin && field('email', 'email') }
            { field('password', 'password') }
            <button type='submit'>Submit</button>
            <ErrorMessage message={errors['error'] || ''} />
            { isLogin 
                ? <span>Don't have an account? Let's <Span $action={true} onClick={toggleLogin}>sign up</Span></span>
                : <span>Already have an account? Let's <Span $action={true} onClick={toggleLogin}>log in</Span></span>
            }
            <TailSpin visible={loading} color='var(--light-blue)' width='24' height='24' wrapperStyle={{ justifyContent: 'center', marginTop: '1rem' }}/>
        </Form>
    )
}