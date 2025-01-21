const signupRouter = require('express').Router()

const { createUser, loginUser } = require('../services/userService')

signupRouter.post('/', async (request, response, next) => {
    const { username, email, password } = request.body

    try {
        await createUser(username, email, password)
        const token = await loginUser(username, password)
        return response.status(200).json(token)
    } catch (error) {
        next(error)
    }
})

module.exports = signupRouter