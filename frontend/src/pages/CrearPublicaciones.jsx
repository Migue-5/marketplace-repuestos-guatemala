import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./CrearPublicacion.module.css";

const CrearPublicaciones = () => {
  const [archivos, setArchivos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria_id, setCategoria_id] = useState("");
  const [ubicacion_id, setUbicacion_id] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
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

    cargarDatos();
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuestaPub = await api.post("/publicaciones", {
        titulo,
        descripcion,
        precio,
        tipo,
        categoria_id,
        ubicacion_id,
      });

      const nuevoId = respuestaPub.data.id;
      console.log(archivos);

      if (archivos.length > 0) {
        const formData = new FormData();
        archivos.forEach((archivo) => {
          formData.append("imagenes", archivo);
        });

        const respuestaUpload = await api.post("/imagenes/upload", formData);
        const urls = respuestaUpload.data.urls;

        for (const url of urls) {
          await api.post("/imagenes", {
            publicacion_id: nuevoId,
            url_imagen: url,
          });
        }
      }

      navigate("/");
    } catch (error) {
      seterror("error al crear publicacion");
      console.log(error);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>Crear publicacion</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="imagen" className={styles.btnimagen}>
            <span>+ Agregar fotos</span>
          </label>

          <input
            className={styles.inputOculto}
            type="file"
            id="imagen"
            multiple
            accept="image/*"
            onChange={(e) => setArchivos(Array.from(e.target.files))}
          />

          <label htmlFor="titulo">titulo</label>
          <input
            type="text"
            id="titulo"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label htmlFor="descripcion">descripcion</label>
          <textarea
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required></textarea>

          <label htmlFor="precio">precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />

          <label htmlFor="tipo">tipo</label>
          <select
            name="tipo"
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required>
            <option value="">Selecciona tipo</option>
            <option value="repuesto"> repuesto</option>
            <option value="vehiculo"> vehiculo</option>
          </select>

          <label htmlFor="categoria">categoria</label>
          <select
            id="categoria"
            value={categoria_id}
            onChange={(e) => setCategoria_id(e.target.value)}
            required>
            <option value="">Selecciona categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="ubicacion">Ubicacion</label>
          <select
            id="ubicacion"
            value={ubicacion_id}
            onChange={(e) => setUbicacion_id(e.target.value)}
            required>
            <option value="">seleccionar ubicacion</option>
            {ubicaciones.map((ubi) => (
              <option key={ubi.id} value={ubi.id}>
                {ubi.municipio},{ubi.departamento}
              </option>
            ))}
          </select>
          {error && <p className={styles.error}>{error}</p>}

          <button type="submit">Crear publicacion</button>
        </form>
      </div>
    </div>
  );
};

export default CrearPublicaciones;
