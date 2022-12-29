require('dotenv').config()
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const postRouter = require('express').Router()

const Imagekit = require('imagekit')
const fs = require('fs/promises')

const imagekit = new Imagekit({
    publicKey: "public_6DnujADgzOoT69JIc0gb33SS7C4=",
    privateKey: "private_ss2dmZXrdv1OBjRHEEtg6wH09GQ=",
    urlEndpoint: "https://ik.imagekit.io/vo7gdb6tl"
})
// const fileupload = require('express-fileupload')

// app.use(fileupload())
// app.use(express.urlencoded({extended: false}))

const getToken = (request)=> {
    const auth = request.headers.authorization
    // console.log('AUTH', auth)
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
        // console.log("BODYYY", body)
        
        const post = await Post.findById(id)
        const user = await User.findById(meId)
        post.likes = post.likes.concat(user._id)
        user.likedPosts = user.likedPosts.concat(post._id)
        await post.save()
        await user.save()

        response.json({hola: 'hola'})

    } else if (body.mode === 'unlike') {
        const meId = body.meId
        // console.log("BODYYY", body)

        await User.update({}, {$pull: {likedPosts: ObjectId(id)}})

        const post = await Post.findById(id)

        post.likes = []

        await post.save()

        response.json({hola: 'hola'})
    }

})

postRouter.post('/', async (request, response)=> {
    const body = request.body
  
    // console.log("BODYY", request.data)
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    // console.log("BODYYYYY", body)
    // console.log(request.files? "HAY REQUEST FILES" : "NO HAY REQUEST FILES")

    if (request.files) {
        // console.log("FILE POST PATH")
        // console.log("FILESSSSSSS",request.files)
        // console.log("FILESSS.IMAGE", request.files.image)
        let sampleFile = request.files.image
        let uploadPath = __dirname + '\\uploads\\' + sampleFile.name

        sampleFile.mv(uploadPath, async function (err) {
            if (err) {
                return response.status(500).send(err)
            }
            // console.log("START READ FILE IN", uploadPath)

            let fileup = await fs.readFile(uploadPath)
    
            let promesa = await imagekit.upload({
                file: fileup,
                fileName: sampleFile.name
            })
            console.log("PRMOESAAAAAA",promesa)
            fs.unlink(uploadPath)
            
            // console.log("ENDS UPLOAD", promesa.url)

            const post = new Post ({
                type: body.type,
                title: body.title,
                subtitle: body.subtitle,
                textPost: body.textPost,
                imagePost: promesa.url,
                imgkitID: promesa.fileId,
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
            
            // response.json(savedPost)
        })
    } else if (!request.files && body.type === "image") {

        let promesa = await imagekit.upload({
            file: body.imagePost,
            fileName: "randomname"
        })


        // console.log("URL POST PATH")
        const post = new Post ({
            type: body.type,
            title: body.title,
            subtitle: body.subtitle,
            textPost: body.textPost,
            imagePost: promesa.url,
            imgkitID: promesa.fileId,
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

    } else if (body.type === "text" || body.type === "cita" || body.type === "video") {
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
    }
})

postRouter.get('/', async (request, response)=> {

    let posts = await Post.find({})
    response.json(posts)

})

postRouter.get('/:id', async (request, response)=> {
    const id = request.params.id
    Post.findById(id)
    .then(post => {
        response.json(post)
    })
})

postRouter.delete('/:id', async(request, response) => {

    const body = request.body

    // console.log("DELETE BODY", request)

    const token = getToken(request)

    // console.log("DELETE TOKEN", token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const id = request.params.id

    await User.update({}, {$pull: {posts: ObjectId(id)}}, {new: true})
    if (body.imgkitID) {
        imagekit.deleteFile(body.imgkitID)
    }
    await Post.findByIdAndDelete(id)
    .then(deletedPost => {
        response.json(deletedPost)
    })
})

module.exports = postRouter