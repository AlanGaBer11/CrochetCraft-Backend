const productProcess = require("../processes/productProcess");

const getAllProducts = async (req, res,) => {
  try {
    const products = await productProcess.getAllProducts();
    if(!products) {
      return res.status(404).json({ error: "No Hay Productos" });
    }
    res.status(200).json({ message: "Productos Obtenidos", products });
  } catch (error) {
    console.error("Error Al Obtener Los Productos", error);
    res.status(500).json({ error: "Error Al Obtener Los Productos" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await productProcess.getOneProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto No Encontrado" });
    }
    res.status(200).json({message: "Producto Obtenido", product});
  } catch (error) {
    console.error("Error Al Obtener El Producto", error);
    res.status(500).json({ error: 'Error Al Obtener El Producto' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, urlImagenes } = req.body;
    const newProduct = await productProcess.createProduct(nombre, descripcion, precio, stock, categoria, urlImagenes);
    res.status(201).json( {message: "Producto Creado", newProduct});
  } catch (error) {
    console.error("Error Al Crear El Producto", error);
    res.status(500).json({ error: "Error Al Crear El Producto" });
  }
};

const updateProduct = async (req, res) => {
  try { 
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, urlImagenes } =
      req.body;
    const updateProduct = await productProcess.updateProduct(id, nombre, descripcion, precio, stock, categoria, urlImagenes);
    if (!updateProduct) {
      return res.status(404).json({ error: "Producto No Encontado" });
    }
    res.status(200).json({message: "Producto Actualizado", updateProduct});
  } catch (error) {
    console.error("Error Al Actualizar El Producto", error);
    res.status(500).json({ error: "Error Al Actualizar El Producto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productProcess.deleteProduct(req.params.id);
    if (!deleteProduct) {
      res.status(404).json({ message: "Producto No Encontrado" });
    }
    res.status(200).json({message: "Producto Eliminado", deleteProduct});
  } catch (error) {
    console.error("Error Al Eliminar El Producto", error);
    res.status(500).json({ error: "Error Al Eliminar El Producto" });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
