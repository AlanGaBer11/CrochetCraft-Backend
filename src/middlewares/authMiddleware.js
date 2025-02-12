const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Verifica si el usuario tiene un token válido
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Acceso denegado, token requerido' });

        // Verifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Excluye la contraseña
        if (!req.user) return res.status(401).json({ message: 'Token inválido' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = { authenticateUser };