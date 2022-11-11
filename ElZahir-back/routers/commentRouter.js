
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const commentRouter = require('express').Router() 

commentRouter.get('/', async (request, response)=> {
    Comment.find({})
    .then(res => response.json(res))
})

// commentRouter.get('/:id', (request, response) => {
//     const id = request.params.id
    
//     Comment.findById(id)
// })

commentRouter.delete('/:id', (request, response)=> {
    const id = request.params.id

    Comment.findByIdAndDelete(id)
    .then(res => response.json(res.data)) 
})

commentRouter.post('/', async (request, response) => {
    const body = request.body
    console.log("BODYYYY", body)
    const post = await Post.findById(body.postID)
    let commentToPost

    if (!body.commentID) {
        commentToPost = new Comment ({
            username: body.username,
            comment: body.comment,
            date: new Date(),
            postID: post._id,
        })
    } else {
        const comment = await Comment.findById(body.commentID)

        commentToPost = new Comment ({
            username: body.username,
            comment: body.comment,
            date: new Date(),
            postID: post._id,
            commentID: comment._id
        })
    }

    await commentToPost.save()
    .then(res => response.json(res))

})

module.exports = commentRouter