const usersRouter = require('express').Router()

const User = require('../models/user')
const { createUser } = require('../services/userService')
const UserCreationError = require('../services/userError')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, email, password } = request.body

    try {
        const user = await createUser(username, email, password)
        return response.status(201).send(user)
    } catch (error) {
        if (error instanceof UserCreationError) 
            return response.status(400).json(error.errors)
        return response.status(400).json({ error: error.message })
    }
})

module.exports = usersRouter