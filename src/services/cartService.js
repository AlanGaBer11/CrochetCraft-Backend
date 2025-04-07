const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')

// Obtener carrito
const getCart = async (userId) => {
  return await CartModel.findOne({ userId })
}

// Agregar productos al carrito
const addToCart = async (userId, items) => {
  let cart = await CartModel.findOne({ userId })

  if (!cart) {
    cart = new CartModel({ userId, items: [] })
  }

  for (const item of items) {
    const product = await ProductModel.findOne({ nombre: item.nombre })

    if (!product) {
      throw new Error(`Producto con nombre '${item.nombre}' no encontrado`)
    }

    const existingItem = cart.items.find(
      cartItem => cartItem.productId.toString() === product._id.toString()
    )

    if (existingItem) {
      existingItem.cantidad += item.cantidad
    } else {
      cart.items.push({
        productId: product._id,
        nombre: product.nombre,
        categoria: product.categoria,
        cantidad: item.cantidad
      })
    }
  }

  await cart.save()
  return cart
}

// Eliminar producto del carrito
const removeFromCart = async (userId, nombre) => {
  const cart = await CartModel.findOne({ userId })

  if (!cart) throw new Error('El Carrito No Existe')

  cart.items = cart.items.filter(item => item.nombre !== nombre)

  await cart.save()
  return cart
}

// Vaciar carrito
const clearCart = async (userId) => {
  const result = await CartModel.findOneAndDelete({ userId })
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
}
