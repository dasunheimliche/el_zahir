// con este código permito a este archivo acceder al archivo .env
require('dotenv').config()

// acá listo todas las variables de entorno en .env
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
module.exports = {
    PORT, MONGODB_URI
}