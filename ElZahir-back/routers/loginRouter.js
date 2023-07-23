require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
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
  
        res.status(200).send(token)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong. Please try again later.' })
    }
})

module.exports = loginRouter
