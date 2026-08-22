const express = require("express");
const {
  obtenerImagenesC,
  crearImagenesC,
  eliminarImagenC,
  subirImagenesC,
} = require("../controllers/imagenes.controller");
const upload = require("../config/multer");
const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id", obtenerImagenesC);
router.post("/", crearImagenesC);
router.delete("/:id", eliminarImagenC);
router.post(
  "/upload",
  verificarToken,
  upload.array("imagenes", 10),
  subirImagenesC,
);

module.exports = router;
