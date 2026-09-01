const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  crearUsuario,
  obtenerUsuarioPorEmail,
  actualizarUsuario,
  obtenerPerfilPorId,
} = require("../models/usuario.model");

// funcion de registrar usuario
const registrarUsuario = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.nombre || !datos.email || !datos.password) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const emailExistente = await obtenerUsuarioPorEmail(datos.email);
    if (emailExistente) {
      return res.status(409).json({ mensaje: "email ya usado" });
    }

    const contraHasheada = await bcrypt.hash(datos.password, 10);

    const nuevoId = await crearUsuario({ ...datos, password: contraHasheada });

    res.status(201).json({ mensaje: "usuario creado", id: nuevoId });
  } catch (error) {
    res.status(500).json({ mensaje: "error al crear usuario" });
  }
};

// login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ mensaje: "credenciales invalidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "credenciales invalidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.status(200).json({
      mensaje: "login exitoso",
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "error al ingresar " });
  }
};

// obtener por id
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await obtenerPerfilPorId(req.usuario.id);
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
};

// actualizar usuario
const actualizarUsuarioC = async (req, res) => {
  try {
    const id = req.usuario.id;
    const datos = req.body;

    const resultado = await actualizarUsuario(id, datos);

    res.status(200).json({ mensaje: "perfil actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar perfil" });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarUsuarioC,
};
