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

  // ---- helper robusto para convertir precios que pueden venir como string con $ u otros formatos
  const parsePrice = (p) => {
    if (typeof p === "number") return p;
    if (!p) return 0;
    // eliminar cualquier carácter que no sea dígito, punto, coma o signo negativo
    const limpiar = String(p).replace(/[^0-9.,-]/g, "").replace(",", ".");
    const num = parseFloat(limpiar);
    return isNaN(num) ? 0 : num;
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precio = parsePrice(item.precio);
      const cantidad = Number(item.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header-top">
        <h1>Productos de tu carrito</h1>
        <p onClick={() => navigate("/")} className="back-link">
          Volver a comprar
        </p>
      </div>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-table">
          <div className="cart-titles">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>

          {carrito.map((item) => {
            const price = parsePrice(item.precio);
            const qty = Number(item.cantidad) || 0;
            const totalItem = price * qty;

            return (
              <div key={item.id} className="cart-item">
                <div className="cart-product">
                  {item.img && <img src={item.img} alt={item.producto} />}
                  <div>
                    <p>{item.producto}</p>
                    <button className="remove-btn">Eliminar</button>
                  </div>
                </div>

                <span>${price.toFixed(2)}</span>

                <div className="quantity-controls">
                  <button>-</button>
                  <span>{qty}</span>
                  <button>+</button>
                </div>

                <span>${totalItem.toFixed(2)}</span>
              </div>
            );
          })}

          <div className="cart-summary">
            <span>Sub-total</span>
            <span>${calcularTotal().toFixed(2)}</span>
          </div>

          <p className="cart-note">
            Los impuestos y el costo de envío se calcularán más adelante.
          </p>

          <button className="buy-btn" onClick={() => navigate("/detalles")}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
}

export default CarritoInfo;

