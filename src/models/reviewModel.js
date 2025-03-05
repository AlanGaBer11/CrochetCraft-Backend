const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        nombre: {
          type: String,
          required: [true, 'El nombre es necesario'],
          unique: true
        },
        categoria: {
          type: String,
          required: [true, 'La categoría es necesaria']
        }
      }
    ],
    calificacion: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('reviews', ReviewSchema)
