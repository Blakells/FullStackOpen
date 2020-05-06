const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    upvotes: {
        type: String,
        required: true
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)