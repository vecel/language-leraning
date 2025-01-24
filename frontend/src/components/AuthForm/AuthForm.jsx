import { useState } from "react";
import { Fragment } from "react";
import axios from "axios";

export default function AuthForm({ fields, endpoint, login }) {

    const initialFormData = fields.reduce((acc, field) => ({...acc, [field]: ''}), {})
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors({})
        axios
            .post(endpoint, formData)
            .then(response => {
                console.log(response.data)
                login(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
                setErrors(error.response.data)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                fields.map(field => (
                    <Fragment key={field}>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            placeholder={field}
                            onChange={handleChange}
                            required
                        />
                        <span>
                            {errors[field + 'Error'] || ''}
                        </span>
                    </Fragment>
                ))
            }
            <span>
                {errors['error'] || ''}
            </span>
            <button type='submit'>Submit</button>
        </form>
    )
}