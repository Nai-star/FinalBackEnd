import React, { useState } from 'react';
import './pago.css';
import { postPagos } from '../../services/servicios';
import { useNavigate } from 'react-router-dom';

const cartData = {
  contact: 'jan.spagnuolo@addy.com',
  shippingAddress: 'Via Firenze 23, 50023, Campi Bisenzio LI, Italia',
  shippingMethod: 'Envío estándar - gratis',
  item: {
    name: 'Alba-AIRE',
    price: 9.99,
    quantity: 1,
    image: 'https://via.placeholder.com/80x80/f0f0f0/333?text=Product'
  }
};

const Pago = () => {
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
  const navigate = useNavigate()
  const subtotal = cartData.item.price.toFixed(2);
  const total = subtotal;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePay = async () => {
    if (paymentDetails.cardNumber.length < 16 || paymentDetails.cvv.length < 3) {
      setMessage("Completa los datos de la tarjeta correctamente.");
      navigate ("/confi")
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const pagoData = {
      contacto: cartData.contact,
      direccionEnvio: cartData.shippingAddress,
      metodoEnvio: cartData.shippingMethod,
      producto: cartData.item.name,
      precio: cartData.item.price,
      cantidad: cartData.item.quantity,
      total: total,
      tarjeta: {
        numero: paymentDetails.cardNumber,
        nombre: paymentDetails.nameOnCard,
        expiracion: paymentDetails.expiry,
        cvv: paymentDetails.cvv,
        banco: paymentDetails.bank,
        comentario: paymentDetails.comment,
        opcionCompra: paymentDetails.shippingOption
      },
      cupon: couponCode
    };

    try {
      const data = await postPagos(pagoData); // Se usa la función de servicios
      console.log("Pago guardado correctamente:", data);
      setMessage("Pago procesado correctamente!");
    } catch (error) {
      console.error(error);
      setMessage("Error al procesar el pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">

      <div className="details-form-section">
        <p className="breadcrumbs">
          <a href="/carrito">Carrito</a> &gt; 
          <a href="/detalles">Detalles</a> &gt; 
          <a href="/envio">Envío</a> &gt; 
          <span>Pago</span>
        </p>

        <div className="info-box">
          <div className="info-line">
            <strong>Contacto</strong>
            <p>{cartData.contact}</p>
          </div>
          <div className="info-line">
            <strong>Enviar a</strong>
            <p>{cartData.shippingAddress}</p>
          </div>
          <div className="info-line">
            <strong>Método</strong>
            <p>{cartData.shippingMethod}</p>
          </div>
        </div>

        <h3>Métodos de pago</h3>
        <div className="card-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Numero de Tarjeta" 
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Nombre completo"
              name="nameOnCard"
              value={paymentDetails.nameOnCard}
              onChange={handleChange}
            />
          </div>
          <div className="input-group inline-inputs">
            <div>
              <input 
                type="text" 
                placeholder="Expiración (MM/YY)" 
                name="expiry"
                value={paymentDetails.expiry}
                onChange={handleChange}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="CVV"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <h3>Información adicional</h3>
        <input 
          type="text" 
          placeholder="Banco (opcional)" 
          name="bank"
          value={paymentDetails.bank}
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="Comentario (opcional)"
          name="comment"
          value={paymentDetails.comment}
          onChange={handleChange}
        />

        <h3>Dirección de Envío</h3>
        <label>
          <input
            type="radio"
            name="shippingOption"
            value="same"
            checked={paymentDetails.shippingOption === 'same'}
            onChange={handleChange}
          />
          La misma que la dirección de envío
        </label>
        <label>
          <input
            type="radio"
            name="shippingOption"
            value="different"
            checked={paymentDetails.shippingOption === 'different'}
            onChange={handleChange}
          />
          Dirección diferente para facturación
        </label>

        <div className="footer-actions">
          <button 
            className="pay-button" 
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Pagar ahora'}
          </button>
        </div>
        {message && <p style={{ color: message.includes("correctamente") ? 'green' : 'red' }}>{message}</p>}
      </div>

      <div className="cart-summary-section">
        <div className="cart-item-display">
          <div className="item-image-wrapper">
            <img src={cartData.item.image} alt={cartData.item.name} />
            <div className="quantity-badge">{cartData.item.quantity}</div>
          </div>
          <div className="item-details">
            <p className="product-name">{cartData.item.name}</p>
          </div>
          <div className="item-details price-right">
            <p>${subtotal}</p>
          </div>
        </div>

        <div className="coupon-area">
          <input 
            type="text" 
            placeholder="Cupón de código" 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button>Añadir cupón</button>
        </div>

        <div className="totals-area">
          <div className="total-line">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="total-line">
            <span>Envío</span>
            <span>Envío gratis</span>
          </div>
          <div className="total-line final-total">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;
