import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DetallePublicacion.module.css";

const DetallePublicacion = () => {
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargcando] = useState(true);
  const [error, setError] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const id = useParams().id;

  useEffect(() => {
    const cargarPublicacion = async () => {
      try {
        const respuesta = await api.get(`/publicaciones/${id}`);
        setPublicacion(respuesta.data);
      } catch (error) {
        setError("error al cargar publicacion");
      } finally {
        setCargcando(false);
      }
    };
    cargarPublicacion();
  }, [id]);

  const siguiente = () => {
    setIndiceActual((prev) => (prev + 1) % publicacion.imagenes.length);
  };

  const anterior = () => {
    setIndiceActual(
      (prev) =>
        (prev - 1 + publicacion.imagenes.length) % publicacion.imagenes.length,
    );
  };

  return (
    <div className={styles.page}>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <div className={styles.contenido}>
          <div className={styles.imagenes}>
            <img
              src={`http://localhost:5000${publicacion.imagenes[indiceActual]?.url_imagen}`}
              alt={publicacion.titulo}
            />
            {publicacion.imagenes.length > 1 && (
              <>
                <button onClick={anterior} className={styles.flechaIzq}>
                  <ChevronLeft size={22}></ChevronLeft>
                </button>
                <button onClick={siguiente} className={styles.flechaDer}>
                  {" "}
                  <ChevronRight size={22}></ChevronRight>
                </button>
              </>
            )}
          </div>

          <div className={styles.info}>
            <h1>{publicacion.titulo}</h1>
            <p className={styles.precio}>Q{publicacion.precio}</p>

            <h2>descripcion del vendedor</h2>
            <p>{publicacion.descripcion}</p>

            <p>{publicacion.categoria}</p>
            <p>
              {publicacion.municipio}, {publicacion.departamento}{" "}
            </p>

            <div className={styles.vendedor}>
              <h2>Informacion del vendedor</h2>
              <h3>Nombre</h3>
              <p>{publicacion.nombre}</p>
              <h3>Telefono</h3>
              <p>{publicacion.telefono}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePublicacion;
