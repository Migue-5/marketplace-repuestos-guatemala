const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.js");
const publicacionesRouter = require("./routes/publicaciones.routes.js");
const imagenesRouter = require("./routes/imagenes.routes.js");
const usuariosRouter = require("./routes/usuarios.routes.js");

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
