const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
    return newUser;
    
  } catch (error) {
    throw new Error(`Error En El registro: ${error.message}`);
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
      throw new Error("Contraseña Incorrecta");
    }

    return user;
  } catch (error) {
    throw new Error(`Error En El Login: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
};