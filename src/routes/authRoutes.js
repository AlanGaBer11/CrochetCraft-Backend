/* AUTH ROUTE */
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const validation = require('../middlewares/validators/authValidator')

router
  .post('/register', validation.validateUserRegistration, authController.registerUser)
  .post('/login', validation.validateUserLogin, authController.loginUser)
  .post('/send-verification-code', authController.sendVerificationCode)
  .post('/verify-code', authController.verifyCode)
  .post('/request-password-reset', authController.requestPasswordReset)
  .post('/reset-password/:token', authController.resetPassword)

module.exports = router
