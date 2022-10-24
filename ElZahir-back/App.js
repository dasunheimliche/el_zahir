// IMPORTO MODULOS
const cors = require('cors')
const config = require('./utils/config')
const express = require('express')
const app = express()

const userRouter = require('./routers/userRoutes')
const loginRouter = require('./routers/loginRouter')
const postRouter = require('./routers/postRouter')

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
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/post', postRouter)

app.get('/api/', (request, response)=> {
    response.send('<div>Hola!</div>')
})

// POST - MIDDLEWARES


// EXPORT APP

module.exports = app
