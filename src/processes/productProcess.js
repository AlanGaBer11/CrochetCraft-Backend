const productService = require('../services/productService')

const getAllProducts = async () => {
  const products = await productService.getAllProducts()
  return products
}

const getOneProduct = async (id) => {
  const product = await productService.getOneProduct(id)
  return product
}

const getProductsByCategory = async (categoria) => {
  const products = await productService.getProductsByCategory(categoria)
  return products
}

const createProduct = async (nombre, descripcion, precio, stock, categoria, urlImagen) => {
  const product = await productService.createProduct(nombre, descripcion, precio, stock, categoria, urlImagen)
  return product
}

const updateProduct = async (id, nombre, descripcion, precio, stock, categoria, urlImagen) => {
  const product = await productService.updateProduct(id, nombre, descripcion, precio, stock, categoria, urlImagen)
  return product
}

const deleteProduct = async (id) => {
  const product = await productService.deleteProduct(id)
  return product
}

module.exports = {
  getAllProducts,
  getOneProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
}
