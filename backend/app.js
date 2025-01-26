require('express-async-errors')

const express = require('express')
const cors = require('cors')

const connectDB = require('./db')
const { UserCreationError, AuthorizationError } = require('./utils/errors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')

const app = express()

connectDB()

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError')
        response.status(400).send({ error: 'Malformatted id' })
    if (error.name === 'ValidationError')
        response.status(400).send({ error: error.message })
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection')) {
        if (error.message.includes('username_1 dup key'))
            response.status(400).send({ error: 'There already exists user with given username' })
        if (error.message.includes('email_1 dup key'))
            response.status(400).send({ error: 'There already exists user with given email' })
    }
    if (error instanceof AuthorizationError)
        response.status(401).json({ error: error.message })
    if (error instanceof UserCreationError)
        response.status(400).json(error.errors)
    next(error)
}

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter) // I won't call post method here, todo: remove tests
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)

app.use(errorHandler)

module.exports = app
