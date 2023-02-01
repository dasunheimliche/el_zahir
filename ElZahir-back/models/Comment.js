// Siempre que quiera crear un modelo, debo importar mongoose
const mongoose = require('mongoose')

// Creo un esquema con el constructor "new mongoose.Schema()"
const commentSchema = new mongoose.Schema({
    // el constructor new mongoose.Schema toma como argumento un objeto...
    // donde las llaves son los atributos del modelo, y sus valores el tipo de variable aceptado.
    username: String,
    comment: String,
    date: Date,

    // en realidad, los valores de cada llave son un objeto, pero si no usamos uno, el valor se intepreta por defecto como el tipo de variable aceptado.
    // para que un atributo contenga referencias a otros modelos, asignamos el tipo 'mongoose.Schema.Types.ObjectId'...
    // y el atributo "ref", cuyo valor será el nombre del modelo al que hace referencia. 
    // en caso de que sea una lista de objetos id, y no uno solo, lo envolvemos en corchetes []
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
})

// con el siguiente código, modificamos los datos devueltos al hacer querys al esquema.
// en este caso, agregamos una propiedad id en base al objeto id...
// y posteriormente eliminamos los atributos _id y __v

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


// Ahora a partir del esquema, creo el modelo con 'mongoose.model()'
// mongoose.model() como como argumento el nombre del modelo, y el esquema que creamos.
const Comment = mongoose.model('Comment', commentSchema)

// finalmente exportamos el esquema
module.exports = Comment