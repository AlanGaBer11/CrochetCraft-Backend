const { check, validationResult } = require('express-validator')

const validateCart = [
  check('items').isArray({ min: 1 }).withMessage('Debe enviar al menos un producto'),

  check('items.*.nombre')
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isString().withMessage('El nombre del producto debe ser un texto'),

  check('items.*.cantidad')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  }
]

module.exports = { validateCart }
