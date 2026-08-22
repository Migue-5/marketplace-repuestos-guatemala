const {
  obtenerImagenes,
  crearImagenes,
  eliminarImagen,
} = require("../models/imagenes.model");

const obtenerImagenesC = async (req, res) => {
  try {
    const id_pub = req.params.id;
    const imagenes = await obtenerImagenes(id_pub);

    res.status(200).json(imagenes);
  } catch (error) {
    // console.log(error);

    res.status(500).json({ mensaje: "Error al obtener imagenes" });
  }
};

// crear imagen
const crearImagenesC = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.publicacion_id || !datos.url_imagen) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const nuevoId = await crearImagenes(datos);

    res.status(201).json({ mensaje: "creada", id: nuevoId });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear imagenes" });
  }
};

// eliminar imagen
const eliminarImagenC = async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await eliminarImagen(id);

    if (resultado === 0) {
      return res.status(404).json({ mensaje: "imagen no encontrada" });
    }

    res.status(200).json({ mensaje: "imagen eliminada " });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar imagenes" });
  }
};

// subir imagenes a uploads

const subirImagenesC = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ mensaje: "No se subió ningún archivo" });
    }

    const urls = req.files.map((archivo) => `/uploads/${archivo.filename}`);
    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir imagen" });
  }
};
module.exports = {
  obtenerImagenesC,
  crearImagenesC,
  eliminarImagenC,
  subirImagenesC,
};
