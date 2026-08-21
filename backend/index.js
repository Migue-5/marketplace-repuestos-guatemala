const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.js");
const publicacionesRouter = require("./routes/publicaciones.routes.js");
const imagenesRouter = require("./routes/imagenes.routes.js");
const usuariosRouter = require("./routes/usuarios.routes.js");
const ubicacionesRouter = require("./routes/ubicaciones.routes.js");
const categoriasRouter = require("./routes/categorias.routes.js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// rutas de publicaciones
app.use("/api/publicaciones", publicacionesRouter);

// rutas de imagens
app.use("/api/imagenes", imagenesRouter);

// rutas usuarios
app.use("/api/auth", usuariosRouter);

// rutas categorias
app.use("/api/categorias", categoriasRouter);

// rutas ubicaciones
app.use("/api/ubicaciones", ubicacionesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
