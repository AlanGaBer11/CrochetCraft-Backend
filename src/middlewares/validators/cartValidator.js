const { check, validationResult } = require("express-validator");

const validateCart = [
    check("productId")
        .isMongoId().withMessage("ID de producto inválido"),

    check("cantidad")
        .isInt({ min: 1 }).withMessage("La cantidad debe ser al menos 1"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCart };
