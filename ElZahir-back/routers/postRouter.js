// me permite acceder al archivo .env
require('dotenv').config()
// me permite convertir un string en un object id
const { ObjectId } = require('mongodb')
// jwt me permite crear un token a partir de un objeto
const jwt = require('jsonwebtoken')
// estos son los modelos que voy a usar
const User = require('../models/User')
const Post = require('../models/Post')
// creo el router con require('express').Router()
const postRouter = require('express').Router()
// import imagekit
const Imagekit = require('imagekit')
// import fs q me permite manipular archivos locales, en un modo que me genere promesas
const fs = require('fs/promises')

// creo un objeto imagekit con el constructor "new Imagekit()"
// este constructor toma 3 argumentos, que son claves que obtengo en la pagina 
const imagekit = new Imagekit({
    publicKey: "public_6DnujADgzOoT69JIc0gb33SS7C4=",
    privateKey: "private_ss2dmZXrdv1OBjRHEEtg6wH09GQ=",
    urlEndpoint: "https://ik.imagekit.io/vo7gdb6tl"
})

// preparo esta función que me permite obtener el token que el usuario envio con la solicitud (request)
const getToken = (request)=> {
    
    // el token está en request.headers.authorization
    const auth = request.headers.authorization

    // con lo siguiente verifico el token sea valido
    // primero verifico que existe, y luego que esté en el formato correcto
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        // devuelvo el token sin el "bearer"
        return auth.substring(7)
    }
    // si el token no existe, o no es valido, devuelvo null
    return null
}

postRouter.put('/:id', async(request, response)=> {
    const body = request.body
    const id = request.params.id
    

    if (body.mode === 'like') {
        // extraigo el id del usuario
        const meId = body.meId
        
        // acceso al post y al usuario que dio el like
        const post = await Post.findById(id)
        const user = await User.findById(meId)

        // agrego el usuario al atributo likes del post
        post.likes = post.likes.concat(user._id)

        // agrego el post al atributo likedposts del usuario
        user.likedPosts = user.likedPosts.concat(post._id)

        // guardo los cambios
        await post.save()
        await user.save()

        // aquí deberia devolver  el post actualizado
        response.json({hola: 'hola'})

    } else if (body.mode === 'unlike') {
        // elimino el like de la lista de posts likeados del usuario
        // lo siguiente dice...
        // de todos los documentos user ({}), elimino ($pull) de una lista (likedPosts), el objeto id igual a ObjectId(id) 
        await User.update({}, {$pull: {likedPosts: ObjectId(id)}})

        // acceso al post por el id
        const post = await Post.findById(id)

        // ERROR: deberia eliminar el usuario que deslikeo, no todos los likes
        post.likes = []

        // guardo el post
        await post.save()

        // deberia devolver el post actualizado
        response.json({hola: 'hola'})
    }

})

postRouter.post('/', async (request, response)=> {
    const body = request.body
  
    // debo agregar esto a las otras rutas
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    // aca a diferencia de antes, uso el id que me da el token para buscar al usuario
    const user = await User.findById(decodedToken.id)

    // lo siguiente se toma como "si hay un archivo en la solicitud..."
    if (request.files && body.type === 'image') {
        // extraigo la imagen de request.files
        let sampleFile = request.files.image
        // construyo la dirección de descarga: la direccion de la carpeta actual (__dirname) + la carpeta upload ('\\uploads\\') + el nombre del archivo (sampleFile.name)
        let uploadPath = __dirname + '\\uploads\\' + sampleFile.name

        // mv significa move, y permite mover un archivo de un lugar a otro, este toma como argumento el destino, y un callback.
        // el callback corre luego de mover el archivo
        sampleFile.mv(uploadPath, async function (err) {

            // si hay un error definido, devuelvo un error
            if (err) {
                return response.status(500).send(err)
            }

            // con fs.readFile(direccion) leo el archivo
            let fileup = await fs.readFile(uploadPath)
            
            // con imagekit.upload() subo la imagen a imagekit
            // imagekit.upload() toma como argumento un objeto con el archivo y el nombre del archivo
            let promesa = await imagekit.upload({
                file: fileup,
                fileName: sampleFile.name
            })

            // con fs.unlink() elimino el archivo local
            // fs.unlink() toma como argumento la direccion del archivo
            fs.unlink(uploadPath)

            // creo un nuevo post
            const post = new Post ({
                // ERROR: demasiados atributos innecesarios
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
            
            // salvo el nuevo post creado
            const savedPost = await post.save()

            // guardo el post en la lista de posts del usuario
            user.posts = user.posts.concat(savedPost._id)
            // guardo los cambios
            await user.save()
            
            // devuelvo el post creado
            response.json(savedPost)
            
        })

        // lo siguiente se lee como "si no hay un archivo en la solicitud pero si un link a una imagen"
    } else if (request.files && body.type === 'video-file') {
        // extraigo la imagen de request.files
        let sampleFile = request.files.video
        // construyo la dirección de descarga: la direccion de la carpeta actual (__dirname) + la carpeta upload ('\\uploads\\') + el nombre del archivo (sampleFile.name)
        let uploadPath = __dirname + '\\uploads\\' + sampleFile.name

        // mv significa move, y permite mover un archivo de un lugar a otro, este toma como argumento el destino, y un callback.
        // el callback corre luego de mover el archivo
        sampleFile.mv(uploadPath, async function (err) {

            // si hay un error definido, devuelvo un error
            if (err) {
                return response.status(500).send(err)
            }

            // con fs.readFile(direccion) leo el archivo
            let fileup = await fs.readFile(uploadPath)
            
            // con imagekit.upload() subo la imagen a imagekit
            // imagekit.upload() toma como argumento un objeto con el archivo y el nombre del archivo
            let promesa = await imagekit.upload({
                file: fileup,
                fileName: sampleFile.name
            })

            // con fs.unlink() elimino el archivo local
            // fs.unlink() toma como argumento la direccion del archivo
            fs.unlink(uploadPath)

            // creo un nuevo post
            const post = new Post ({
                // ERROR: demasiados atributos innecesarios
                type: body.type,
                title: body.title,
                subtitle: body.subtitle,
                textPost: body.textPost,
                imgkitID: promesa.fileId,
                videoPost: promesa.url,
                videoAr: body.videoAr,
                date: new Date(),
                user: user._id,
                username: user.username,
                profileImg: user.profileImg,
            })
            
            // salvo el nuevo post creado
            const savedPost = await post.save()

            // guardo el post en la lista de posts del usuario
            user.posts = user.posts.concat(savedPost._id)
            // guardo los cambios
            await user.save()
            
            // devuelvo el post creado
            response.json(savedPost)
            
        })

        // lo siguiente se lee como "si no hay un archivo en la solicitud pero si un link a una imagen"
    } else if (!request.files && body.type === "image") {

        // con imagekit.upload() tambien puedo subir desde una dirección
        let promesa = await imagekit.upload({
            file: body.imagePost,
            fileName: "randomname"
        })

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
    // ERROR: falta verificacion de token
    let posts = await Post.find({})
    response.json(posts)

})

postRouter.get('/:id', async (request, response)=> {
    // ERROR: falta verificacion de token
    const id = request.params.id
    Post.findById(id)
    .then(post => {
        response.json(post)
    })
})

postRouter.delete('/:id', async(request, response) => {

    const body = request.body
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const id = request.params.id

    await User.update({}, {$pull: {posts: ObjectId(id)}}, {new: true})

    // lo siguiente se lee como "si hay un id de imagekit definido"
    if (body.imgkitID) {
        // con imagekit.deleteFile() elimino el archivo de imagekit
        imagekit.deleteFile(body.imgkitID)
    }
    // elimino el post de la base de datos
    await Post.findByIdAndDelete(id)
    .then(deletedPost => {
        response.json(deletedPost)
    })
})

module.exports = postRouter