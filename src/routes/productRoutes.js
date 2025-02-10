const express = require('express');
const router = express.Router();
const productController = require ('../product/productController');

router
    .get('/', productController.getAllProduct)
    .get('/:id', productController.getOneProduct)
    .post('/', productController.createProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct);

module.exports = router;