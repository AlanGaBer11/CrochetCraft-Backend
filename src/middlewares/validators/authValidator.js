const { check, validationResult } = require('express-validator')

// MIDDLEWARES DE VALIDACIÓN
const validateUserRegistration = [
  check('nombre')
    .notEmpty().withMessage('El Nombre Es Obligatorio')
    .isLength({ min: 3 }).withMessage('El Nombre Debe Tener Al Menos 3 Caracteres'),

  check('email')
    .notEmpty().withMessage('El Email Es Obligatorio')
    .isEmail().withMessage('Debe Ser Un Email Válido'),

  check('password')
    .notEmpty().withMessage('La Contraseña Es Obligatoria')
    .isLength({ min: 6 }).withMessage('La Contraseña Debe Tener Al Menos 6 Caracteres')
    .matches(/\d/).withMessage('La Contraseña Debe Contener Al Menos Un Número'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  }
]

const validateUserLogin = [
  check('email')
    .isEmail().withMessage('Debe Ser Un Email Válido')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 6 }).withMessage('La Contraseña Debe Tener Al Menos 6 Caracteres')
    .matches(/\d/).withMessage('La Contraseña Debe Contener Al Menos Un Número'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateUserRegistration,
  validateUserLogin
}
