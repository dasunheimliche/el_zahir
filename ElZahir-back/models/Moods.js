// 1 - Importo mongoose
// 2 - Creo un esquema
// 3 - Edito el comportamiento de toJSON
// 4 - Convierto el esquema en un modelo

const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
    moodImg: String,
    moodVideo: String,
    imgkitID: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    date: Date,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    pinned: Boolean
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Mood = mongoose.model('Mood', moodSchema)

module.exports = Mood