const db = require("../config/db");

// obtener todas
const obtenerPublicaciones = async (filtros = {}) => {
  const condiciones = [];
  const valores = [];

  if (filtros.categoria_id) {
    condiciones.push("p.categoria_id = ?");
    valores.push(filtros.categoria_id);
  }

  if (filtros.ubicacion_id) {
    condiciones.push("p.ubicacion_id = ?");
    valores.push(filtros.ubicacion_id);
  }

  const whereClause =
    condiciones.length > 0 ? "WHERE " + condiciones.join(" AND ") : "";

  const query = `
    SELECT 
    p.id, p.titulo, p.descripcion, p.precio, p.tipo, p.estado,
    c.nombre AS categoria,
    u.departamento, u.municipio,
    (SELECT i.url_imagen FROM imagenes i WHERE i.publicacion_id = p.id LIMIT 1) AS imagen
    FROM publicaciones p
    INNER JOIN categorias c ON p.categoria_id = c.id
    INNER JOIN ubicaciones u ON p.ubicacion_id = u.id
    ${whereClause}
  `;

  const resultado = await db.query(query, valores);

  return resultado[0];
};

// obtener por id
const obtenerPubPorID = async (id) => {
  const query = `
  SELECT 
  publicaciones.id,
  publicaciones.titulo,
  publicaciones.descripcion,
  publicaciones.precio,
  publicaciones.tipo,
  publicaciones.estado,
  categorias.nombre AS categoria,
  ubicaciones.departamento,
  ubicaciones.municipio,
  usuarios.nombre,
  usuarios.telefono
  FROM publicaciones 
  inner join categorias on publicaciones.categoria_id = categorias.id
  inner join ubicaciones on publicaciones.ubicacion_id = ubicaciones.id
  inner join usuarios on publicaciones.usuario_id = usuarios.id 
    where publicaciones.id = ?
  `;

  const query2 = `SELECT url_imagen from imagenes where publicacion_id = ?`;

  const resultado = await db.query(query, [id]);
  const resultadoImagenes = await db.query(query2, [id]);

  const publicacion = resultado[0][0];
  publicacion.imagenes = resultadoImagenes[0];

  return publicacion;
};

//
//
// obtener publicaciones por usuario
const obtenerPublicacionesPorUsuario = async (usuario_id) => {
  const query = `
  select
  p.id, p.titulo, p.descripcion, p.precio, p.tipo, p.estado,
  c.nombre as categoria,
  u.departamento, u.municipio,
  (select i.url_imagen from imagenes i where i.publicacion_id = p.id limit 1) as imagen
  from publicaciones p
  inner join categorias c on p.categoria_id = c.id
  INNER JOIN ubicaciones u ON p.ubicacion_id = u.id
  WHERE p.usuario_id = ?
  `;

  const resultado = await db.query(query, [usuario_id]);

  return resultado[0];
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
  obtenerPublicacionesPorUsuario,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
};
