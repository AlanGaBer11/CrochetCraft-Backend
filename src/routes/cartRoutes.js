const express = require('express')
const cartController = require('../controllers/cartController')
const { validateCart } = require('../middlewares/validators/cartValidator')
const authenticateUser = require('../middlewares/authMiddleware')

const router = express.Router()

router
  .get('/', authenticateUser, cartController.getCart)
  .post('/add', validateCart, authenticateUser, cartController.addToCart)
  .patch('/update', authenticateUser, cartController.updateCartItem)
  .delete('/remove', authenticateUser, cartController.removeFromCart)
  .delete('/clear', authenticateUser, cartController.clearCart)

module.exports = router
