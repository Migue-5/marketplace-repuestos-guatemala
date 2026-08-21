const db = require("../config/db");

const obtenerCategorias = async () => {
  const query = "SELECT * FROM categorias";
  const resultado = await db.query(query);
  return resultado[0];
};

module.exports = { obtenerCategorias };
