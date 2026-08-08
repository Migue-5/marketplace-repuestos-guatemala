const {
  obtenerPublicaciones,
  obtenerPubPorID,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
} = require("../models/publicacion.model");

// obtener todas las publicaciones
const obtenerPublicacionesC = async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();

    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener publicaciones" });
  }
};

// obtener por id
const obtenerPubPorIdC = async (req, res) => {
  try {
    const id = req.params.id;

    const publicacion = await obtenerPubPorID(id);
    if (!publicacion) {
      return res.status(404).json({ mensaje: "no encontrada" });
    }

    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener publicaciones" });
  }
};

// crear publicacion

const crearPublicacionC = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.titulo || !datos.precio || !datos.categoria_id) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const nuevoId = await crearPublicacion(datos);

    res.status(201).json({ mensaje: "creada", id: nuevoId });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear publicaciones" });
  }
};

// actualizar publicacion
const actualizarPublicacionC = async (req, res) => {
  try {
    const id = req.params.id;

    const pubActual = await obtenerPubPorID(id);

    if (!pubActual) {
      return res.status(404).json({ mensaje: "publicacion no encontrada" });
    }

    const datosActualizados = {
      categoria_id: req.body.categoria_id ?? pubActual.categoria_id,
      ubicacion_id: req.body.ubicacion_id ?? pubActual.ubicacion_id,
      tipo: req.body.tipo ?? pubActual.tipo,
      titulo: req.body.titulo ?? pubActual.titulo,
      descripcion: req.body.descripcion ?? pubActual.descripcion,
      precio: req.body.precio ?? pubActual.precio,
    };
    const resultado = await actualizarPublicacion(id, datosActualizados);

    if (resultado === 0) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    res.status(200).json({ mensaje: "datos actualizados" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ mensaje: "Error al actualizar publicaciones" });
  }
};

// eliminar publicacion
const eliminarPublicacionC = async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await eliminarPublicacion(id);

    if (resultado === 0) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    res.status(204).json({ mensaje: "publicacion eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar publicaciones" });
  }
};

module.exports = {
  obtenerPublicacionesC,
  obtenerPubPorIdC,
  crearPublicacionC,
  actualizarPublicacionC,
  eliminarPublicacionC,
};
