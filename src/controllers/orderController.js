const orderProcess = require('../processes/orderProcess')

// OBTENER TODAS LAS ÓRDENES
const getOrders = async (req, res) => {
  try {
    const orders = await orderProcess.getOrders()
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No hay órdenes' })
    }
    res.status(200).json({ success: true, message: 'Órdenes obtenidas', orders })
  } catch (error) {
    console.error('Error al obtener las órdenes:', error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' })
  }
}

// OBTENER ORDEN POR ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params
    const order = await orderProcess.getOrderById(id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' })
    }
    res.status(200).json({ success: true, message: 'Orden obtenida', order })
  } catch (error) {
    console.error('Error al obtener la orden:', error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' })
  }
}

// CREAR ORDEN
const createOrder = async (req, res) => {
  try {
    const { metodoPago } = req.body
    const userId = req.user.id

    if (!metodoPago) {
      return res.status(400).json({
        success: false,
        message: 'El método de pago es obligatorio'
      })
    }

    const metodosPermitidos = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia', 'Efectivo']
    if (!metodosPermitidos.includes(metodoPago)) {
      return res.status(400).json({
        success: false,
        message: 'Método de pago no válido. Opciones permitidas: ' + metodosPermitidos.join(', ')
      })
    }

    const order = await orderProcess.createOrder(userId, metodoPago)

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      order
    })
  } catch (error) {
    console.error('Error al crear la orden:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor'
    })
  }
}

// ACTUALIZAR ESTADO DE ORDEN
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ success: false, message: 'El estado es obligatorio' })
    }

    const updatedOrder = await orderProcess.updateOrderStatus(id, status)
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' })
    }

    res.status(200).json({ success: true, message: 'Estado actualizado', updatedOrder })
  } catch (error) {
    console.error('Error al actualizar el estado de la orden:', error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' })
  }
}

// ELIMINAR ORDEN
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    const deletedOrder = await orderProcess.deleteOrder(id)
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' })
    }
    res.status(200).json({ success: true, message: 'Orden eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la orden:', error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
}
