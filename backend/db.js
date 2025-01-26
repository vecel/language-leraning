const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const db = {
    connect: () => {
        logger.info('Connecting to ', config.MONGODB_URI)
    
        mongoose.connect(config.MONGODB_URI)
            .then(_ => {
                logger.info('Connected to MongoDB')
            })
            .catch(error => {
                logger.error('Error connecting to MongoDB: ', error.message)
            })
    },

    connected: () => mongoose.connection.readyState === 1
}

module.exports = db
