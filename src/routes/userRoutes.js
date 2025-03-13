const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/', authenticateUser, checkRole(['ADMIN']), userController.getAllUsers)
  .get('/:id', authenticateUser, checkRole(['ADMIN']), userController.getOneUser)
  .post('/', authenticateUser, checkRole(['ADMIN']), userController.createUser)
  .patch('/:id', authenticateUser, userController.updateUser)
  .delete('/:id', authenticateUser, checkRole(['ADMIN']), userController.deleteUser)

module.exports = router
