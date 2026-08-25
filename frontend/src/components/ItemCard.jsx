import styles from "./ItemCard.module.css";

const ItemCard = ({ publicacion }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.imagen}
        src={
          publicacion.imagen
            ? `http://localhost:5000${publicacion.imagen}`
            : "https://placehold.co/300x200?text=Sin+imagen"
        }
        alt={publicacion.titulo}
      />
      <div className={styles.info}>
        <p className={styles.precio}>Q{publicacion.precio}</p>
        <h3 className={styles.titulo}>{publicacion.titulo}</h3>
        <p className={styles.ubicacion}>
          {publicacion.municipio}, {publicacion.departamento} •{" "}
          {publicacion.categoria}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
