import { useNavigate } from 'react-router-dom';
import './modalL.css';

function ModalLogin({ visible, onClose }) {
  const navigate = useNavigate();

  if (!visible) return null;

  const irA = (tipo) => {
    if (tipo === "emprendedor") {
      navigate("/login/emprendedor");
    } else if (tipo === "usuario") {
      navigate("/login/usuario");
    }
    onClose(); // Cierra el modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¿Cómo deseas iniciar sesión?</h2>
        <button onClick={() => navigate ("/emprendedor")}>Como Emprendedor</button>
        <button onClick={() => navigate("/catalogo")}>Como Usuario</button>
        <button onClick={onClose} className="cancelar">Cancelar</button>
      </div>
    </div>
  );
}

export default ModalLogin;

