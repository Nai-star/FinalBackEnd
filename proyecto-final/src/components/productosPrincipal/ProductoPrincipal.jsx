import React, { useEffect, useState } from "react";
import "./productoP.css";
import { getProductos } from "../../services/servicios"; // asegúrate de la ruta correcta

function ProductoPrincipal() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="productos-section">
      <h2>Productos</h2>
      <p className="subtitulo">Ordena tu producto favorito</p>

      <div className="productos-grid">
        {productos.map((prod) => (
          <div className="producto-card" key={prod.id}>
            <img src={prod.img} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p className="precio">{prod.precio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductoPrincipal;


