require('dotenv').config()
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const userRouter = require('express').Router() 
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const Imagekit = require('imagekit')
const fs = require('fs/promises')

const imagekit = new Imagekit({
    publicKey: "public_6DnujADgzOoT69JIc0gb33SS7C4=",
    privateKey: "private_ss2dmZXrdv1OBjRHEEtg6wH09GQ=",
    urlEndpoint: "https://ik.imagekit.io/vo7gdb6tl"
})

const uniqueParam = Math.floor(Math.random() * 1000000);

const getToken = (request)=> {
    
    const auth = request.headers.authorization

    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

userRouter.post('/', async (req, res) => {

    const { username, name, lastname, email, password } = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username,
        name,
        lastname,
        email,
        passwordHash
    })
  
    const savedUser = await user.save()
    
    res.json(savedUser)

})

userRouter.get('/', async (req, res) => {

    const token = getToken(req)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const users = await User.find({})
    res.json(users)

})

// get toma dos argumentos, la dirección de la petición que se va a responder, y una función que toma como argumentos...
// ... la petición, que contiene los datos enviados por el usuario, que en principio solo es la dirección de la solicitus misma...
// ... o puede contener un objeto. El segundo argumento es una función predefinida que permite enviar la respuesta.

userRouter.get('/:id', async (request, response) => {

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const userId = String(request.params.id)
        
    const user = await User.findById(userId)
    if (user) {
        response.json(user)
    } else {
        response.status(404).json({ error: 'User not found' })
    }

})

userRouter.put('/follow/:id', async (request, response)=> {

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const body = request.body
    const id = request.params.id
    const meId = body.id

    const user = await User.findById(id)
    const me = await User.findById(meId)

    const test = me.following.includes(user._id)
    
    if (test) {
        response.json({error: "user already followed"})
    }

    user.followers = user.followers.concat(me._id)
    me.following = me.following.concat(user._id)

    await user.save()
    await me.save()

    response.json({me:{following: me.following}, user:{followers: user.followers}})
})

userRouter.put('/unfollow/:id', async (request, response)=> {

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const body = request.body
    const id = request.params.id
    const meId = body.id
    
    const user = await User.findById(id)
    const me = await User.findById(meId)

    const test = me.following.includes(user._id)
    
    if (!test) {
        response.json({error: "user already unfollowed"})
    }

    me.following = me.following.filter(ide => ide.toString() !== id)
    user.followers = user.followers.filter(ide => ide.toString() !== me._id.toString())
        
    await user.save()
    await me.save()

    response.json({me:{following: me.following}, user:{followers: user.followers}})
})

userRouter.put('/profile-image/:id', async (request, response)=> {

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const body = request.body
    const id = request.params.id

    if (request.files) {
        let imageFile = request.files.image
        let uploadPath = __dirname + '\\uploads\\' + imageFile.name

        imageFile.mv(uploadPath, async function (err) {
            if (err) {
                response.status(500).send(err)
            }

            let fileup = await fs.readFile(uploadPath)
    
            let promesa = await imagekit.upload({
                file: fileup,
                fileName: `profile_img_${id}`,
                useUniqueFileName: false
            })

            fs.unlink(uploadPath)

            const user = await User.findById(id)

            user.profileImg = promesa.url
            await user.save()

            await Post.updateMany({user : user._id}, {profileImg: promesa.url})

            response.json({profileImg: user.profileImg})
        })
    } else {
        let promesa = await imagekit.upload({
            file: body.profileImg,
            fileName: `profile_img_${id}`,
            folder: `/users/${user._id.toString()}/profile_image`
        })

        const user = await User.findById(id)
        user.profileImg = `${promesa.url}?${uniqueParam}`
        await user.save()

        await Post.updateMany({user : user._id}, {profileImg: promesa.url})

        response.json({profileImg: user.profileImg})
    }
})

userRouter.put('/profile-panel-image/:id', async (request, response)=> {

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const body = request.body
    const id = request.params.id
    if (request.files) {
        let imageFile = request.files.image
        let uploadPath = __dirname + '\\uploads\\' + imageFile.name

        imageFile.mv(uploadPath, async function (err) {
            if (err) {
                response.status(500).send(err)
            }

            let fileup = await fs.readFile(uploadPath)
    
            let promesa = await imagekit.upload({
                file: fileup,
                fileName: `profile_panel_img_${id}`,
                useUniqueFileName: false
            })

            fs.unlink(uploadPath)

            const user = await User.findById(id)
            user.mainPanelImg = promesa.url
    
            await user.save()
            response.json({mainPanelImg: user.mainPanelImg})

        })
    } else {

        let promesa = await imagekit.upload({
            file: body.mainPanelImg,
            fileName: `profile_panel_img_${id}`,
            useUniqueFileName: false
        })

        const user = await User.findById(id)
        user.mainPanelImg = promesa.url
        await user.save()

        response.json({mainPanelImg: user.mainPanelImg})

    }
})


module.exports = userRouter