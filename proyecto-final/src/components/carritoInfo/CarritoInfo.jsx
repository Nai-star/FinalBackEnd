import { useEffect, useState } from "react";
import "./carritoinfo.css";
import { useNavigate } from "react-router-dom";
import { getCarrito, deleteCarrito } from "../../services/servicios";

function CarritoInfo() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const data = await getCarrito();
      setCarrito(data);
    } catch (error) {
      console.error("Error al obtener carrito:", error);
    }
  };

  const parsePrice = (p) => {
    if (typeof p === "number") return p;
    if (!p) return 0;
    const limpiar = String(p).replace(/[^0-9.,-]/g, "").replace(",", ".");
    const num = parseFloat(limpiar);
    return isNaN(num) ? 0 : num;
  };

  // ---- Función para eliminar producto ----
  const handleRemove = async (id) => {
    try {
      await deleteCarrito(id); // 🔹 Borra del db.json
      setCarrito((prev) => prev.filter((item) => item.id !== id)); // Actualiza estado local
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  const handleIncrease = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: (Number(item.cantidad) || 1) + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: (Number(item.cantidad) || 1) - 1 }
          : item
      )
    );
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
          <div className="cart-table-header">
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
                  <div className="product-details">
                    <p>{item.producto}</p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="item-price">
                  <span>${price.toFixed(2)}</span>
                </div>

                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <input type="text" readOnly value={qty} />
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>

                <div className="item-total">
                  <span>${totalItem.toFixed(2)}</span>
                </div>
              </div>
            );
          })}

          <div className="cart-summary-wrapper">
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
        </div>
      )}
    </div>
  );
}

export default CarritoInfo;

