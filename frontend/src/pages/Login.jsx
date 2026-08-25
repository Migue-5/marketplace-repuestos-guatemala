import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //   obtener login de setAuth
  const { login } = useAuth();

  //obtenemos funcion de navigate de usenavigate()
  const navigate = useNavigate();

  //   manejar el submit del form
  const handleSubmint = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("credenciales incorrectas");
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}>Tu Repuesto GT</div>

        <h2>Iniciar sesion</h2>

        <form className={styles.form} onSubmit={handleSubmint}>
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
          <button className={styles.button} type="submit">
            Login
          </button>
          <p className={styles.footer}>
            ¿No tenés cuenta?{" "}
            <Link className={styles.link} to="/registro">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
