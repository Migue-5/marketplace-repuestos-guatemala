const db = require("../config/db");

// obtener todas las imagenes
const obtenerImagenes = async (publicacion_id) => {
  const query = "SELECT id, url_imagen from imagenes WHERE publicacion_id = ?";
  const resultado = await db.query(query, [publicacion_id]);

  return resultado[0];
};

// crear imagenes
const crearImagenes = async (datos) => {
  const query = "insert into imagenes (publicacion_id, url_imagen) values(?,?)";

  const resultado = await db.query(query, [
    datos.publicacion_id,
    datos.url_imagen,
  ]);
  return resultado[0].insertId;
};

// eliminar imagen
const eliminarImagen = async (id) => {
  const query = "delete from imagenes where id = ?";
  const resultado = await db.query(query, [id]);

  return resultado[0].affectedRows;
};

module.exports = { obtenerImagenes, crearImagenes, eliminarImagen };
