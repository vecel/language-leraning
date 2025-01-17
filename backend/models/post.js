const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: String
}).set('toJSON', {
    transform: (_, returned) => {
        returned.id = returned._id.toString(),
        delete returned._id,
        delete returned.__v
    }
})

module.exports = mongoose.model('Post', postSchema)
