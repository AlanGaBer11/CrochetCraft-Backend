const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

// GET ALL USERS
const getAllUsers = async () => {
    const users = await userModel.find();
    return users;
};

// GET USER BY ID
const getOneUser = async (id) => {
    try {
        // VERIFICAR SI EL USUARIO YA EXISTE
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error('Usuario No Encontrado');
        }
        return user;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de usuario inválido');
        }
        throw new Error(`Error al buscar usuario: ${error.message}`);
    }
};

// CREATE USER (SIN HASHEAR LA CONTRASEÑA)
const createUser = async (nombre, email, password) => {
    try {
         // VERIFICAR SI EL EMAIL YA EXISTE
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('El Email Ya Está Registrado');
        }
        // CREAMOS EL NUEVO USUARIO
        const newUser = new userModel({ nombre, email, password });
        await newUser.save();
        return "Usuario Creado Con Éxito"
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('El email ya está en uso');
        }
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
};

// UPDATE USER BY ID
const updateUser = async (id, nombre, email, password) => {
    try {
        // VERIFICAR SI EL USUARIO EXISTE
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error('Usuario No Encontrado');
        }
        // HASHEAR LA CONTRASEÑA SOLO SI SE PROPORCIONA UNA NUEVA
        let hashedPassword = user.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        // ACTUALIZAR EL USUARIO
        await userModel.findByIdAndUpdate(id, { nombre, email, password: hashedPassword }, { new: true } // DEVUELVE EL USUARIO ACTUALIZADO
        );
        return "Usuario Actualizado Con Éxito";
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de usuario inválido');
        }
        throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
};

// DELETE USER BY ID
const deleteUser = async (id) => {
    try {
        // VERIFICAR SI EL USUARIO EXISTE
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            throw new Error('Usuario No Encontrado');
        }
        return "Usuario Eliminado con Éxito";
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('ID de usuario inválido');
        }
        throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};