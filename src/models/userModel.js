/* USER MODEL */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const roles = {
  values: ['ADMIN', 'CLIENTE'],
  message: '{VALUE} no es un rol válido'
}

// PERMISOS PARA CADAR ROL
const rolePermissions = {
  ADMIN: ['read', 'write', 'update', 'delete', 'manage_users', 'manage_products', 'manage_orders'],
  CLIENTE: ['read', 'place_order', 'view_profile']
}

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es necesario'],
      trim: true // ELIMINA ESPACIOS SI ES NECESARIO
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'El correo es necesario'],
      lowercase: true, // CONVIERTE A MINÚSCULAS
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Debe indicar un email válido'
      ]
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },
    rol: {
      type: String,
      enum: roles,
      default: 'CLIENTE',
      required: true
    },
    permissions: {
      type: [String],
      default: function() {
        return rolePermissions[this.rol] || rolePermissions.CLIENTE;
      }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationCode: { type: String }, // Código de verificación
    verified: { type: Boolean, default: false } // Estado de verificación
  },
  { timestamps: true }
)

// PLUGIN PARA VERIFICAR LOS CAMPOS ÚNICOS
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

// Method to check if user has a specific permission
userSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission);
};

// Method to update permissions based on role
userSchema.methods.updatePermissions = function() {
  this.permissions = rolePermissions[this.rol] || rolePermissions.CLIENTE;
  return this.permissions;
};

module.exports = mongoose.model('users', userSchema)
