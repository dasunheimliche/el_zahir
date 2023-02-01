
// lo siguiente son los modelos a los que accede el router
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

// para crear un router, debo usar "require('express').Router()"
// este router ma dará acceso de los métodos get, post, delete, etc.
const commentRouter = require('express').Router() 

// estos métodos aceptan un primer argumento que es un string q describe la ruta relativa...
// un ultimo argumento que consiste en la función controla la solicitud...
// esta función posee dos argumentos, request con la informacion de la solicitud enviada desde el cliente...
// y respuesta, que posee metodos para responder
commentRouter.get('/', async (request, response)=> {
    // el método .find() accede a un modelo y resibe como argumento un objeto, con la consulta.
    // si el objeto está vació, devuelve todos los documentos de ese modelo.
    // recordar que devuelve una promesa.
    Comment.find({})
        // con .json(devuelvo la respuesta del modelo como json, ya que la respuesta no es un objeto de javascript comun)
        .then(res => response.json(res))
})

commentRouter.delete('/:id', (request, response)=> {

    const id = request.params.id

    Comment.findByIdAndDelete(id)
    .then(res => response.json(res.data)) 
})

commentRouter.post('/', async (request, response) => {
    const body = request.body
    const post = await Post.findById(body.postID)
    let commentToPost

    if (!body.commentID) {
        // creo un nuevo documento con el constructor new <<modelo>> ()
        // que toma como argumento un objeto, conde cada llave es un atributo del modelo, con su valor.
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
    // el nuevo documento creado se debe guardar en el servidor...
    // esto se hace con .save() el cual es un método asíncrono obviamente
    await commentToPost.save()
    .then(res => response.json(res))

})

module.exports = commentRouter