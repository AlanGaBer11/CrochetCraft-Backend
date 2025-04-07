const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  nombre: { type: String, required: true, index: false },
  categoria: { type: String, required: true },
  calificacion: { type: Number, required: true },
  comentario: { type: String, required: true }
})

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [itemSchema]
})

module.exports = mongoose.model('reviews', reviewSchema)
