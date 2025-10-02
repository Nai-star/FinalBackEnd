import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../services/servicios";
import "./confirmacion.css";

function Confirmacion() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usuarios = await getUsuarios();
        if (usuarios && usuarios.length > 0) {
          const usuario = usuarios[0]; // usamos el primer usuario
          setUserData(usuario);
          setCarrito(usuario.carrito || []);
        }
      } catch (error) {
        console.error("Error al traer datos de usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) return <p>Cargando información del usuario...</p>;

  // Calcular subtotal
  const subtotal = carrito.reduce((acc, item) => {
    const price = Number(item.precio ?? 0);
    const quantity = Number(item.cantidad ?? 1);
    return acc + price * quantity;
  }, 0);

  return (
    <div className="confirmacion-container">
      <div className="confirmacion-left">
        <h2 className="breadcrumb">
          Carrito &gt; Detalles &gt; Envío &gt; <span>Pago</span>
        </h2>

        <div className="confirmacion-card">
          <div className="check-icon">✓</div>
          <h1>Pago confirmado</h1>
          <p className="order">ORDEN #2039</p>
          <p className="mensaje">
            Gracias por comprar en <b>TicoLand</b>.  
            Tu pedido está confirmado y estará listo para enviarse en 2 días.  
            Revisa tu correo para ver las actualizaciones de tu pedido.
          </p>

          <button
            className="btn-principal"
            onClick={() => navigate("/envio")}
          >
            Volver al envío
          </button>
        </div>
      </div>

      <div className="confirmacion-right">
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          carrito.map((item, index) => {
            const nombre = item.nombre ?? "Producto";
            const img = item.img ?? "https://via.placeholder.com/120";
            const price = Number(item.precio ?? 0);
            const quantity = Number(item.cantidad ?? 1);
            const total = price * quantity;

            return (
              <div key={index} className="producto">
                <img src={img} alt={nombre} />
                <div>
                  <p className="nombre">{nombre}</p>
                  <p className="precio">
                    ${price} x {quantity} = ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <div className="resumen">
          <div className="fila">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="fila">
            <span>Envío</span>
            <span className="gratis">Envío gratis</span>
          </div>
          <div className="fila total">
            <span>Total</span>
            <span className="precio-total">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmacion;




