const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}).set('toJSON', {
    transform: (_, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
        delete returned.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User