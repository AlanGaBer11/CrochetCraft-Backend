const cartProcess = require('../processes/cartProcess')

// Obtener carrito
const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await cartProcess.getCart(userId)

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Carrito No Encontrado' })
    }

    res.status(200).json({ success: true, message: 'Carrito Obtenido', cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

// Agregar producto(s) al carrito
const addToCart = async (req, res) => {
  try {
    const { items } = req.body
    const userId = req.user.id

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Se requiere un array de productos' })
    }

    for (const item of items) {
      if (!item.nombre || !item.cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Cada item debe tener nombre y cantidad'
        })
      }
    }

    const cart = await cartProcess.addToCart(userId, items)
    res.status(200).json({ success: true, message: 'Productos Agregados Al Carrito', cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

// Eliminar producto por nombre
const removeFromCart = async (req, res) => {
  try {
    const { nombre } = req.body
    const userId = req.user.id

    if (!nombre) {
      return res.status(400).json({ success: false, message: 'El nombre del producto es obligatorio' })
    }

    const cart = await cartProcess.removeFromCart(userId, nombre)
    res.status(200).json({ success: true, message: 'Producto Eliminado Del Carrito', cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

// Vaciar carrito
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await cartProcess.clearCart(userId)
    res.status(200).json({ success: true, message: 'Carrito Vaciado', result })
  } catch (error) {
    res.status(error.message === 'El Carrito No Existe' ? 404 : 500)
      .json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
}
