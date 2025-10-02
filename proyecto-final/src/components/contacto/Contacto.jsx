// src/pages/Contacto.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Logoblanco from "../../assets/Logoblanco.png";
import "./contacto.css";

const Contacto = () => {
  const navigate = useNavigate();

  return (
    <div className="container-contacto">
      {/* Navbar */}
      <nav className="navbar">
        <img src={Logoblanco} alt="Logo" className="logo" />
        <div className="menu">
          <button onClick={() => navigate("/")}>Inicio</button>
          <button onClick={() => navigate("/contacto")}>Contacto</button>
        </div>
      </nav>

      {/* Información de contacto */}
      <section className="info-section">
        <h2>Contáctanos</h2>
        <p>
          Como tienda virtual, ponemos a tu disposición los siguientes medios
          para comunicarte con nosotros:
        </p>
        <ul>
          <li><strong>Teléfono:</strong> +506 8888-8888</li>
          <li><strong>Email:</strong> contacto@ticoland.com</li>
          <li><strong>Atención:</strong> Lunes a Viernes de 9:00 a 18:00</li>
        </ul>
      </section>

      {/* Redes sociales */}
      <section className="redes-section">
        <h3>Síguenos en redes sociales</h3>
        <div className="redes">
          <a href="#">Facebook</a> | <a href="#">Instagram</a> |{" "}
          <a href="#">WhatsApp</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TicoLand | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Contacto;
