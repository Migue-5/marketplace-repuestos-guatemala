import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const DetallePublicacion = () => {
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargcando] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <div>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <div>
          {publicacion.imagenes.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img.url_imagen}`}
              alt={publicacion.titulo}
            />
          ))}

          <p>{publicacion.titulo}</p>
          <p>{publicacion.descripcion}</p>
          <p>{publicacion.precio}</p>
          <p>{publicacion.categoria}</p>
          <p>{publicacion.municipio}</p>
          <p>{publicacion.departamento}</p>
          <p>{publicacion.nombre}</p>
          <p>{publicacion.telefono}</p>
        </div>
      )}
    </div>
  );
};

export default DetallePublicacion;
