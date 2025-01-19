const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')
const validate = require('../utils/userValidator')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, email, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const errors = validate(username, email, password)
    if (Object.keys(errors).length !== 0)
        return response.status(400).json(errors)

    const user = new User({
        username,
        email,
        passwordHash
    })

    const saved = await user.save()
    response.status(201).send(saved)
})

module.exports = usersRouter