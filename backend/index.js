const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.js");
const publicacionesRouter = require("./routes/publicaciones.routes.js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/publicaciones", publicacionesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
