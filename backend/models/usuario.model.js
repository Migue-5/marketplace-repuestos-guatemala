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

module.exports = { crearUsuario, obtenerUsuarioPorEmail };
