const cartProcess = require("../processes/cartProcess");

// OBTENER CARRITO
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartProcess.getCart(userId);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Carrito No Encontrado" });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// AGREGAR PRODUCTO AL CARRITO
const addToCart = async (req, res) => {
  try {
    const { productId, cantidad } = req.body;
    const userId = req.user.id; // Se asume que el usuario está autenticado

    if (!productId || !cantidad) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Producto y cantidad son obligatorios",
        });
    }

    const cart = await cartProcess.addToCart(userId, productId, cantidad);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ELIMINAR PRODUCTO DEL CARRITO
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ID del producto es obligatorio" });
    }

    const cart = await cartProcess.removeFromCart(userId, productId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// VACIAR CARRITO
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartProcess.clearCart(userId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(error.message === "El Carrito No Existe" ? 404 : 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
};
