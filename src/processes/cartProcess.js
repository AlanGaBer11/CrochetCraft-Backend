const cartService = require('../services/cartService')

const getCart = async (userId) => {
  return await cartService.getCart(userId)
}

const addToCart = async (userId, items) => {
  return await cartService.addToCart(userId, items)
}

const updateCartItem = async (userId, nombre, cantidad, isIncrement) => {
  return await cartService.updateCartItem(userId, nombre, cantidad, isIncrement)
}

const removeFromCart = async (userId, nombre) => {
  return await cartService.removeFromCart(userId, nombre);
};

const clearCart = async (userId) => {
  return await cartService.clearCart(userId)
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}
