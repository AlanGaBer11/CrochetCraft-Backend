const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/', authenticateUser, orderController.getOrders)
  .get('/:id', authenticateUser, orderController.getOrderById)
  .post('/', authenticateUser, orderController.createOrder)
  .patch('/:id', authenticateUser, orderController.updateOrderStatus)
  .delete('/:id', authenticateUser, checkRole(['ADMIN']), orderController.deleteOrder)

module.exports = router
