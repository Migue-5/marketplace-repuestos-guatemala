// 2. Importamos el componente de la tarjeta individual
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const ItemGrid = () => {
  // Estado 1: Guarda la lista de repuestos que viene de MySQL
  const [repuestos, setRepuestos] = useState([]);

  // Estado 2: Controla si la petición está en proceso
  const [cargando, setCargando] = useState(true);

  // Estado 3: Guarda un mensaje si ocurre algún error de conexión
  const [error, setError] = useState(null);

  // useEffect se ejecuta automáticamente cuando el componente se monta en pantalla
  useEffect(() => {
    fetch("http://localhost:5000/api/repuestos")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la lista de repuestos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setRepuestos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error en fetch:", error);
        setError(error.message); // Guardamos el error
        setCargando(false);
      });
  }, []);

  // --- CONDICIONES DE RENDERIZADO ---

  // Si todavía está cargando, mostramos un mensaje
  if (cargando) {
    return (
      <main className="content-area">
        <p>Cargando publicaciones...</p>
      </main>
    );
  }

  // Si ocurrió un error, mostramos el mensaje de falla
  if (error) {
    return (
      <main className="content-area">
        <p style={{ color: "red" }}>Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="content-area">
      <h3 className="section-title">Destacados de hoy</h3>

      {/* Contenedor que acomodará las tarjetas en cuadrícula */}
      <div className="items-grid">
        {repuestos.map((item) => (
          /* Renderizamos un ItemCard por cada elemento del arreglo */
          <ItemCard key={item.id} repuesto={item} />
        ))}
      </div>
    </main>
  );
};

export default ItemGrid;
