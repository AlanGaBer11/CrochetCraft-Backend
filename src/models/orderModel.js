const mongoose = require('mongoose')

const status = {
  values: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
  message: '{VALUE} no es un estado válido'
}

const metodosPago = {
  values: ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia', 'Efectivo'],
  message: '{VALUE} no es un método de pago válido'
}

// Esquema de Item
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
  },
  precio: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
})

// Esquema de la orden (Order)
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    items: [itemSchema],
    precioTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: status,
      default: 'Pendiente'
    },
    metodoPago: { type: String, required: true, enum: metodosPago }
  },
  { timestamps: true }
)

module.exports = mongoose.model('orders', OrderSchema)
