const express = require('express');
const router = express.Router();
const userController = require('../user/userController');

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getOneUser)
    .post('/', userController.createUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)
    .post('/register', userController.registerUser)
    .post('/login', userController.loginUser);

module.exports = router;