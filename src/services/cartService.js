const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')

// CALCULAR EL PRECIO TOTAL
const calcularTotal = (items) => {
  return items.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0)
}

// OBTENER EL CARRITO
const getCart = async (userId) => {
  return await CartModel.findOne({ userId })
}

// AGREGAR PRODUCTOS AL CARRITO
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
    // Verificar que el producto tenga un precio válido
    if (!product.precio || isNaN(product.precio)) {
      throw new Error(`El producto '${item.nombre}' no tiene un precio válido`)
    }

    // Buscar si el producto ya está en el carrito
    const existingItemIndex = cart.items.findIndex(i => i.productId.toString() === product._id.toString())

    if (existingItemIndex !== -1) {
      // Si ya existe, aumentar la cantidad
      cart.items[existingItemIndex].cantidad += item.cantidad
    } else {
      // Si no existe, agregarlo
      cart.items.push({
        productId: product._id,
        nombre: product.nombre,
        categoria: product.categoria,
        cantidad: item.cantidad,
        precioUnitario: product.precio
      })
    }
  }
  // Verificar que todos los items tengan precios válidos
  for (const item of cart.items) {
    if (!item.precioUnitario || isNaN(item.precioUnitario)) {
      const product = await ProductModel.findById(item.productId)
      if (product && product.precio) {
        item.precioUnitario = product.precio
      } else {
        throw new Error(`No se puede determinar el precio para el producto '${item.nombre}'`)
      }
    }
  }

  cart.precioTotal = calcularTotal(cart.items)
  // Verificación final para evitar NaN
  if (isNaN(cart.precioTotal)) {
    cart.precioTotal = 0;
  }
  await cart.save()
  return cart
}

// REMOVER PRODUCTO DEL CARRITO
const removeFromCart = async (userId, nombre, cantidad) => {
  const cart = await CartModel.findOne({ userId })
  if (!cart) throw new Error('El Carrito No Existe')

  const itemIndex = cart.items.findIndex(item => item.nombre === nombre)
  if (itemIndex === -1) throw new Error('Producto No Encontrado')

  const item = cart.items[itemIndex]

  if (!cantidad || cantidad >= item.cantidad) {
    // Eliminar producto completamente si no se especifica cantidad o si la cantidad es mayor o igual a la cantidad del producto en el carrito
    cart.items.splice(itemIndex, 1)
  } else {
    // De lo contrario, solo reducir la cantidad
    item.cantidad -= cantidad
  }

  // Recalcular el precio total
  cart.precioTotal = calcularTotal(cart.items)

  await cart.save()
  return cart
}


// VACIAR CARRITO
const clearCart = async (userId) => {
  const cart = await CartModel.findOne({ userId })
  if (!cart) throw new Error('El Carrito No Existe')

  cart.items = []
  cart.precioTotal = 0

  await cart.save()
  return cart
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
}
