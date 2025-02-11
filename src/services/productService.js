const productModel = require('../models/productModel');

// GET ALL PRODUCTS
const getAllProduct = async() => {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
};

// GET PRODUCT BY ID
const getOneProduct = async(id) => {
    try {
        const product = await productModel.findById(id);
        // VERIFICA SI EL PRODUCTO EXISTE
        if(!product) {
            throw new Error('Producto No Encontrado');
        }
        return product;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de producto inválido');
        }
        throw new Error(`Error al buscar producto: ${error.message}`);
    }
};

// CREATE PRODUCT
const createProduct = async(nombre, descripcion, precio, categoria) => {
    try {
        const existingProduct = await productModel.findOne({nombre});
        if(existingProduct) {
            throw new Error('El Producto Ya Existe');
        }
        // CREAMOS EL PRODUCTO
        const newproduct = await productModel.create({nombre, descripcion, precio, categoria});
        await newproduct.save();
        return "Producto Creado Con Éxito";
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('El nombre del producto ya está en uso');
        }
        throw new Error(`Error al crear producto: ${error.message}`);
    }
};

// UPDATE PRODUCT BY ID
const updateProduct = async(id, nombre, descripcion, precio, categoria) => {
    try {
        // VERIFICAMOS SI EL PRODUCTO EXISTE
        const product = await productModel.findById(id);
        if(!product) {
            throw new Error('Producto No Encontrado');
        }
        // ACTUALIZAMOS EL PRODUCTO
        await productModel.findByIdAndUpdate(id, {nombre, descripcion, precio, categoria}, {new: true});
        return "Producto Actualizado Con Éxito";
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de producto inválido');
        }
        throw new Error(`Error al actualizar producto: ${error.message}`);
    }
};

// DELETE PRODUCT BY ID
const deleteProduct = async(id) => {
    try {
        // VERIFICAMOS SI EL PRODUCTO EXISTE
        const product = await productModel.findByIdAndDelete(id);
        if(!product) {
            throw new Error('Producto No Encontrado');
        }
        return "Producto Eliminado Con Éxito";
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de producto inválido');
        }
        throw new Error(`Error al eliminar producto: ${error.message}`);
    }
};

module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};