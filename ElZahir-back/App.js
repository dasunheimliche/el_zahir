
const config = require('./utils/config')
const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')

const userRouter = require('./routers/userRoutes')
const loginRouter = require('./routers/loginRouter')
const postRouter = require('./routers/postRouter')
const commentRouter = require('./routers/commentRouter')
const registerRouter = require('./routers/registerRouter')

const fileupload = require('express-fileupload')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('failed connection')
    })


const app = express()

app.use(cors({
    exposedHeaders: "Content-Type, multipart/form-data"
}));

app.use(express.json())

app.use(fileupload())

app.use(express.urlencoded({extended: false}))

app.use(express.static('build'))

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)
app.use('/api/register', registerRouter)

app.use((_req, res, _next) => {
    res.status(404).json({ error: 'Not found' })
  })

app.use((err, _req, res, _next) => {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
})
  
module.exports = app
