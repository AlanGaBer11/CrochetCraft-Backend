const cartProcess = require('../processes/cartProcess')

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

const updateCartItem = async (req, res) => {
  try {
    const { nombre, cantidad, operacion } = req.body
    const userId = req.user.id

    if (!nombre) {
      return res.status(400).json({ success: false, message: 'El nombre del producto es obligatorio' })
    }

    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ success: false, message: 'La cantidad debe ser un número positivo' })
    }

    // Determinar si incrementar o decrementar basado en el parámetro 'operacion'
    // Si operacion es 'incrementar' o no se especifica, incrementar
    // Si operacion es 'decrementar', decrementar
    const isIncrement = operacion !== 'decrementar';
    
    const cart = await cartProcess.updateCartItem(userId, nombre, cantidad, isIncrement)
    
    const message = isIncrement 
      ? 'Cantidad de producto incrementada en el carrito' 
      : 'Cantidad de producto reducida en el carrito';
      
    res.status(200).json({ success: true, message, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { nombre } = req.body;
    const userId = req.user.id;

    if (!nombre) {
      return res
        .status(400)
        .json({ success: false, message: "ID del producto es obligatorio" });
    }

    const cart = await cartProcess.removeFromCart(userId, nombre);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const clearCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await cartProcess.clearCart(userId)
    res.status(200).json({ success: true, message: 'Carrito Vaciado', cart })
  } catch (error) {
    res.status(error.message === 'El Carrito No Existe' ? 404 : 500)
      .json({ success: false, message: error.message || 'Error Interno Del Servidor' })
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}
