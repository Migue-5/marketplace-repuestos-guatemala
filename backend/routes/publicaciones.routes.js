const express = require("express");
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
router.post("/", crearPublicacionC);
router.put("/:id", actualizarPublicacionC);
router.delete("/:id", eliminarPublicacionC);

module.exports = router;
