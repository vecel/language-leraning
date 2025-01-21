const loginRouter = require('express').Router()

const { loginUser } = require('../services/userService')

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body

    try {
        const token = await loginUser(username, password)
        return response.status(200).json(token)
    } catch (error) {
    // response.status(401).json({ error: error.message })
        next(error)
    }
})

module.exports = loginRouter