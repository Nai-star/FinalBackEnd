import React, { useEffect, useState, useRef } from 'react';
import './pago.css';
import { postPagos, getUsuarios } from '../../services/servicios';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const Pago = () => {
  const [userData, setUserData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
    bank: '',
    comment: '',
    shippingOption: 'same'
  });
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const sigCanvas = useRef({});

  // Traer datos del usuario desde db.json
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usuarios = await getUsuarios();
        if (usuarios && usuarios.length > 0) setUserData(usuarios[0]);
      } catch (error) {
        console.error("Error al traer datos de usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const clearSignature = () => sigCanvas.current.clear();

  const handlePay = async () => {
    if (paymentDetails.cardNumber.length < 16 || paymentDetails.cvv.length < 3) {
      setMessage("Completa los datos de la tarjeta correctamente.");
      return;
    }
    if (sigCanvas.current.isEmpty()) {
      setMessage("Por favor firma antes de continuar.");
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const signatureBase64 = sigCanvas.current.toDataURL('image/png');

    const pagoData = {
      contacto: userData?.email,
      direccionEnvio: userData?.direccion,
      productos: userData?.carrito || [],
      total: userData?.carrito?.reduce((acc, item) => acc + item.price * item.quantity, 0),
      tarjeta: paymentDetails,
      cupon: couponCode,
      firma: signatureBase64
    };

    try {
      await postPagos(pagoData);
      navigate("/confi");
    } catch (error) {
      console.error(error);
      setMessage("Error al procesar el pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!userData) return <p>Cargando información del usuario...</p>;

  return (
    <div className="checkout-page">
      {/* IZQUIERDA: Datos y tarjeta */}
      <div className="details-form-section">
        <h2>Información de contacto</h2>
        <div className="info-box">
          <p><strong>Correo:</strong> {userData.email}</p>
          <p><strong>Dirección:</strong> {userData.direccion}</p>
        </div>

        <h2>Métodos de pago</h2>
        <input type="text" placeholder="Número de tarjeta" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} />
        <input type="text" placeholder="Nombre en la tarjeta" name="nameOnCard" value={paymentDetails.nameOnCard} onChange={handleChange} />
        <div className="inline-inputs">
          <input type="text" placeholder="Expiración (MM/YY)" name="expiry" value={paymentDetails.expiry} onChange={handleChange} />
          <input type="text" placeholder="CVV" name="cvv" value={paymentDetails.cvv} onChange={handleChange} />
        </div>

        <h2>Firma digital</h2>
        <SignatureCanvas penColor="black" canvasProps={{ width: 300, height: 150, className: 'sigCanvas' }} ref={sigCanvas} />
        <button type="button" onClick={clearSignature}>Borrar firma</button>

        <button className="pay-button" onClick={handlePay} disabled={isProcessing}>
          {isProcessing ? 'Procesando...' : 'Pagar ahora'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      {/* DERECHA: Carrito / resumen */}
      <div className="cart-summary-section">
        <h2>Resumen del carrito</h2>
        {userData.carrito?.map(item => (
          <div key={item.id} className="cart-item-display">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <p>{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
            <div className="item-price">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="totals-area">
          <div className="total-line">
            <span>Subtotal</span>
            <span>${userData.carrito?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="total-line"><span>Envío</span><span>Gratis</span></div>
          <div className="total-line final-total">
            <span>Total</span>
            <span>${userData.carrito?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;

