const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    date: Date,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment