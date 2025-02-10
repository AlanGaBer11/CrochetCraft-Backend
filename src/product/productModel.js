const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let categorias = {
    values: ['Flores', 'Amigurumis', 'Llaveros', 'Ropa'],
    message: '{VALUE} no es una categoría válida'
};
/* const ImagenesSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, 'La URL es necesaria']
        },
        nombre: {
            type: String,
            required: [true, 'El nombre es necesario']
        }

    }
); */

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es necesaria'],
        enum: categorias
    },
    /* imagenes: [ImagenesSchema] */
}, { timestamps: true },
);

// PLUGIN PARA VERIFICAR LOS CAMPOS ÚNICOS
productSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports  = mongoose.model("Product", productSchema);
