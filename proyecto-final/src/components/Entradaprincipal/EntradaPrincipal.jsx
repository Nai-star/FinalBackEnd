import fondo from '../../assets/fondo.png';
import './entradaP.css';
import{useNavigate} from "react-router-dom"

function SeccionPrincipal() {
  const navigate = useNavigate ()
  return (
    <div className="fondo-contenedor">
      <img src={fondo} alt="fondoTicoLand" className="fondo" />
      <div className="cuadro">
        <div className="planta">🍀</div>
        <h1>Los mejores productos</h1>
          <p>TicoLand busca darte una experiencia única.</p>
       <button onClick={()=>navigate()} >Descubre la colección</button>
      
      </div>
    </div>
  );
}

export default SeccionPrincipal;

