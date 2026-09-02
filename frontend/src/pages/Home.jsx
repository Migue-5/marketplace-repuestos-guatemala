import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import styles from "./Home.module.css";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");

  const { usuario } = useAuth();

  // cargar categorias y ubicaciones
  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        const [catRes, ubiRes] = await Promise.all([
          api.get("/categorias"),
          api.get("/ubicaciones"),
        ]);
        setCategorias(catRes.data);
        setUbicaciones(ubiRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarFiltros();
  }, []);

  // cargar publicaciones
  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const params = {};
        if (categoriaSeleccionada) params.categoria_id = categoriaSeleccionada;
        if (ubicacionSeleccionada) params.ubicacion_id = ubicacionSeleccionada;

        const respuesta = await api.get("/publicaciones", { params });
        setPublicaciones(respuesta.data);
      } catch (error) {
        setError("error al cargar publicaciones");
      } finally {
        setCargando(false);
      }
    };

    cargarPublicaciones();
  }, [categoriaSeleccionada, ubicacionSeleccionada]);
  return (
    <div className={styles.layout}>
      <Sidebar
        categorias={categorias}
        ubicaciones={ubicaciones}
        onCategoriaChange={setCategoriaSeleccionada}
        onUbicacionChange={setUbicacionSeleccionada}
      />

      <div>
        <div className={styles.header}>
          <h1>Publicaciones</h1>

          <Link
            to={usuario ? "/crear" : "/login"}
            className={styles.botonCrear}>
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
    </div>
  );
};

export default Home;
