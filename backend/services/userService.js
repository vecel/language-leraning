const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')

const User = require('../models/user')
const validate = require('./userValidator')

const createUser = async (username, email, password) => {
    validate(username, email, password)
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        email,
        passwordHash
    })

    const saved = await user.save()
    return saved
}

const loginUser = async (username, password) => {
    const user = await User.findOne({ username })
    
    const authorized = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!authorized) {
        throw new Error('Invalid username or password')
    }

    const tokenUser = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokenUser, config.SECRET_KEY)
    return { token: token, username: user.username, id: user._id}
}

module.exports = { createUser, loginUser }