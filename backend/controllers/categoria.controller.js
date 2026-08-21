const { obtenerCategorias } = require("../models/categoria.model");

const obtenerCategoriasC = async (req, res) => {
  try {
    const categorias = await obtenerCategorias();

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categorias" });
  }
};

module.exports = { obtenerCategoriasC };
