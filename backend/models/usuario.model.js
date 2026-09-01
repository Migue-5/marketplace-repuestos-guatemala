const db = require("../config/db");

const crearUsuario = async (datos) => {
  const query =
    "INSERT INTO usuarios (nombre,email,password,telefono) values (?,?,?,?)";

  const resultado = await db.query(query, [
    datos.nombre,
    datos.email,
    datos.password,
    datos.telefono,
  ]);

  return resultado[0].insertId;
};

// obtener usuario por email

const obtenerUsuarioPorEmail = async (email) => {
  const query =
    "Select id, nombre, email, password from usuarios where email = ?";

  const resultado = await db.query(query, [email]);

  return resultado[0][0];
};

// obtener por id
const obtenerPerfilPorId = async (id) => {
  const query = `Select id, nombre, email, telefono from usuarios where id = ?`;

  const resultado = await db.query(query, [id]);

  return resultado[0][0];
};

// actualizar usuario
const actualizarUsuario = async (id, datos) => {
  const query = `UPDATE usuarios set nombre = ? , telefono = ? where id = ?`;

  const resultado = await db.query(query, [datos.nombre, datos.telefono, id]);

  return resultado[0].affectedRows;
};
module.exports = {
  crearUsuario,
  obtenerUsuarioPorEmail,
  obtenerPerfilPorId,
  actualizarUsuario,
};
