const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Token Requerido' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await UserModel.findById(decoded.id)

      if (!user) {
        return res.status(404).json({ message: 'Usuario No Encontrado' })
      }

      if (!roles.includes(user.rol)) {
        return res.status(403).json({
          message: 'No Tienes Permiso Para Realizar Esta Acción'
        })
      }

      req.user = user
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token Inválido' })
    }
  }
}

// Middleware para verificar permisos
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Obtener token del header
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Acceso Denegado. Token No Proporcionado'
        });
      }

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario
      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario No Encontrado'
        });
      }

      // Verificar permiso
      if (!user.hasPermission(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: 'Acceso Denegado. No Tiene Permiso Suficiente'
        });
      }

      // Añadir usuario al request
      req.user = user;
      next();
    } catch (error) {
      console.error('Error en Middleware de Permisos:', error);
      res.status(401).json({
        success: false,
        message: 'Token Inválido o Expirado'
      });
    }
  };
};

module.exports = { checkRole, checkPermission }
