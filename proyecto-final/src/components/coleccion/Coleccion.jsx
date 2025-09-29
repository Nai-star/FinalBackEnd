import React, { useState, useEffect } from "react";
import { getProductos } from "../../services/servicios";
import "./coleccion.css"; 
import { useNavigate } from "react-router-dom";

const Coleccion = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate()

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
    productos.map((producto) => (
   <div key={producto.id} className="card"  onClick={() => navigate(`/producto/${producto.id}`)}>
     
    <img src={producto.img} alt={producto.nombre} className="card-img" />
     <div className="card-info">
   <h3>{producto.nombre}</h3>
   <p>${producto.precio}</p>
    </div>
    </div>
     ))
    )}
    </div>
    </div>
  );
};

export default Coleccion;

