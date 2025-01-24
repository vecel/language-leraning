import axios from "axios"

const url = 'http://localhost:8000/api'

const login = async ({ username, password }) => {
    const response = await axios.post(url + '/login', { username, password })
    return response.data
}

const signup = async ({ username, email, password }) => {
    const response = await axios.post(url + '/signup', { username, email, password })
    return response.data
}

export default { login, signup }