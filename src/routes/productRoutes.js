const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { validateProduct } = require('../middlewares/validators/productValidator')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getOneProduct)
  .post('/', authenticateUser, checkRole(['ADMIN']), validateProduct, productController.createProduct)
  .patch('/:id', authenticateUser, checkRole(['ADMIN']), productController.updateProduct)
  .delete('/:id', authenticateUser, checkRole(['ADMIN']), productController.deleteProduct)

module.exports = router
