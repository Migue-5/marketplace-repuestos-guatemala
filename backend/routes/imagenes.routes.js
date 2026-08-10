const express = require("express");
const {
  obtenerImagenesC,
  crearImagenesC,
  eliminarImagenC,
} = require("../controllers/imagenes.controller");

const router = express.Router();

router.get("/:id", obtenerImagenesC);
router.post("/", crearImagenesC);
router.delete("/:id", eliminarImagenC);

module.exports = router;
