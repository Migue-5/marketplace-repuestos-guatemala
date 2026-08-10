const jwt = require("jsonwebtoken");

// middleware verificar token
const verificarToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ mensaje: "no autorizado" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "token invalido" });
  }
};

module.exports = verificarToken;
