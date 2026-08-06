const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.js");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ status: "ok", mensaje: "API funcionando al 100%" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
