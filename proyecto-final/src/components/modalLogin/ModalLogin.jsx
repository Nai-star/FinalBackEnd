import { useNavigate } from 'react-router-dom';
import './modalL.css';

function ModalLogin({ visible, onClose }) {
  const navigate = useNavigate();

  if (!visible) return null;

  const irA = (tipo) => {
    if (tipo === "emprendedor") {
      navigate("/loginemprendedor");
    } else if (tipo === "usuario") {
      navigate("/registro");
    } else if (tipo === "admin") {
      navigate("/registroAdmin");
    }
    onClose(); // Cierra el modal siempre
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¿Cómo deseas iniciar sesión?</h2>
        <button onClick={() => irA("emprendedor")}>Como Emprendedor</button>
        <button onClick={() => irA("/")}>Como Usuario</button>
        <button onClick={() => irA("admin")}>Como Administrador</button>
        <button onClick={onClose} className="cancelar">Cancelar</button>
      </div>
    </div>
  );
}

export default ModalLogin;


  
