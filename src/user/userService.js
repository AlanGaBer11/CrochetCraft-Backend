const userModel = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET ALL USERS
const getAllUsers = async () => {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        throw error;
    }
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
};


/* AUTHENTICATION */
// REGISTER USER
const registerUser = async (nombre, email, password) => {
    try {
        // VERIFICAR SI EL EMAIL YA EXISTE
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('El Email Ya Está Registrado');
        }
        // HASHEAMOS LA CONTRASEÑA
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // CREAR NUEVO USUARIO
        const newUser = new userModel({ nombre, email, password: hashedPassword });
        await newUser.save();

        return "Usuario Registrado Con Éxito";
    } catch (error) {
        throw error;
    }
};

// LOGIN USER
const loginUser = async (email, password) => {
    try {
        // VERIFICAR SI EL USUARIO EXISTE
        const user  = await userModel.findOne({ email });
            if (!user) {
                throw new Error("El Usuario No Existe");
            }
        // VERIFICAR SI LA CONTRASEÑA ES CORRECTA
        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
        // GENERAR UN TOKEN JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
};