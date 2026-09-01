import { useEffect, useState } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import s from "./Home.module.css";

const Perfil = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // estados de usuario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editando, setEditando] = useState(false);
  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const respuesta = await api.get("/publicaciones/mis-publicaciones");

        setPublicaciones(respuesta.data);
      } catch (error) {
        setError("error al cargar publicaciones");
      } finally {
        setCargando(false);
      }
    };

    const cargarDatosUsuario = async () => {
      try {
        const resultado = await api.get("/auth/me");

        setNombre(resultado.data.usuario.nombre);
        setTelefono(resultado.data.usuario.telefono);
      } catch (error) {
        setError("error al cargar");
      } finally {
        setCargando(false);
      }
    };

    cargarDatosUsuario();
    cargarPublicaciones();
  }, []);

  // funcion guardar perfil
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/perfil", { nombre, telefono });
      setEditando(false);
    } catch (error) {
      setError("error al actualizar perfil");
    }
  };
  return (
    <div>
      <div>
        {editando ? (
          <form onSubmit={handleGuardar}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="telefono">Telefono</label>
            <input
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <>
              <button type="submit">Guardar</button>
            </>
          </form>
        ) : (
          <>
            <h1>{nombre}</h1>
            <h2> telefono</h2>
            <p>{telefono}</p>
            <button onClick={() => setEditando(true)}>Editar perfil</button>
          </>
        )}
        <hr />
      </div>
      <h2>Publicaciones</h2>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <ul className={s.grid}>
          {publicaciones.map((pub) => (
            <ItemCard key={pub.id} publicacion={pub} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Perfil;
