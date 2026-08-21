const express = require("express");
const { obtenerCategoriasC } = require("../controllers/categoria.controller");

const router = express.Router();

router.get("/", obtenerCategoriasC);

module.exports = router;
