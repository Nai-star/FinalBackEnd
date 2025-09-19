import fondo from '../../assets/fondo.png';
import "./entradaP.css";

function EntradaPrincipal() {
  return (
    <div className="entrada-principal">
      {/* Fondo como imagen normal */}
      <img src={fondo} alt="fondoTicoLand" className="fondo" />

      {/* Cuadro encima de la imagen */}
      <div className="cuadro">
        <h1>Contenido del cuadro</h1>
      </div>
    </div>
  );
}

export default EntradaPrincipal;
