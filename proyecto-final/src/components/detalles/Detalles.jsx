import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCarrito, postDetalles } from "../../services/servicios";
import "./detales.css";

function Detalles() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    segundoNombre: '',
    direccion: '',
    nota: '',
    ciudad: '',
    codigoPostal: '',
    provincia: '',
    pais: 'Costa Rica',
    boletin: false,
    guardarInfo: false,
  });

  const [cupon, setCupon] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCuponChange = (e) => {
    setCupon(e.target.value);
  };

  useEffect(() => {
    getCarrito()
      .then(data => setCarrito(data))
      .catch(error => console.error("Error cargando carrito:", error));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await postDetalles({ ...formData, carrito });
      console.log('Detalles guardados:', response);
      navigate('/envio');
    } catch (error) {
      console.error("Error al guardar los detalles:", error);
      alert("Hubo un problema al enviar los detalles. Intenta nuevamente.");
    }
  };

  return (
    <div className="detalles-container">
      <h1 className="titulo">TICOLAND</h1>
      <p className="breadcrumb">
        <a href="/carrito">Carrito</a> &gt; <span>Detalles</span> &gt; <span>Envío</span> &gt; <span>Pago</span>
      </p>

      <div className="detalles-layout">
        {/* Formulario */}
        <section className="formulario">
          <h2>Contacto</h2>
          <p>¿No tienes una cuenta? <a href="/registro">Registrarse</a></p>
          <input type="email" placeholder="Correo electrónico o número telefónico" name="email" value={formData.email} onChange={handleChange} />

          <div className="checkbox">
            <input type="checkbox" id="boletin" name="boletin" checked={formData.boletin} onChange={handleChange} />
            <label htmlFor="boletin"> Apúntame al boletín de TicoLand para obtener un 10% de descuento.</label>
          </div>

          <h2>Dirección de envío</h2>
          <div className="row">
            <input type="text" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            <input type="text" placeholder="Segundo nombre" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />
          </div>
          <input type="text" placeholder="Dirección exacta" name="direccion" value={formData.direccion} onChange={handleChange} />
          <input type="text" placeholder="Nota para el envío (opcional)" name="nota" value={formData.nota} onChange={handleChange} />

          <div className="row">
            <input type="text" placeholder="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
            <input type="text" placeholder="Código postal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
            <select name="provincia" value={formData.provincia} onChange={handleChange}>
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

          <p>País/Región</p>
          <select name="pais" value={formData.pais} onChange={handleChange}>
            <option value="Italia">Italia</option>
            <option value="Costa Rica">Costa Rica</option>
          </select>

          <div className="checkbox">
            <input type="checkbox" id="guardarInfo" name="guardarInfo" checked={formData.guardarInfo} onChange={handleChange} />
            <label htmlFor="guardarInfo"> Guardar esta información para una futura compra rápida</label>
          </div>

          <div className="acciones">
            <a href="/carrito" className="link">Volver al carrito</a>
            <button onClick={handleSubmit} className="btn-principal">Continuar con el envío</button>
          </div>
        </section>

        {/* Resumen carrito */}
        <aside className="resumen">
          {carrito.map((item, index) => (
            <div key={index} className="resumen-item">
              <img src={item.img} alt={item.producto} />
              <div>
                <p>{item.producto}</p>
                <p>Cantidad: {item.cantidad}</p>
              </div>
              <p>$ {item.precio}</p>
            </div>
          ))}

          <div className="cupon">
            <input type="text" placeholder="Código de cupón" value={cupon} onChange={handleCuponChange} />
            <button>Añadir código</button>
          </div>

          <div className="totales">
            <div><span>Subtotal</span><span>$ {carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</span></div>
            <div><span>Envío</span><span>Gratis</span></div>
            <div className="total"><span>Total</span><span>$ {carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Detalles;

