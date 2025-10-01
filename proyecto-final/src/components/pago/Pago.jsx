import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCarrito, postDetalles } from "../../services/servicios";
import "./pago.css"

// Función de utilidad para calcular el total
const calcularSubtotal = (carrito) => {
  return carrito
    .reduce(
      (acc, item) =>
        acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 1),
      0
    )
    .toFixed(2);
};

// Simulación para guardar/obtener datos entre componentes
const storage = {};

function Pago() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [formData, setFormData] = useState({
    email: '', nombre: '', segundoNombre: '', direccion: '', nota: '', ciudad: '',
    codigoPostal: '', provincia: '', pais: 'Costa Rica', boletin: false, guardarInfo: false,
  });
  const [cupon, setCupon] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  useEffect(() => {
    // Carga del carrito
    getCarrito().then(data => { setCarrito(data); setLoading(false); });
    if (storage.formData) setFormData(storage.formData);
  }, []);

  const handleSubmit = async () => {
    if (!formData.email || !formData.nombre || !formData.direccion)
      return alert("Completa los campos obligatorios.");
      navigate ("/confi")
    await postDetalles(formData);

    // Guardar datos para el próximo componente
    storage.formData = formData;
    storage.carrito = carrito;

    navigate('/envio');
  };

  if (loading)
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        Cargando...
      </div>
    );

  const subtotal = calcularSubtotal(carrito);

  return (
    <div className="container">
      {/* IZQUIERDA: FORMULARIO */}
      <div className="left-section form-section">
        <p>
          <a href="/carrito">Carrito</a> &gt; <b>Detalles</b> &gt; <span>Envío</span> &gt; <span>Pago</span>
        </p>

        <h2>Contacto</h2>
        <p>¿No tienes una cuenta? <a href="/registro">Registrarse</a></p>

        <input
          type="email"
          placeholder="Correo electrónico o número telefónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="checkbox">
          <input
            type="checkbox"
            id="boletin"
            name="boletin"
            checked={formData.boletin}
            onChange={handleChange}
          />
          <label htmlFor="boletin">
            Agrégame al boletín de TicoLand para obtener un 10% de descuento.
          </label>
        </div>

        <h2>Dirección de envío</h2>

        <div className="form-inline">
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Segundo nombre"
            name="segundoNombre"
            value={formData.segundoNombre}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          placeholder="Dirección exacta"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Nota para el envío (opcional)"
          name="nota"
          value={formData.nota}
          onChange={handleChange}
        />

        <div className="form-inline">
          <input
            type="text"
            placeholder="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Código postal"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
          />
          <select
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
          >
            <option value="">Provincia</option>
            <option value="San José">San José</option>
            <option value="Alajuela">Alajuela</option>
            <option value="Cartago">Cartago</option>
            <option value="Heredia">Heredia</option>
            <option value="Guanacaste">Guanacaste</option>
            <option value="Puntarenas">Puntarenas</option>
            <option value="Limón">Limón</option>
          </select>
        </div>

        <p style={{ marginTop: '15px', marginBottom: '5px' }}>País/Región</p>
        <select name="pais" value={formData.pais} onChange={handleChange}>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Italia">Italia</option>
        </select>

        <div className="checkbox">
          <input
            type="checkbox"
            id="guardarInfo"
            name="guardarInfo"
            checked={formData.guardarInfo}
            onChange={handleChange}
          />
          <label htmlFor="guardarInfo">
            Guardar esta información para una futura compra rápida
          </label>
        </div>

        <div className="actions">
          <a href="/carrito">Volver al carrito</a>
          <button onClick={handleSubmit}>Continuar con el envío</button>
        </div>
      </div>

      {/* DERECHA: RESUMEN DE COMPRA */}
      <div className="cart-summary">
        {carrito.map((item, index) => (
          <div key={item.id || index} className="cart-item">
            <div className="image-wrapper">
              <img
                src={item.img || "https://via.placeholder.com/60"}
                alt={item.producto}
              />
              <div className="quantity-badge">{Number(item.cantidad) || 0}</div>
            </div>
            <div>
              <p>{item.producto}</p>
              <p className="price">
                $ {(Number(item.precio) * Number(item.cantidad)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <div className="coupon">
          <input
            type="text"
            placeholder="Código de cupón"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
          />
          <button>Añadir código</button>
        </div>

        <div className="totals">
          <div><span>Subtotal</span><span>$ {subtotal}</span></div>
          <div><span>Envío</span><span>Gratis</span></div>
          <div className="total"><span>Total</span><span>$ {subtotal}</span></div>
        </div>
      </div>
    </div>
  );
}

export default Pago;
