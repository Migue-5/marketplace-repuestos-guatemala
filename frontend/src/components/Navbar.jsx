import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { usuario, logout, cargando } = useAuth();
  if (cargando) return null;
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        {" "}
        Tu Repuesto GT{" "}
      </Link>

      <div className={styles.links}>
        {usuario ? (
          <>
            <span>Hola {usuario.nombre}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>

            <Link to="/registro">Registrarse </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
