const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    type: String,
    title:String,
    subtitle: String,
    textPost: String,
    imagePost: String,
    videoPost:String,
    videoAr: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    username: String,
    profileImg: String,
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Post = mongoose.model('Post', postSchema)


module.exports = Post