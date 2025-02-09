const userProcess = require('./userProcess');

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await userProcess.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error Al Obtener Los Usuarios', error);
        res.status(500).json({ message: 'Error Al Obtener Los Usuarios' });
    };
};

// GET USER BY ID
const getOneUser = async (req, res) => {
    try {
        const user = await userProcess.getOneUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario No Encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error Al Obtener El Usuario:', error);
        res.status(500).json({ message: error.message });
    }
};

// CREATE USER SIN HASHEAR LA CONTRASEÑA
const createUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const newUser = await userProcess.createUser(nombre, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error Al Crear El Usuario:', error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE USER BY ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const updatedUser = await userProcess.updateUser(id, nombre, email, password);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario No Encontrado' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error Al Actualizar El Usuario:', error);
        res.status(500).json({ message: 'Error Al Actualizar El Usuario' });
    }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userProcess.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario No Encontrado' });
        }
        res.status(200).json({ message: 'Usuario Eliminado Correctamente' });
    } catch (error) {
        console.error('Error Al Eliminar El Usuario:', error);
        res.status(500).json({ message: error.message });
    }
};

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const result = await userProcess.registerUser(nombre, email, password);
        res.status(201).json({ message: result });
    } catch (error) {
        console.error('Error Al Registrar El Usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
        }
        const result = await userProcess.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Al Iniciar Sesión:', error);
        res.status(500).json({ error: error.message });
    }
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