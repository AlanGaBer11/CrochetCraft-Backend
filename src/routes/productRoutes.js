const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { validateProduct } = require('../middlewares/validators/productValidator')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('getProducts/', productController.getAllProducts)
  .get('getProductById/:id', productController.getOneProduct)
  .post('createProduct/', authenticateUser, checkRole(['ADMIN']), validateProduct, productController.createProduct)
  .patch('updateProduct/:id', authenticateUser, checkRole(['ADMIN']), productController.updateProduct)
  .delete('deleteProduct/:id', authenticateUser, checkRole(['ADMIN']), productController.deleteProduct)

module.exports = router
