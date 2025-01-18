const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const connectDB = require('./db')

const usersRouter = require('./controllers/users')

const app = express()

connectDB()

app.use(express.json())

const errorHandler = (error, request, response, next) => {
  logger.warn(error.message)
  if (error.name === 'CastError')
    response.status(400).send({ error: 'Malformatted id' })
  next(error)
}

app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app
