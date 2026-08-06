const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [filas] = await db.query(` SELECT 
        repuestos.id,
        repuestos.titulo,
        repuestos.descripcion,
        repuestos.precio,
        repuestos.estado_repuesto,
        repuestos.marca_carro,
        repuestos.modelo_carro,
        repuestos.anio_carro,
        usuarios.nombre AS vendedor,
        usuarios.telefono AS contacto,
        usuarios.departamento AS ubicacion
      FROM repuestos
      INNER JOIN usuarios ON repuestos.vendedor_id = usuarios.id
      ORDER BY repuestos.creado_en DESC `);

    res.json(filas);
  } catch (error) {
    console.error("Error al obtener repuestos:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista de repuestos" });
  }
});

module.exports = router;
