import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductos, addToCarrito } from "../../services/servicios";
import "./especificacionesp.css";

export default function EspecificacionProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductos(id).then(setProducto).catch(console.error);
  }, [id]);

  if (!producto) return <p>Cargando...</p>;


  return (
    <div className="producto-detalle">
      <div className="producto-imagen">
        <img src={producto.img} alt={producto.nombre} />
        <p className="envio">🚚 ENVÍO GRATIS</p>
      </div>

      <div className="producto-info">
        <h2>{producto.nombre}</h2>
        <p className="precio">₡{producto.precio}</p>

        <div className="cantidad">
          <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
          <span>{cantidad}</span>
          <button onClick={() => setCantidad(c => c + 1)}>+</button>
        </div>

        <button className="btn-add" onClick={handleAdd}>
          🛒 Añadir al carrito
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <p className="descripcion">{producto.descripcion}</p>

        <ul className="especificaciones">
          <li><strong>Cera:</strong> {producto.cera || "Cera de soja 100% natural"}</li>
          <li><strong>Fragancia:</strong> {producto.fragancia || "Aceites esenciales naturales"}</li>
          <li><strong>Durabilidad:</strong> {producto.duracion || "70-75 horas"}</li>
          <li><strong>Dimensión:</strong> {producto.dimension || "10cm x 6cm"}</li>
          <li><strong>Peso:</strong> {producto.peso || "400g"}</li>
        </ul>
      </div>
    </div>
  );
}



