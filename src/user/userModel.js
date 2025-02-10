const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  //? ROLES, ADMIN??
  nombre: {
    type: String,
  
    required: [true, "El nombre es necesario"],
    trim: true // ELIMINA ESPACIOS SI ES NECESARIO
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
    lowercase: true, // CONVIERTE A MINÚSCULAS
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Debe indicar un email válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
}, { timestamps: true }
);

// PLUGIN PARA VERIFICAR LOS CAMPOS ÚNICOS
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model("Users", userSchema);
