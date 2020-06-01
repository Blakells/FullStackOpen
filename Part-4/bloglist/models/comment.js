const mongoose = require('mongoose')
//create schema for the comment
const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    // make sure each comment has a reference to the blog that it is associated with
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)