// ESTO ME PERMITE ACCEDER AL ARCHIVO .ENV
require('dotenv').config()
// ESTO ME PERMITE CREAR UN TOKEN
const jwt = require('jsonwebtoken')
// ESTP ME PERMITE CREAR UN HASH A PARTIR DE UNA CONTRASEÑA Y COMPARAR HASHS
const bcrypt = require('bcrypt')
// CON ESTO CREO EL ROUTER
const loginRouter = require('express').Router()
// IMPORTO EL MODELO DE USER PARA PODER MANIPULAR SUS DOCUMENTOS EN LA BASE DE DATOS
const User = require('../models/User')

loginRouter.post('/', async (request, response)=> {
    // BODY TIENE LOS DATOS ENVIADOS EN AL SOLICITUD
    const body = request.body
    
    // BUSCO AL USUARIO QUE INICIO LA SESION POR EL NOMBRE EN LA BASE DE DATOS
    const user = await User.findOne({username:body.username})

    // SI NO SE ENCONTRO AL USUARIO PASSCORRECT ES FALSE
    const passCorrect = user === null
        ? false
        // SI SE ENCONTRO AL USUARIO SE COMPARA EL PASSWORD DE LA SOLICITUD CON LA BASE DE DATOS
        : await bcrypt.compare(body.password, user.passwordHash)
    
    // SI USER O PASSCORRECT ES FALSO, ENVIO UN ERROR
    if (!(user && passCorrect)) {
        return response.status(401).json({
            error: 'invalid user or password'
        })
    }


    // CREO EL OBJETO CON LOS DATOS DE USUARIO QUE USARE PARA EL TOKEN
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // CREO QUE TOKEN
    const token = jwt.sign(userForToken, process.env.SECRET)

    // ENVIO LA RESPUESTA A LA SOLICITUD
    // con toObject() convierto la respuesta del modelo, a un objeto javascript comun.
    console.log("USER FROM NODE", user.toObject)
    response
        .status(200)
        // .send({token, username: user.username, name: user.name, userId:String(user._id), followers: user.followers, following: user.following, posts:user.posts.length, profileImg: user.profileImg, mainPanelImg:user.mainPanelImg})
        .send({...user.toObject(), token, userId:user._id})
})

module.exports = loginRouter
