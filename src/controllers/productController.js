const productProcess = require('../processes/productProcess')

const getAllProducts = async (req, res) => {
  try {
    const products = await productProcess.getAllProducts()
    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: 'No Hay Productos' })
    }

    res.status(200).json({
      success: true,
      message: 'Productos Obtenidos',
      total: products.length,
      products
    })
  } catch (error) {
    console.error('Error Al Obtener Los Productos', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const product = await productProcess.getOneProduct(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto No Encontrado' })
    }
    res.status(200).json({ success: true, message: 'Producto Obtenido', product })
  } catch (error) {
    console.error('Error Al Obtener El Producto', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const getProductByName = async (req, res) => {
  try {
    const product = await productProcess.getProductByName(req.params.nombre)
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto No Encontrado' })
    }
    res.status(200).json({ success: true, message: 'Producto Obtenido', product })
  } catch (error) {
    console.error('Error Al Obtener El Producto Por Nombre', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const products = await productProcess.getProductsByCategory(req.params.categoria)
    if (!products) {
      return res.status(404).json({ success: false, error: 'Productos No Encontrados En Esa Categoría' })
    }
    res.status(200).json({ success: true, message: 'Productos Obtenidos', products })
  } catch (error) {
    console.error('Error Al Obtener Los Productos De Esa Categoría', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, urlImagen } = req.body
    const newProduct = await productProcess.createProduct(nombre, descripcion, precio, stock, categoria, urlImagen)
    res.status(201).json({ success: true, message: 'Producto Creado', newProduct })
  } catch (error) {
    console.error('Error Al Crear El Producto', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, precio, stock, categoria, urlImagen } =
      req.body
    const updateProduct = await productProcess.updateProduct(id, nombre, descripcion, precio, stock, categoria, urlImagen)
    if (!updateProduct) {
      return res.status(404).json({ success: false, error: 'Producto No Encontado' })
    }
    res.status(200).json({ success: true, message: 'Producto Actualizado', updateProduct })
  } catch (error) {
    console.error('Error Al Actualizar El Producto', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productProcess.deleteProduct(req.params.id)
    if (!deleteProduct) {
      res.status(404).json({ success: false, message: 'Producto No Encontrado' })
    }
    res.status(200).json({ success: true, message: 'Producto Eliminado', deleteProduct })
  } catch (error) {
    console.error('Error Al Eliminar El Producto', error)
    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
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
