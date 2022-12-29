const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const userRouter = require('express').Router() 
const User = require('../models/User')

const Imagekit = require('imagekit')
const fs = require('fs/promises')

const imagekit = new Imagekit({
    publicKey: "public_6DnujADgzOoT69JIc0gb33SS7C4=",
    privateKey: "private_ss2dmZXrdv1OBjRHEEtg6wH09GQ=",
    urlEndpoint: "https://ik.imagekit.io/vo7gdb6tl"
})

userRouter.post('/', (request, response)=> {
    const body = request.body

    const saltRounds = 10
    bcrypt.hash(body.password, saltRounds)
        .then(respuesta => {
            const user = new User({
                username: body.username,
                name: body.name,
                lastname: body.lastname,
                email:body.email,
                passwordHash: respuesta,
            })
            user.save()
                .then(respuesta => {
                    response.json(respuesta)
                })
        })
})

userRouter.get('/', (request, response)=> {
    User.find({})
        .then(respuesta => {
            response.json(respuesta)
        })
})

// get toma dos argumentos, la dirección de la petición que se va a responder, y una función que toma como argumentos...
// ... la petición, que contiene los datos enviados por el usuario, que en principio solo es la dirección de la solicitus misma...
// ... o puede contener un objeto. El segundo argumento es una función predefinida que permite enviar la respuesta.

userRouter.get('/:id', (request, response)=> {
    let userId = String(request.params.id)
    User.findById(userId)
        .then(user => {
            response.json(user)
        })
})


userRouter.put('/:id', async (request, response)=> {
    const body = request.body
    const id = request.params.id

    if (body.mode === 'follow') {
        const user = await User.findById(id)
        const meId = body.id
        const me = await User.findById(meId)

        user.followers = user.followers.concat(me._id)
        me.following = me.following.concat(user._id)

        await user.save()
        await me.save()

        response.json({me:{following: me.following}, user:{followers: user.followers}})

    } else if (body.mode === 'unfollow') {
        const user = await User.findById(id)
        const meId = body.id
        const me = await User.findById(meId)

        // user.followers = user.followers.concat(me._id)
        // me.following = me.following.concat(user._id)

        me.following = me.following.filter(ide => ide.toString() !== id)
        user.followers = user.followers.filter(ide => ide.toString() !== me._id.toString())
        
        await user.save()
        await me.save()

        response.json({me:{following: me.following}, user:{followers: user.followers}})
    
    
    } else if (body.mode === 'profileImgURL') {

        if (request.files) {
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
    
                fs.unlink(uploadPath)

                const user = await User.findById(id)

                user.profileImg = promesa.url
                await user.save()

                await Post.updateMany({user : user._id}, {profileImg: promesa.url})

                response.json({profileImg: user.profileImg})
            })
        } else {
            const user = await User.findById(id)

            user.profileImg = body.profileImg
            await user.save()

            await Post.updateMany({user : user._id}, {profileImg: body.profileImg})

            response.json({profileImg: user.profileImg})

        }
    } else if (body.mode === 'panelImgUrl') {

        if (request.files) {
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
    
                fs.unlink(uploadPath)

                const user = await User.findById(id)
                user.mainPanelImg = promesa.url
        
                await user.save()
                response.json({mainPanelImg: user.mainPanelImg})

            })
        } else {
            const user = await User.findById(id)
            user.mainPanelImg = body.mainPanelImg
        
            await user.save()
            response.json({mainPanelImg: user.mainPanelImg})
        }


        // const user = await User.findById(id)
        // user.mainPanelImg = body.mainPanelImg
        
        // await user.save()
        // response.json({mainPanelImg: user.mainPanelImg})
    }

})

module.exports = userRouter