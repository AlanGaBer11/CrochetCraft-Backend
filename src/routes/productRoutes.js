const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { validateProduct } = require('../middlewares/validators/productValidator')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/getProducts/', productController.getAllProducts)
  .get('/getProductById/:id', productController.getOneProduct)
  .get('/getProductByName/:nombre', productController.getProductByName)
  .get('/getProductsByCategory/:categoria', productController.getProductsByCategory)
  .post('/createProduct/', authenticateUser, checkRole(['ADMIN']), validateProduct, productController.createProduct)
  .patch('/updateProduct/:id', authenticateUser, checkRole(['ADMIN']), productController.updateProduct)
  .delete('/deleteProduct/:id', authenticateUser, checkRole(['ADMIN']), productController.deleteProduct)

module.exports = router
