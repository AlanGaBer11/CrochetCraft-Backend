const productService = require('./productService');

const getAllProduct = async() => {
    const products = await productService.getAllProduct()
    return products
};

const getOneProduct = async(id) => {
    const product = await productService.getOneProduct(id);
    return product;
};

const createProduct = async(nombre, descripcion, precio, categoria) => {
    const product = await productService.createProduct(nombre, descripcion, precio, categoria);
    return product;
};

const updateProduct = async(id, nombre, descripcion, precio, categoria) => {
    const product = await productService.updateProduct(id, nombre, descripcion, precio, categoria)
    return product;
};

const deleteProduct = async(id) => {
    const product = await productService.deleteProduct(id);
    return product;
};

module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};