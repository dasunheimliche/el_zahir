require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const postRouter = require('express').Router()

const getToken = (request)=> {
    const auth = request.headers.authorization
    console.log('AUTH', auth)
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

postRouter.post('/', async (request, response)=> {
    const body = request.body
    console.log('REQUEST', typeof(request.headers.authorization))
    const token = getToken(request)
    console.log('TOKEN', token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const post = new Post ({
        type: body.type,
        title: body.title,
        subtitle: body.subtitle,
        textPost: body.textPost,
        imagePost: body.imagePost,
        videoPost: body.videoPost,
        videoAr: body.videoAr,
        date: new Date(),
        user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    response.json(savedPost)
})

postRouter.get('/', (request, response)=> {
    Post.find({})
        .then(posts => {
            response.json(posts)
        })
})

module.exports = postRouter