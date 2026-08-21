const express = require("express");
const {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
} = require("../controllers/usuarios.controller");
const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/me", verificarToken, obtenerPerfil);

module.exports = router;
