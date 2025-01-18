const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const config = require('../utils/config')
const logger = require('../utils/logger')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    logger.debug(user)
    
    const authorized = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    logger.debug(authorized)

    if (!authorized) {
        response.status(401).json({ error: 'Invalid username or password' })
    }

    const tokenUser = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokenUser, config.SECRET_KEY)

    response
        .status(200)
        .json({ token: token, username: user.username, id: user._id})
})

module.exports = loginRouter