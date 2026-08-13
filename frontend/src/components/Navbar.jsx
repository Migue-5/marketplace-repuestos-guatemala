import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Marketplace repuestos</Link>

      {usuario ? (
        <>
          <span>Hola {usuario.nombre}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <p>
            <Link to="/login">Iniciar sesión</Link>
          </p>
          <p>
            <Link to="/registro">Registrarse</Link>
          </p>
        </>
      )}
    </nav>
  );
};

export default Navbar;
