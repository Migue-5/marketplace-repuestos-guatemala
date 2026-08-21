const { obtenerUbicacion } = require("../models/ubicacion.model");

const obtenerUbicacionC = async (req, res) => {
  try {
    const ubicacion = await obtenerUbicacion();
    res.status(200).json(ubicacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ubicacion" });
  }
};

module.exports = { obtenerUbicacionC };
