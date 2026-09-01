import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import styles from "./Home.module.css";

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { usuario } = useAuth();
  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const respuesta = await api.get("/publicaciones");
        // console.log(respuesta);
        setPublicaciones(respuesta.data);
      } catch (error) {
        setError("error al cargar publicaciones");
      } finally {
        setCargando(false);
      }
    };

    cargarPublicaciones();
  }, []);
  return (
    <div>
      <div className={styles.header}>
        <h1>Publicaciones</h1>

        <Link to={usuario ? "/crear" : "/login"} className={styles.botonCrear}>
          + Crear publicación
        </Link>
      </div>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <div className={styles.grid}>
          {publicaciones.map((pub) => (
            <ItemCard key={pub.id} publicacion={pub} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
