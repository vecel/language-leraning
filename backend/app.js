require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const connectDB = require('./db')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

connectDB()

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError')
    response.status(400).send({ error: 'Malformatted id' })
  if (error.name === 'ValidationError')
    response.status(400).send({ error: error.message })
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection'))
    response.status(400).send({ error: 'Expected `username` to be unique' })
  next(error)
}

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
