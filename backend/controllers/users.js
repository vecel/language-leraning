const usersRouter = require('express').Router()

const User = require('../models/user')
const { createUser } = require('../services/userService')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, email, password } = request.body

    try {
        const user = await createUser(username, email, password)
        return response.status(201).send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter