const bcrypt = require('bcrypt')
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

module.exports = userRouter