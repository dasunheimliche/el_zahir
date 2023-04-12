
// lo siguiente son los modelos a los que accede el router
require('dotenv').config()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const getToken = (request)=> {
    
    const auth = request.headers.authorization

    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}


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
    const postId = request.query.postId
    const commentId = request.query.commentId

    // con .json(devuelvo la respuesta del modelo como json, ya que la respuesta no es un objeto de javascript comun)
    let comments
    if (postId) {
        comments = await Comment.find({postID: new mongoose.Types.ObjectId(postId)});
    } else if (commentId)  {
        comments = await Comment.find({commentID: new mongoose.Types.ObjectId(commentId)});
    } else {
        response.status(400).send('Missing query parameter.');
    }

    response.json(comments);

})

commentRouter.delete('/:id', async (request, response)=> {
    
    const id = request.params.id;
    const postUserId = request.query.postUserId
    const commentUserId = request.query.commentUserId

    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }

    const meId = decodedToken.id

    if (!id || !postUserId || !commentUserId) {
        response.status(400).send('Missing query parameter.'); 
    }

    if (meId !== postUserId && meId !== commentUserId) {
        response.status(400).send('user is not allowed to delete this comment'); 
    }


    const deletedComment = await Comment.findByIdAndDelete(id);
    await Comment.deleteMany({commentID: new mongoose.Types.ObjectId(id)})
    
    if (!deletedComment) {
        response.status(404).json({ error: 'Comment not found' });
    }
    
    response.json(deletedComment);

})

commentRouter.post('/', async (req, res) => {
    const { username, comment, postID, commentID, userID } = req.body;

    if (!username || !comment || !postID) {
        res.status(400).json({ error: 'Missing required fields' });
    }


    const post = await Post.findById(postID);
    if (!post) {
        res.status(404).json({ error: 'Post not found' });
    }

    const commentToPost = new Comment({
        username,
        comment,
        date: new Date(),
        postID: post._id,
        commentID: commentID || null,
        userID: userID
    });

    await commentToPost.save();
    res.json(commentToPost);
})

module.exports = commentRouter