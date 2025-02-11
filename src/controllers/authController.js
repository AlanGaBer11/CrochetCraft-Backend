const authProcess = require("../processes/authProcess");

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const result = await authProcess.registerUser(nombre, email, password);
    res.status(201).json({ message: result });
  } catch (error) {
    console.error("Error Al Registrar El Usuario:", error);
    res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son obligatorios" });
    }
    const result = await authProcess.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Al Iniciar Sesión:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
