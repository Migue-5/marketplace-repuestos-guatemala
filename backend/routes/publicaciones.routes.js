const express = require("express");
const verificarToken = require("../middlewares/auth.middleware");
const {
  obtenerPublicacionesC,
  obtenerPubPorIdC,
  crearPublicacionC,
  actualizarPublicacionC,
  eliminarPublicacionC,
} = require("../controllers/publicaciones.controller");

const router = express.Router();

router.get("/", obtenerPublicacionesC);
router.get("/:id", obtenerPubPorIdC);
router.post("/", verificarToken, crearPublicacionC);
router.put("/:id", verificarToken, actualizarPublicacionC);
router.delete("/:id", verificarToken, eliminarPublicacionC);

module.exports = router;
