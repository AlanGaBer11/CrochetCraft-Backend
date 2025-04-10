const productModel = require('../models/productModel')
const { encryptUrl, decryptUrl } = require('./cryptoService')

// GET ALL PRODUCTS with decrypted URLs
const getAllProducts = async () => {
  try {
    const products = await productModel.find()
    return products.map(product => ({
      ...product._doc,
      urlImagen: decryptUrl(product.urlImagen) || product.urlImagen
    }))
  } catch (error) {
    console.error('Error Al Descifrando Las URLS:', error);
    return products; // Devolver productos con URLs sin descifrar en caso de error
  }
}

// GET PRODUCT BY ID with decrypted URL
const getOneProduct = async (id) => {
  const product = await productModel.findById(id)
  if (!product) return null
  try {
    return {
      ...product._doc,
      urlImagen: decryptUrl(product.urlImagen) || product.urlImagen
    }
  } catch (error) {
    console.error('Error Al Descifrando La URL:', error);
    return product; // Devolver producto con URL sin descifrar en caso de error
  }
}

// GET PRODUCT BY NAME
const getProductByName = async (nombre) => {
  const product = await productModel.findOne({ nombre })
  if (!product) return null
  try {
    return {
      ...product._doc,
      urlImagen: decryptUrl(product.urlImagen) || product.urlImagen
    }
  } catch (error) {
    console.error('Error Al Descifrando La URL:', error);
    return product; // Devolver producto con URL sin descifrar en caso de error
  }
}

// GET PRODUCT BY CATEGORY
const getProductsByCategory = async (categoria) => {
  try {
    const products = await productModel.find({ categoria });
    const result = products.map(product => ({
      ...product._doc,
      urlImagen: decryptUrl(product.urlImagen) || product.urlImagen
    }));
    return result;
  } catch (error) {
    console.error('Error Al Descifrando Las URLS:', error);
    return products; // Devolver productos con URLs sin descifrar en caso de error
  }
};

// CREATE PRODUCT
const createProduct = async (nombre, descripcion, precio, stock, categoria, urlImagen) => {
  // VERIFICAR SI EL PRODUCTO YA EXISTE
  const existingProduct = await productModel.findOne({ nombre })
  if (existingProduct) {
    throw new Error('El Producto Ya Esta Registrado')
  }
  // Cifrar URL antes de guardar
  const encryptedUrl = encryptUrl(urlImagen)
  // CREAR EL NUEVO PRODUCTO
  const newproduct = await productModel.create({
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    urlImagen: encryptedUrl
  })
  await newproduct.save()
  return {
    ...newproduct._doc,
    urlImagen: urlImagen // Devolver URL original
  }
}

// UPDATE PRODUCT BY ID
const updateProduct = async (id, nombre, descripcion, precio, stock, categoria, urlImagen) => {
  const encryptedUrl = encryptUrl(urlImagen)
  const product = await productModel.findByIdAndUpdate(
    id,
    {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      urlImagen: encryptedUrl
    },
    { new: true }
  )
  return {
    ...product._doc,
    urlImagen: urlImagen // Devolver URL original
  }
}

// DELETE PRODUCT BY ID
const deleteProduct = async (id) => {
  return await productModel.findByIdAndDelete(id)
}

module.exports = {
  getAllProducts,
  getOneProduct,
  getProductByName,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
}
