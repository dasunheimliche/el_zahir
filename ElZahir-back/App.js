// IMPORTO MODULOS
const cors = require('cors')
const config = require('./utils/config')
const express = require('express')
const app = express()

const userRouter = require('./routers/userRoutes')
const loginRouter = require('./routers/loginRouter')
const postRouter = require('./routers/postRouter')
const commentRouter = require('./routers/commentRouter')

// CONECTO A MONGOOSE
const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('failed connection')
    })

// PRE - MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROUTERS
app.use(express.static('build'))

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

// POST - MIDDLEWARES


// EXPORT APP

module.exports = app
