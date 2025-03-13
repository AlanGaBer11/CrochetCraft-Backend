const { check, validationResult } = require('express-validator')

const validateProduct = [
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),

    check('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 10 }).withMessage('Debe tener al menos 10 caracteres'),

    check('precio')
        .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número positivo'),

    check('stock')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número positivo'),

    check('categoria')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isIn(['Flores', 'Amigurumis', 'Llaveros', 'Ropa']).withMessage('Categoría no válida'),

    check('urlImagenes')
        .notEmpty().withMessage('La imagen es obligatoria')
        .isURL().withMessage('Debe ser una URL válida'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]

module.exports = { validateProduct }