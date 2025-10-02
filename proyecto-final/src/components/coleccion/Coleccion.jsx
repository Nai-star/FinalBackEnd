import React, { useState, useEffect } from "react";
import { getProductos, addToCarrito } from "../../services/servicios";
import { useNavigate } from "react-router-dom";
import "./coleccion.css";

const Coleccion = () => {
  const [productos, setProductos] = useState([]);
  const [modalProducto, setModalProducto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const abrirModal = (producto) => setModalProducto(producto);
  const cerrarModal = () => setModalProducto(null);

  const añadirAlCarrito = async (producto) => {
    try {
      // Enviar producto a db.json
      await addToCarrito({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        img: producto.img,
        cantidad: 1,
      });

      cerrarModal();
      navigate("/carrito");
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("No se pudo añadir al carrito. Revisa la consola.");
    }
  };

  return (
    <div className="coleccion-container">
      <h2>Productos</h2>
      <div className="cards-container1">
        {productos.length === 0 ? (
          <p>No hay productos aún</p>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="card1"
              onClick={() => abrirModal(producto)}
            >
              <img src={producto.img} alt={producto.nombre} className="card-img1" />
              <div className="card-info1">
                <h3>{producto.nombre}</h3>
                <p>${producto.precio}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalProducto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalProducto.nombre}</h2>
            <p>Precio: ${modalProducto.precio}</p>
            <button onClick={() => añadirAlCarrito(modalProducto)}>
              Añadir al carrito
            </button>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coleccion;



