const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('getUsers/', authenticateUser, checkRole(['ADMIN']), userController.getAllUsers)
  .get('getUserById/:id', authenticateUser, checkRole(['ADMIN']), userController.getOneUser)
  .post('createUser/', authenticateUser, checkRole(['ADMIN']), userController.createUser)
  .patch('updateUser/:id', authenticateUser, userController.updateUser)
  .delete('deleteUser/:id', authenticateUser, checkRole(['ADMIN']), userController.deleteUser)

module.exports = router
