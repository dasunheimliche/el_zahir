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
    imgkitID: String,
    mediaWidth: Number,
    mediaHeight: Number,
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
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Post = mongoose.model('Post', postSchema)


module.exports = Post