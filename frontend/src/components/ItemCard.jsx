const ItemCard = ({ publicacion }) => {
  return (
    <div>
      <img
        src={
          publicacion.imagen
            ? `http://localhost:5000${publicacion.imagen}`
            : "https://placehold.co/300x200"
        }
        alt={publicacion.titulo}
      />
      <p>{publicacion.precio}</p>
      <h3>{publicacion.titulo}</h3>
      <p>
        {publicacion.municipio}, {publicacion.departamento} •{" "}
        {publicacion.categoria}
      </p>
    </div>
  );
};

export default ItemCard;
