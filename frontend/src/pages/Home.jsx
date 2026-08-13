import { useEffect, useState } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <ul>
          {publicaciones.map((pub) => (
            <ItemCard key={pub.id} publicacion={pub} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
