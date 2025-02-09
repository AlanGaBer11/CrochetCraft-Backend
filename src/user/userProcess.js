const userService = require('./userService');

// GET ALL USERS
const getAllUsers = async () => {
    const users = await userService.getAllUsers();
    return users;  
};

// GET USER BY ID
const getOneUser = async (id) => {
    const user = await userService.getOneUser(id);
    return user;
};

// CREATE USER SIN HASHEAR LA CONTRASEÑA
const createUser = async (nombre, email, password) => {
    const newUser = await userService.createUser(nombre, email, password);
    return newUser;
};

// UPDATE USER BY ID
const updateUser = async (id, nombre, email, password) => {
    const user = await userService.updateUser(id, nombre, email, password);
    return user;
};

// DELETE USER BY ID
const deleteUser = async (id) => {
    const user = await userService.deleteUser(id);
    return user;
};

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (nombre, email, password) => {
    const user = await userService.registerUser(nombre, email, password);
    return user;
};

// LOGIN USER
const loginUser = async (email, password) => {
    const result = await userService.loginUser(email, password);
    return result;
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