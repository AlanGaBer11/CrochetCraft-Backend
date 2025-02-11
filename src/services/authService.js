const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION */
// REGISTER USER
const registerUser = async (nombre, email, password) => {
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("El Email Ya Está Registrado");
    }
    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // CREAR NUEVO USUARIO
    const newUser = new userModel({ nombre, email, password: hashedPassword });
    await newUser.save();

    return "Usuario Registrado Con Éxito";
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('El email ya está en uso');
    }
    throw new Error(`Error en el registro: ${error.message}`);
  }
};

// LOGIN USER
const loginUser = async (email, password) => {
  try {
    // VERIFICAR SI EL USUARIO EXISTE
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("El Usuario No Existe");
    }
    // VERIFICAR SI LA CONTRASEÑA ES CORRECTA
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }
    // GENERAR UN TOKEN JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Error al generar el token');
    }
    throw new Error(`Error en el login: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
