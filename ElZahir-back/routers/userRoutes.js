const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const userRouter = require('express').Router() 
const User = require('../models/User')

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
    console.log('REQUESTTTTTT', request.params.id)
    let userId = String(request.params.id)
    User.findById(userId)
        .then(user => {
            console.log(user)
            response.json(user)
        })
})

module.exports = userRouter