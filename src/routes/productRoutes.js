const express = require('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getOneProduct)
    .post('/', productController.createProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct);

module.exports = router;