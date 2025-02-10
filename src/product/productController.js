const productProcess = require('./productProcess');

const getAllProduct = async(req, res) => {
    try {
        const products = await productProcess.getAllProduct();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error Al Obtener Los Productos', error);
        res.status(500).json({error: 'Error Al Obtener Los Productos'})
    }
};

const getOneProduct = async(req, res) => {
    try {
        const product = await productProcess.getOneProduct(req.params.id);
        if (!product) {
            return res.status(404).json({error: 'Producto No Encontrado'});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error Al Obtener El Producto', error);
        res.status(500).json({error: 'Error Al Obtener El Producto'});
    }
};

const createProduct = async(req, res) => {
    try {
        const { nombre, descripcion, precio, categoria } = req.body;
        const newProduct = await productProcess.createProduct(nombre, descripcion, precio, categoria);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error Al Crear El Producto', error);
        res.status(500).json({error: 'Error Al Crear El Producto'});
    }
};

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria } = req.body;
        const updateProduct = await productProcess.updateProduct(id, nombre, descripcion, precio, categoria);
        if (!updateProduct) {
            res.status(404).json({error: 'Producto No Encontado'});
        }
        res.status(200).json(updateProduct);
    } catch (error){
        console.error('Error Al Actualizar El Producto', error);
        res.status(500).json({error: 'Error Al Actualizar El Producto'});
    }
};

const deleteProduct = async(req, res) => {
    try {
        const deleteProduct = await productProcess.deleteProduct(req.params.id);
        if (!deleteProduct) {
            res.status(404).json({error: 'Producto No Encontrado'});
        }
        res.status(200).json(deleteProduct);
    } catch (error) {
        console.error('Error Al Eliminar El Producto', error);
        res.status(500).json({error: 'Error Al Eliminar El Producto'});
    }
};

module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};


