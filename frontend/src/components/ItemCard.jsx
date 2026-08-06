const ItemCard = ({ repuesto }) => {
  // Si el repuesto no tiene foto cargada en la BD, usamos una imagen genérica por defecto
  const imagenUrl = repuesto.imagen_url || "https://picsum.photos/300/300";
  return (
    <div className="card">
      {/* --- SECCIÓN DE LA IMAGEN --- */}
      <div className="img-card">
        <img src={imagenUrl} alt={repuesto.titulo} className="card-image" />
      </div>

      {/* --- SECCIÓN DEL TEXTO --- */}
      <div className="card-content">
        {/* Precio en negrita estilo Facebook Marketplace */}
        <div className="card-price">Q {repuesto.precio}</div>

        {/* Título o nombre de la publicación */}
        <div className="card-title">{repuesto.titulo}</div>

        {/* Ubicación del vendedor y marca del vehículo */}
        <div className="card-location">
          {repuesto.ubicacion} • {repuesto.marca_carro}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
