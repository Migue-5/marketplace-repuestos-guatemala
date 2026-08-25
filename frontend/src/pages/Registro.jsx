import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Registro.module.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //   manejar el submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/registro", { nombre, email, password, telefono });
      navigate("/login"); // redirige a login tras registrarse
    } catch (error) {
      setError("error al registrar usuario");
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {" "}
        <h2>Registrate</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Registrarse</button>

          <p className={styles.footer}>
            ¿Ya tenés cuenta?{" "}
            <Link className={styles.link} to="/login">
              Inicia sesion
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
