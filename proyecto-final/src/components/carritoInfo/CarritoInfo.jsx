import { useEffect, useState } from "react";
import "./carritoinfo.css";
import { useNavigate } from "react-router-dom";
import { getCarrito } from "../../services/servicios"; 

function CarritoInfo() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    getCarrito()
      .then((data) => setCarrito(data))
      .catch((error) => console.error("Error al obtener carrito:", error));
  }, []);

  return (
    <div className="cart-conteiner">
      <div className="cart-header-top">
        <h1>Productos de tu carrito</h1>
        <p onClick={() => navigate("/") } className="back-link" >
          Volver a comprar
        </p>
      </div>
      <div>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          carrito.map((item) => (
            <div key={item.id} className="producto-carrito">
              {item.img && (
                <img src={item.img} alt={item.producto} />
              )}
              <p><strong>Producto:</strong> {item.producto}</p>
              <p><strong>Cantidad:</strong> {item.cantidad}</p>
              <button onClick={()=>navigate("/detalles")}>Comprar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CarritoInfo;


