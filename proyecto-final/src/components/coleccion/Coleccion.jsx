import React, { useState, useEffect } from "react";
import { getProductos } from "../../services/servicios";
import "./coleccion.css"; // Creamos estilos separados

const Coleccion = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  return (
    <div className="coleccion-container">
      <h2>Mis Productos</h2>
      <div className="cards-container">
        {productos.length === 0 ? (
          <p>No hay productos aún</p>
        ) : (
          productos.map((p) => (
            <div key={p.id} className="card">
              <img src={p.img} alt={p.nombre} className="card-img" />
              <div className="card-info">
                <h3>{p.nombre}</h3>
                <p>${p.precio}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Coleccion;

