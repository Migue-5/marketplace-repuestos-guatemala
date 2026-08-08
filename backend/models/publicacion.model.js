const db = require("../config/db");

// obtener todas
const obtenerPublicaciones = async () => {
  const query = "SELECT * FROM publicaciones";
  const resultado = await db.query(query);

  return resultado[0];
};

// obtener por id
const obtenerPubPorID = async (id) => {
  const query = "SELECT * FROM publicaciones WHERE id = ?";
  const resultado = await db.query(query, [id]);

  return resultado[0][0];
};

// crearPublicacion publicacion
const crearPublicacion = async (datos) => {
  const query = `INSERT INTO publicaciones 
  (usuario_id, categoria_id, ubicacion_id, tipo, titulo, descripcion, precio) 
    VALUES (?,?,?,?,?,?,?)`;

  const resultado = await db.query(query, [
    datos.usuario_id,
    datos.categoria_id,
    datos.ubicacion_id,
    datos.tipo,
    datos.titulo,
    datos.descripcion,
    datos.precio,
  ]);
  return resultado[0].insertId;
};

// actualizar publicacion
const actualizarPublicacion = async (id, datos) => {
  const query = `UPDATE publicaciones SET categoria_id = ?, ubicacion_id = ?, tipo = ?, 
  titulo = ?, descripcion = ?, precio = ?   WHERE id = ?`;
  const resultado = await db.query(query, [
    datos.categoria_id,
    datos.ubicacion_id,
    datos.tipo,
    datos.titulo,
    datos.descripcion,
    datos.precio,
    id,
  ]);

  return resultado[0].affectedRows;
};

// eliminar publicacion
const eliminarPublicacion = async (id) => {
  const query = "DELETE from publicaciones WHERE id = ?";
  const resultado = await db.query(query, [id]);

  return resultado[0].affectedRows;
};

module.exports = {
  obtenerPublicaciones,
  obtenerPubPorID,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
};
