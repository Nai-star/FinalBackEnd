import React, { useState, useEffect } from 'react';
import "./envio.css";
import { getCarrito, getUsuarios } from "../../services/servicios"; 
import { useNavigate } from 'react-router-dom';

function Envio() {
    const [formData, setFormData] = useState({
        email: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        provincia: "",
        pais: ""
    });

    const [carrito, setCarrito] = useState([]);
    const [metodoEnvio, setMetodoEnvio] = useState('estandar');
    const [editContacto, setEditContacto] = useState(false);
    const [editDireccion, setEditDireccion] = useState(false);
   const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            const usuario = await getUsuarios(); // datos predeterminados
            setFormData({
                email: usuario.email,
                direccion: usuario.direccion,
                ciudad: usuario.ciudad,
                codigoPostal: usuario.codigoPostal,
                provincia: usuario.provincia,
                pais: usuario.pais
            });

            const dataCarrito = await getCarrito();
            setCarrito(dataCarrito);
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = carrito.reduce((acc, item) =>
        acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 1), 0
    ).toFixed(2);

    const total = (Number(subtotal) + (metodoEnvio === 'express' ? 10 : 0)).toFixed(2);

    return (
        <div className="container">
            {/* IZQUIERDA: Formulario de envío */}
            <div className="shipping-section">
                <h2>Envío</h2>

                {/* Contacto */}
                <div className="info-block">
                    <div>
                        <span>Contacto</span>
                        <span onClick={() => setEditContacto(!editContacto)}>
                            {editContacto ? "Guardar" : "Editar"}
                        </span>
                    </div>
                    {editContacto ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Correo electrónico"
                        />
                    ) : (
                        <p>{formData.email}</p>
                    )}
                </div>

                {/* Dirección */}
                <div className="info-block">
                    <div>
                        <span>Dirección</span>
                        <span onClick={() => setEditDireccion(!editDireccion)}>
                            {editDireccion ? "Guardar" : "Editar"}
                        </span>
                    </div>
                    {editDireccion ? (
                        <>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                placeholder="Dirección"
                            />
                            <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleInputChange}
                                placeholder="Ciudad"
                            />
                            <input
                                type="text"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleInputChange}
                                placeholder="Código Postal"
                            />
                            <input
                                type="text"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleInputChange}
                                placeholder="Provincia"
                            />
                            <input
                                type="text"
                                name="pais"
                                value={formData.pais}
                                onChange={handleInputChange}
                                placeholder="País"
                            />
                        </>
                    ) : (
                        <p>
                            {[formData.direccion, formData.codigoPostal, formData.ciudad, formData.provincia, formData.pais]
                                .filter(Boolean)
                                .join(', ')}
                        </p>
                    )}
                </div>

                {/* Método de envío */}
                <h3>Método de envío</h3>
                <div className="shipping-method">
                    <div>
                        <input
                            type="radio"
                            id="envioEstandar"
                            name="metodoEnvio"
                            checked={metodoEnvio === 'estandar'}
                            onChange={() => setMetodoEnvio('estandar')}
                        />
                        <label htmlFor="envioEstandar">Envío estándar</label>
                    </div>
                    <span className="price">Gratis</span>
                </div>
                <div className="shipping-method">
                    <div>
                        <input
                            type="radio"
                            id="envioExpress"
                            name="metodoEnvio"
                            checked={metodoEnvio === 'express'}
                            onChange={() => setMetodoEnvio('express')}
                        />
                        <label htmlFor="envioExpress">Envío express</label>
                    </div>
                    <span className="price">$10.00</span>
                </div>

                {/* Botones */}
                <div className="actions">
                    <button>Volver a detalles</button>
                    <button onClick={()=>navigate("/pago")}>Continuar con el pago</button>
                </div>
            </div>

            {/* DERECHA: Resumen del carrito */}
            <div className="cart-summary">
                {carrito.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="quantity-badge">{item.cantidad}</div>
                        <img src={item.img} alt={item.producto} />
                        <div>
                            <p>{item.producto}</p>
                            <p className="price">$ {item.precio}</p>
                        </div>
                    </div>
                ))}

                <div className="coupon">
                    <input type="text" placeholder="Código del cupón" />
                    <button>Añadir cupón</button>
                </div>

                <div className="totals">
                    <div><span>Subtotal</span><span>$ {subtotal}</span></div>
                    <div><span>Envío</span><span>{metodoEnvio === 'express' ? "$10.00" : "Gratis"}</span></div>
                    <div><span>Total</span><span>$ {total}</span></div>
                </div>
            </div>
        </div>
    );
}

export default Envio;



