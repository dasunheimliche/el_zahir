// IMPORTO MODULOS

// me permite acceder a las variables de entorno
const config = require('./utils/config')
// me permite acceder al server desde el exterior
const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')
// const app = express()

// ACA IMPORTO LOS ROUTERS
const userRouter = require('./routers/userRoutes')
const loginRouter = require('./routers/loginRouter')
const postRouter = require('./routers/postRouter')
const commentRouter = require('./routers/commentRouter')

// esto me permite acceder al archivo de la solocitud con request.files.<<filename>>
const fileupload = require('express-fileupload')

// CONECTO A MONGOOSE

// utilizao el método connect() de mongoose, que toma como argumento la dirección URI desde las variables de entorno.
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('failed connection')
    })

// PRE - MIDDLEWARES

// creo la aplicacion express con express()
const app = express()
// aplico el middleware q me permite conectarme al server desde el exterior
app.use(cors())
// esto accede a los los datos de la solicitud q esten en formato json y los devuelve como un objeto
app.use(express.json())

// estos middlewares me parmiten subir archivos
app.use(fileupload())

// se supone que es lo mismo que express.json(), investigar mas.
app.use(express.urlencoded({extended: false}))


// ROUTERS

// este middleware permite servir archivos estaticos al servidor (express.static()) y toma como argumento el nombre de la carpeta con el build
app.use(express.static('build'))

// uso los reouters con use('direccion relativa del router', router)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)


// POST - MIDDLEWARES


// EXPORT APP

module.exports = app
