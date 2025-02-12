const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    calificacion: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
