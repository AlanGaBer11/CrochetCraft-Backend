const authProcess = require("../processes/authProcess");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar datos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    // Registrar usuario
    const user = await authProcess.registerUser(nombre, email, password);

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ success: true, message: "Usuario Registrado", user, token });
  } catch (error) {
    console.error("Error Al Registrar El Usuario:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos obligatorios
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Correo y contraseña son obligatorios" });
    }

    // Obtener usuario autenticado
    const user = await authProcess.loginUser(email, password);

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, message: "Inicio de sesión exitoso", user, token });
  } catch (error) {
    console.error("Error Al Iniciar Sesión:", error);

    // Si el error es de autenticación, enviamos 401
    if (error.message === "El Usuario No Existe" || error.message === "Contraseña incorrecta") {
      return res.status(401).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
