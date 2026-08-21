const express = require("express");
const { obtenerUbicacionC } = require("../controllers/ubicaciones.controller");

const router = express.Router();

router.get("/", obtenerUbicacionC);

module.exports = router;
