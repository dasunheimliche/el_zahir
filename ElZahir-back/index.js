const app = require('./App')
const http = require('http')
const config = require('./utils/config')

// ESTE ARCHIVO INICIALIZA EL SERVIDOR

// creamos un server con createServer a partir del server express
const server = http.createServer(app)

// acceso al puerto de la variable de entorno
const PORT = process.env.PORT || 3001

// inicio el servidor
server.listen(PORT, ()=> {
    console.log(`Server running on port ${config.PORT}`)
})