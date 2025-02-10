const productModel = require('./productModel');

// GET ALL PRODUCTS
const getAllProduct = async() => {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
};

module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};