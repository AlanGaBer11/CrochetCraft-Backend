const orderService = require('../services/orderService')

const getOrders = async () => {
  return await orderService.getOrders()
}

const getOrderById = async (id) => {
  return await orderService.getOrderById(id)
}

// Solo se pasan userId y metodoPago, porque los demás ya se obtienen del carrito
const createOrder = async (userId, metodoPago) => {
  return await orderService.createOrder(userId, metodoPago)
}

const updateOrderStatus = async (id, status) => {
  return await orderService.updateOrderStatus(id, status)
}

const deleteOrder = async (id) => {
  return await orderService.deleteOrder(id)
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
}
