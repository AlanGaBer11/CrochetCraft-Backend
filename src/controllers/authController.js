/* AUTH CONTROLLER */
const authProcess = require('../processes/authProcess')
const jwt = require('jsonwebtoken')

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Validar datos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' })
    }

    // Registrar usuario
    const user = await authProcess.registerUser(nombre, email, password)

    res.status(201).json({ success: true, message: 'Usuario Registrado', user })
  } catch (error) {
    console.error('Error Al Registrar El Usuario:', error)
    res.status(400).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar datos obligatorios
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Correo y Contraseña Son Obligatorios' })
    }

    // Obtener usuario autenticado
    const user = await authProcess.loginUser(email, password)

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    res.status(200).json({ success: true, message: 'Inicio De Sesión Exitoso', token, user })
  } catch (error) {
    console.error('Error Al Iniciar Sesión:', error)

    // Si el error es de autenticación, enviamos 401
    if (error.message === 'El Usuario No Existe' || error.message === 'Contraseña Incorrecta') {
      return res.status(401).json({ success: false, message: error.message })
    }

    res.status(500).json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

module.exports = {
  registerUser,
  loginUser
}
