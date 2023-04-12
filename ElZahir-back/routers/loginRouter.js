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

loginRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body
  
        const user = await User.findOne({ username })
  
        if (!user) {
            res.status(401).json({ error: 'The username or password you entered is incorrect' })
        }
  
        const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  
        if (!passwordMatches) {
            res.status(401).json({ error: 'The username or password you entered is incorrect' })
        }
  
        const userForToken = {
            username: user.username,
            id: user._id
        }
  
        const token = jwt.sign(userForToken, process.env.SECRET)
  
        res.status(200).send({ ...user.toObject(), token, userId: user._id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong. Please try again later.' })
    }
  })

module.exports = loginRouter
