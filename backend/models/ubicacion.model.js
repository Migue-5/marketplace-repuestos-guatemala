const db = require("../config/db");

const obtenerUbicacion = async () => {
  const query = "SELECT * FROM ubicaciones";
  const resultado = await db.query(query);
  return resultado[0];
};

module.exports = { obtenerUbicacion };
