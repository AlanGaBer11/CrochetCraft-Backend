const cartModel = require("../models/cartModel");

// OBTENER CARRITO DE UN USUARIO
const getCart = async (userId) => {
  return await cartModel.findOne({ userId }).populate("items.productId");
};

// AGREGAR PRODUCTOS AL CARRITO
const addToCart = async (userId, productId, cantidad) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [{ productId, cantidad }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      cart.items.push({ productId, cantidad });
    }
  }
  await cart.save();
  return cart;
};

// ELIMINAR PRODUCTO DEL CARRITO
const removeFromCart = async (userId, productId) => {
  const cart = await cartModel.findOne({ userId });

  if (!cart) throw new Error("El Carrito No Existe");

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  return cart;
};  

// VACIAR CARRITO
const clearCart = async (userId) => {
  const result = await cartModel.findOneAndDelete({ userId });
  if (!result) {
    throw new Error("El Carrito No Existe");
  }
  return { message: "Carrito Vaciado" };
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};