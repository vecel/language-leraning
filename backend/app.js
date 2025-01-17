const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const connectDB = require('./db')
const Post = require('./models/post')

const app = express()

connectDB()

app.use(express.json())

const errorHandler = (error, request, response, next) => {
  logger.warn(error.message)
  if (error.name === 'CastError')
    response.status(400).send({ error: 'Malformatted id' })
  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/posts', (request, response) => {
  
})

app.use(errorHandler)

module.exports = app
