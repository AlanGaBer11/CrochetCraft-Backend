/* AUTH CONTROLLER */
const authProcess = require('../processes/authProcess')
const jwt = require('jsonwebtoken')

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body

    // Validar datos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ success: false, message: 'Todos Los Campos Son Obligatorios' })
    }

    // Registrar usuario con rol (si no se proporciona, será CLIENTE por defecto)
    const user = await authProcess.registerUser(nombre, email, password, rol)

    res.status(201).json({ success: true, message: 'Usuario Registrado', user })
  } catch (error) {
    console.error('Error Al Registrar El Usuario:', error)
    res.status(500).json({ success: false, message: error.message || 'Error Interno Del Servidor' })
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

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

// ENVIAR CÓDIGO DE VERIFICACIÓN
const sendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({ succes: false, message: 'El Email Es Requerido' })
    }

    await authProcess.sendVerificationCode(email)

    res.status(200).json({
      success: true,
      message: 'Código De Verificación Enviado Exitosamente'
    })
  } catch (error) {
    next(error)
  }
}

// VERIFICAR CÓDIGO
const verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      res.status(400).json({ succes: false, message: 'Email Y Código Son Requeridos' })
    }

    await authProcess.verifyCode(email, code)

    res.status(200).json({
      success: true,
      message: 'Cuenta Verificada Exitosamente'
    })
  } catch (error) {
    next(error)
  }
}

// SOLICITAR RESTABLECIMIENTO DE CONTRASEÑA
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body
    const response = await authProcess.requestPasswordReset(email)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// RESTABLECER CONTRASEÑA
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body // Solo obtener newPassword del body

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña es requerida'
      })
    }

    const response = await authProcess.resetPassword(token, newPassword)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// CAMBIAR ROL DE USUARIO
const changeUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
      return res.status(400).json({
        success: false,
        message: 'ID de Usuario y Nuevo Rol Son Requeridos'
      });
    }

    const user = await authProcess.changeUserRole(userId, newRole);

    res.status(200).json({
      success: true,
      message: 'Rol de Usuario Actualizado Exitosamente',
      user
    });
  } catch (error) {
    console.error('Error Al Cambiar Rol de Usuario:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// VERIFICAR PERMISO
const checkPermission = async (req, res) => {
  try {
    const { userId, permission } = req.body;

    if (!userId || !permission) {
      return res.status(400).json({
        success: false,
        message: 'ID de Usuario y Permiso Son Requeridos'
      });
    }

    const result = await authProcess.checkPermission(userId, permission);

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error Al Verificar Permiso:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// OBTENER TODOS LOS PERMISOS DE UN USUARIO
const getUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'ID de Usuario Es Requerido'
      });
    }

    const result = await authProcess.getUserPermissions(userId);

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error Al Obtener Permisos:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyCode,
  requestPasswordReset,
  resetPassword,
  changeUserRole,
  checkPermission,
  getUserPermissions
}
