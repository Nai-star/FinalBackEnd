import LogoBlanco from '../../assets/LogoBlanco.png';
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <img src={LogoBlanco} alt="Ticoland Logo" className= "Logo"/>
            <p>Ticoland ofrece los mejores productos.</p>
          </div>

          <div className="footer-column">
            <h4>Descubrir</h4>
            <ul>
              <li><a href="#">Nueva estación</a></li>
              <li><a href="#">Más buscado</a></li>
              <li><a href="#">Más vendido</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sobre de</h4>
            <ul>
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Envío</a></li>
              <li><a href="#">Affiliate</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Información</h4>
            <ul>
              <li><a href="#">Contáctanos</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>©TicoLand con todos los derechos reservados.</p>
          <span>
           Diseñado con <i>❤️</i> por nai
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

