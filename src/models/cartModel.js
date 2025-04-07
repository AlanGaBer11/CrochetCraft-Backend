const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  }
})

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  items: [itemSchema]
}, { timestamps: true })

module.exports = mongoose.model('carts', cartSchema)
