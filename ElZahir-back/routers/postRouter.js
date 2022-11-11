require('dotenv').config()
const { ObjectId } = require('mongodb')
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

postRouter.put('/:id', async(request, response)=> {
    const body = request.body
    const id = request.params.id
    

    if (body.mode === 'like') {
        const meId = body.meId
        console.log("BODYYY", body)
        
        const post = await Post.findById(id)
        const user = await User.findById(meId)
        post.likes = post.likes.concat(user._id)
        user.likedPosts = user.likedPosts.concat(post._id)
        await post.save()
        await user.save()

        response.json({hola: 'hola'})

    } else if (body.mode === 'unlike') {
        const meId = body.meId
        console.log("BODYYY", body)

        await User.update({}, {$pull: {likedPosts: ObjectId(id)}})

        const post = await Post.findById(id)

        post.likes = []

        await post.save()

        response.json({hola: 'hola'})
    }

})

postRouter.post('/', async (request, response)=> {
    const body = request.body
    const token = getToken(request)
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
        user: user._id,
        username: user.username,
        profileImg: user.profileImg,
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    response.json(savedPost)
})

postRouter.get('/', async (request, response)=> {

    let posts = await Post.find({})
    let respuesta = posts.map(post => 
        User.findById(post.user[0].toString())
        .then(user => {
            post.profileImg = user.profileImg
            return post
        })
    )

    await Promise.all(respuesta)
    .then(res=> {
        response.json(res)
    })

    

})

postRouter.get('/:id', async (request, response)=> {
    const id = request.params.id
    Post.findById(id)
    .then(post => {
        response.json(post)
    })
})

postRouter.delete('/:id', async(request, response) => {
    const id = request.params.id

    await User.update({}, {$pull: {posts: ObjectId(id)}}, {new: true})


    await Post.findByIdAndDelete(id)
    .then(deletedPost => {
        response.json(deletedPost)
    })
})

module.exports = postRouter