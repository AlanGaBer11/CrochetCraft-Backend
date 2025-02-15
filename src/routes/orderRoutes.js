const express = require('express');
const router = express.Router();
const orderController = require ('../controllers/orderController');
const authenticateUser  = require('../middlewares/authMiddleware');


router
    .get('/', orderController.getOrders)
    .get('/:id', orderController.getOrderById)
    .post('/', authenticateUser, orderController.createOrder)
    .patch('/:id', orderController.updateOrderStatus)
    .delete('/:id', orderController.deleteOrder);

module.exports = router;