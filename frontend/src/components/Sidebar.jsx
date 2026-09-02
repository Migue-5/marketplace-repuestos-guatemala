import s from "./Sidebar.module.css";

const Sidebar = ({
  categorias,
  ubicaciones,
  onCategoriaChange,
  onUbicacionChange,
}) => {
  return (
    <div className={s.sidebar}>
      <button
        className={s.botonExplorar}
        onClick={() => {
          onCategoriaChange("");
          onUbicacionChange("");
        }}>
        Explorar todo
      </button>

      <h2>Filtros</h2>
      <label htmlFor="categorias">Categorías</label>
      <select
        name="categorias"
        id="categorias"
        onChange={(e) => onCategoriaChange(e.target.value)}>
        <option value="">Selecciona categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <h2>Ubicación</h2>
      <label htmlFor="ubicacion">Ubicación</label>
      <select
        name="ubicacion"
        id="ubicacion"
        onChange={(e) => onUbicacionChange(e.target.value)}>
        <option value="">Selecciona ubicación</option>
        {ubicaciones.map((ubi) => (
          <option key={ubi.id} value={ubi.id}>
            {ubi.municipio}, {ubi.departamento}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sidebar;
