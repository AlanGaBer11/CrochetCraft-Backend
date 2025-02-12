const mongoose = require("mongoose");

let status = {
    values: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
    message: '{VALUE} no es un estado válido'
};

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true }, // Precio del producto en el momento de la compra
      },
    ],
    precioTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: status,
      default: "Pendiente",
    },
    metodoPaago: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
