import { Car, Plus, Search, Wrench } from "lucide-react";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <h2>marketplace repuestos</h2>

      {/* seccion nde busqueda */}
      <div className="bsuqueda">
        <Search size={18} color="#65676b" />

        {/* Campo de texto donde el usuario escribe lo que busca */}

        <input
          type="text"
          placeholder="Buscar en Repuestos..."
          className="search-input"
        />
      </div>

      {/* --- BOTÓN PARA CREAR NUEVO ANUNCIO --- */}
      <button className="btn-create">
        <Plus size={18} />
        Crear publicación
      </button>

      {/* --- LISTA DE NAVEGACIÓN Y CATEGORÍAS --- */}
      <ul className="menu-list">
        {/* Cada <li> es una opción del menú con su respectivo icono */}
        <li className="menu-item">
          <Car size={20} /> Vehículos completos
        </li>
        <li className="menu-item">
          <Wrench size={20} /> Repuestos y Partes
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
