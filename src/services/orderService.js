const OrderModel = require('../models/orderModel')
const CartModel = require('../models/cartModel')
const productModel = require('../models/productModel')

// OBTENER TODAS LAS ORDENES
const getOrders = async () => {
  return await OrderModel.find()
    .populate('userId', 'nombre email')
    .populate('items.productId', 'nombre precio')
}

// OBTENER UNA ORDEN POR ID
const getOrderById = async (id) => {
  return await OrderModel.findById(id)
    .populate('userId', 'nombre email')
    .populate('items.productId', 'nombre precio')
}

// CREAR UNA ORDEN A PARTIR DEL CARRITO
const createOrder = async (userId, metodoPago) => {
  try {
    const cart = await CartModel.findOne({ userId }).populate('items.productId')
    if (!cart || cart.items.length === 0) {
      throw new Error('Carrito vacío o no encontrado')
    }

    const orderItems = []

    for (const item of cart.items) {
      const product = item.productId

      // Validar stock
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${product.nombre} (disponible: ${product.stock}, solicitado: ${item.cantidad})`)
      }


      // Descontar stock
      await productModel.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.cantidad } }
      )

      orderItems.push({
        productId: product._id,
        nombre: product.nombre,
        categoria: product.categoria,
        cantidad: item.cantidad,
        precio: product.precio,
        subtotal: product.precio * item.cantidad
      })
    }

    const newOrder = new OrderModel({
      userId,
      items: orderItems,
      precioTotal: cart.precioTotal, // usamos directamente el total del carrito
      status: 'Pendiente',
      metodoPago
    })

    await newOrder.save()

    await CartModel.findOneAndDelete({ userId })

    return newOrder
  } catch (error) {
    throw new Error(`Error al crear la orden: ${error.message}`)
  }
}

// ACTUALIZAR EL ESTADO DE UNA ORDEN
const updateOrderStatus = async (id, status) => {
  return await OrderModel.findByIdAndUpdate(id, { status }, { new: true })
}

// ELIMINAR UNA ORDEN
const deleteOrder = async (id) => {
  return await OrderModel.findByIdAndDelete(id)
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
}
