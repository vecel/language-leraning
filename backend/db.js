const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectDB = () => {
    logger.info('Connecting to ', config.MONGODB_URI)

    mongoose.connect(config.MONGODB_URI)
        .then(_ => {
            logger.info('Connected to MongoDB')
        })
        .catch(error => {
            logger.error('Error connecting to MongoDB: ', error.message)
        })
}

module.exports = connectDB
