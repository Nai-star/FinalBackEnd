import React, { useState } from 'react';
// Si tuvieras servicios para datos, los importarías aquí
// import { getCarrito, postDetalles } from "../../services/servicios";
import "./confirmacion.css"

// Función de utilidad para calcular el total
const calcularSubtotal = (carrito) => {
    return carrito.reduce((acc, item) => 
        acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 1), 0).toFixed(2);
};

// SIMULACIÓN DE DATOS INICIALES (para cargar la información en el carrito y el formulario)
const initialCarrito = [
    { id: 1, producto: "Alba-Aire", precio: 9.99, cantidad: 1, img: "https://via.placeholder.com/60" }
];

const initialFormData = {
    email: 'joe.spagnuola@dubly.com', 
    nombre: 'Joe', segundoNombre: '', 
    direccion: 'Via Firenze 23', nota: '', 
    ciudad: 'Campobello di Licata', codigoPostal: '92023', 
    provincia: 'AG', pais: 'Italia', 
    boletin: false, guardarInfo: false,
};

const getDireccionCompleta = (data) => {
    return [
        data.direccion,
        data.codigoPostal ? `${data.codigoPostal} ${data.ciudad}` : data.ciudad,
        data.provincia,
        data.pais
    ].filter(Boolean).join(', ');
};

function Detalles() {
    // ----------------------------------------------------
    // ESTADO PRINCIPAL
    // ----------------------------------------------------
    const [step, setStep] = useState('detalles'); // 'detalles', 'envio', 'pago', 'confirmacion'
    const [formData, setFormData] = useState(initialFormData);
    const [carrito, setCarrito] = useState(initialCarrito);
    const [paymentData, setPaymentData] = useState({});
    const [selectedPayment, setSelectedPayment] = useState('card');

    // ----------------------------------------------------
    // HANDLERS
    // ----------------------------------------------------
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = (nextStep) => {
        // Lógica de validación básica
        if (step === 'detalles' && (!formData.email || !formData.direccion)) {
            return alert("Por favor, completa los campos de contacto y dirección.");
        }
        if (step === 'pago' && selectedPayment === 'card' && (!paymentData.cardNumber || !paymentData.cardName)) {
            return alert("Por favor, ingresa los datos de la tarjeta.");
        }
        setStep(nextStep);
    };

    // ----------------------------------------------------
    // PROPS CALCULADAS
    // ----------------------------------------------------
    const subtotal = calcularSubtotal(carrito);
    const direccionCompleta = getDireccionCompleta(formData);
    const orderId = 2039; // Simulación

    // ----------------------------------------------------
    // RENDERING DE LAS ETAPAS
    // ----------------------------------------------------
    const renderContent = () => {
        const breadcrumb = (
            <p>
                <a onClick={() => setStep('detalles')}>Carrito</a> &gt; 
                <span style={{ fontWeight: step === 'detalles' ? 'bold' : 'normal' }}> 
                    <a onClick={() => setStep('detalles')} style={{ color: step === 'detalles' ? 'black' : '#56B280', cursor: 'pointer' }}>Detalles</a>
                </span> &gt; 
                <span style={{ fontWeight: step === 'envio' ? 'bold' : 'normal' }}> 
                    <a onClick={() => setStep('envio')} style={{ color: step === 'envio' ? 'black' : '#56B280', cursor: 'pointer' }}>Envío</a>
                </span> &gt; 
                <span style={{ fontWeight: step === 'pago' ? 'bold' : 'normal' }}> 
                    <a onClick={() => setStep('pago')} style={{ color: step === 'pago' ? 'black' : '#56B280', cursor: 'pointer' }}>Pago</a>
                </span>
                {step === 'confirmacion' && <span> &gt; <span style={{ fontWeight: 'bold' }}>Confirmación</span></span>}
            </p>
        );


        // --- ETAPA 1: DETALLES (Formulario) ---
        if (step === 'detalles') {
            return (
                <div className="left-section form-section">
                    {breadcrumb}
                    <h2>Contacto</h2>
                    <p>¿No tienes una cuenta? <a href="/registro">Registrarse</a></p>

                    <input type="email" placeholder="Correo electrónico o número telefónico" name="email" value={formData.email} onChange={handleChange} required />
                    <div className="checkbox">
                        <input type="checkbox" id="boletin" name="boletin" checked={formData.boletin} onChange={handleChange} />
                        <label htmlFor="boletin">Agrégame al boletín de TicoLand para obtener un 10% de descuento.</label>
                    </div>

                    <h2>Dirección de envío</h2>
                    <div className="form-inline">
                        <input type="text" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        <input type="text" placeholder="Segundo nombre" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />
                    </div>
                    <input type="text" placeholder="Dirección exacta" name="direccion" value={formData.direccion} onChange={handleChange} required />
                    <input type="text" placeholder="Nota para el envío (opcional)" name="nota" value={formData.nota} onChange={handleChange} />
                    <div className="form-inline">
                        <input type="text" placeholder="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
                        <input type="text" placeholder="Código postal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
                        <select name="provincia" value={formData.provincia} onChange={handleChange} required>
                            <option value="">Provincia</option>
                            <option value="San José">San José</option>
                            {/* Opciones... */}
                        </select>
                    </div>
                    <p style={{marginTop: '15px', marginBottom: '5px'}}>País/Región</p>
                    <select name="pais" value={formData.pais} onChange={handleChange}>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Italia">Italia</option>
                    </select>

                    <div className="checkbox">
                        <input type="checkbox" id="guardarInfo" name="guardarInfo" checked={formData.guardarInfo} onChange={handleChange} />
                        <label htmlFor="guardarInfo">Guardar esta información para una futura compra rápida</label>
                    </div>

                    <div className="actions">
                        <a href="/carrito">Volver al carrito</a>
                        <button onClick={() => handleContinue('envio')}>Continuar con el envío</button>
                    </div>
                </div>
            );
        }
        
        // --- ETAPA 2: ENVÍO (Resumen y Método) ---
        if (step === 'envio') {
            return (
                <div className="left-section">
                    {breadcrumb}
                    {/* Bloque de Contacto */}
                    <div className="info-block">
                        <div><span>Contacto</span><span onClick={() => setStep('detalles')}>Editar</span></div>
                        <p>{formData.email}</p>
                        <div style={{ marginTop: '10px' }}><span>Enviar a</span><span onClick={() => setStep('detalles')}>Editar</span></div>
                        <p>{direccionCompleta}</p>
                    </div>

                    <h3>Método de pago</h3>
                    
                    {/* Opciones de Envío */}
                    <div className="shipping-method">
                        <div>
                            <input type="radio" id="envioEstandar" name="metodoEnvio" defaultChecked style={{marginRight: '10px'}}/>
                            <label htmlFor="envioEstandar">Envío estándar</label>
                        </div>
                        <span className="price">Gratis</span>
                    </div>

                    <div className="actions">
                        <a onClick={() => setStep('detalles')}>Volver a los detalles</a>
                        <button onClick={() => handleContinue('pago')}>Continuar con el pago</button>
                    </div>
                </div>
            );
        }
        
        // --- ETAPA 3: PAGO (Tarjeta y Facturación) ---
        if (step === 'pago') {
            return (
                <div className="left-section">
                    {breadcrumb}
                    {/* Resumen de Contacto/Envío/Método */}
                    <div className="info-block">
                        <div><span>Contacto</span><span onClick={() => setStep('detalles')}>Editar</span></div>
                        <p>{formData.email}</p>
                        <div style={{ marginTop: '10px' }}><span>Enviar a</span><span onClick={() => setStep('detalles')}>Editar</span></div>
                        <p>{direccionCompleta}</p>
                        <div style={{ marginTop: '10px' }}><span>Método</span><span onClick={() => setStep('envio')}>Editar</span></div>
                        <p>Envío estándar: Gratis</p>
                    </div>

                    {/* Métodos de Pago */}
                    <h3>Métodos de pago</h3>
                    <div className="payment-method">
                        
                        <div className={`payment-block ${selectedPayment === 'card' ? 'selected' : ''}`} onClick={() => setSelectedPayment('card')}>
                            <input type="radio" name="paymentType" checked={selectedPayment === 'card'} readOnly style={{ marginRight: '10px' }} />
                            Tarjeta
                        </div>

                        {selectedPayment === 'card' && (
                            <div className="payment-fields">
                                <div className="input-group">
                                    <div className="input-icon-group">
                                        <input type="text" placeholder="Número de Tarjeta" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentChange} />
                                        <span>[🔒]</span> 
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" placeholder="Nombre completo" name="cardName" value={paymentData.cardName} onChange={handlePaymentChange} />
                                </div>
                                <div className="input-inline">
                                    <div className="input-icon-group">
                                        <input type="text" placeholder="Expiración (MM/YY)" name="expiration" value={paymentData.expiration} onChange={handlePaymentChange} />
                                    </div>
                                    <div className="input-icon-group">
                                        <input type="text" placeholder="CVV" name="cvv" value={paymentData.cvv} onChange={handlePaymentChange} />
                                        <span>[ⓘ]</span> 
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className={`payment-block ${selectedPayment === 'paypal' ? 'selected' : ''}`} onClick={() => setSelectedPayment('paypal')}>
                            <input type="radio" name="paymentType" checked={selectedPayment === 'paypal'} readOnly style={{ marginRight: '10px' }} />
                            PayPal
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <h3>Información adicional</h3>
                    <div className="additional-info">
                        <div className="input-group"><input type="text" placeholder="Banco (opcional)" name="bank" value={paymentData.bank} onChange={handlePaymentChange} /></div>
                        <div className="input-group"><input type="text" placeholder="Comentario (opcional)" name="comment" value={paymentData.comment} onChange={handlePaymentChange} /></div>
                    </div>

                    {/* Dirección de Envío */}
                    <h3>Dirección de Envío</h3>
                    <div className="shipping-address-options">
                        <label className="shipping-radio-option">
                            <input type="radio" name="billingAddress" value="same" checked={paymentData.billingAddress === 'same'} onChange={handlePaymentChange} style={{marginRight: '10px'}}/>
                            La misma que la dirección de envío
                        </label>
                        <label className="shipping-radio-option">
                            <input type="radio" name="billingAddress" value="different" checked={paymentData.billingAddress === 'different'} onChange={handlePaymentChange} style={{marginRight: '10px'}}/>
                            Utilizar una dirección diferente para la facturación
                        </label>
                    </div>

                    <div className="actions">
                        <a onClick={() => setStep('envio')}>Volver al envío</a>
                        <button onClick={() => handleContinue('confirmacion')}>Pagar ahora</button>
                    </div>
                </div>
            );
        }

        // --- ETAPA 4: CONFIRMACIÓN ---
        if (step === 'confirmacion') {
            return (
                <div className="left-section confirmation-content">
                    {/* La barra de navegación se muestra diferente en la imagen de confirmación */}
                    <p style={{ alignSelf: 'flex-start', marginBottom: '50px', fontSize: '14px' }}>
                        <a href="/carrito">Carrito</a> &gt; Detalles &gt; Envío &gt; Pago
                    </p>

                    <div className="checkmark-circle">✓</div>

                    <h2>Pago confirmado</h2>
                    <small>ORDEN #{orderId}</small>

                    <p>
                        Gracias, **{formData.nombre}**, por comprar en TicoLand. La naturaleza te lo agradece. Ahora que tu pedido está confirmado, estará listo para enviarse en 2 días. Revisa tu bandeja de entrada para ver las actualizaciones de tu pedido.
                    </p>

                    <div className="confirmation-actions" style={{width: '100%', maxWidth: '300px'}}>
                        <button onClick={() => alert('Volver al inicio')}>Volver al envío</button>
                        <a onClick={() => window.print()} className="print-receipt-link">Imprimir recibo</a>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="container">
            {/* Contenido de la etapa actual (Izquierda) */}
            {renderContent()}

            {/* DERECHA: RESUMEN DE COMPRA (Siempre visible) */}
            <div className="cart-summary">
                {carrito.map((item, index) => (
                    <div key={item.id || index} className="cart-item">
                        <div className="quantity-badge">{item.cantidad}</div>
                        <img src={item.img || "https://via.placeholder.com/60"} alt={item.producto} />
                        <div>
                            <p>{item.producto}</p>
                            <p className="price">$ {(Number(item.precio) * Number(item.cantidad)).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                
                {step !== 'confirmacion' && (
                    <div className="coupon">
                        <input type="text" placeholder="Código de cupón" />
                        <button>Añadir código</button>
                    </div>
                )}

                <div className="totals">
                    <div><span>Subtotal</span><span>$ {subtotal}</span></div>
                    <div><span>Envío</span><span>Gratis</span></div>
                    
                    {/* La línea de total varía entre 'Total' y 'Precio' en la confirmación */}
                    <div className="total-line" style={step === 'confirmacion' ? {borderTop: '1px solid #e6e6e6', paddingTop: '15px'} : {}}>
                        <span>{step === 'confirmacion' ? 'Precio' : 'Total'}</span>
                        <span>$ {subtotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detalles;