import { useState } from 'react';
import "./modalAdmin.css"

function ModalAdmin({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Atención</h2>
        <p>Por favor, ingresa la contraseña que te proporcionaron.</p>
        <p><strong>La contraseña es: 28228haK</strong></p>
        <button onClick={onClose} className="btn-cerrar">Cerrar</button>
      </div>
    </div>
  );
}

export default ModalAdmin;
