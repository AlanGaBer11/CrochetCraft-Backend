/* AUTH PROCESS */
const authService = require('../services/authService')

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (nombre, email, password) => {
  const user = await authService.registerUser(nombre, email, password)
  return user
}

// LOGIN USER
const loginUser = async (email, password) => {
  const result = await authService.loginUser(email, password)
  return result
}

module.exports = {
  registerUser,
  loginUser
}
