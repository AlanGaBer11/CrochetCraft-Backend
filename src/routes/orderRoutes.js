const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('getOrders/', authenticateUser, orderController.getOrders)
  .get('getOrderById/:id', authenticateUser, orderController.getOrderById)
  .post('createOrder/', authenticateUser, orderController.createOrder)
  .patch('updtaeOrder/:id', authenticateUser, orderController.updateOrderStatus)
  .delete('deleteOrder/:id', authenticateUser, checkRole(['ADMIN']), orderController.deleteOrder)

module.exports = router
