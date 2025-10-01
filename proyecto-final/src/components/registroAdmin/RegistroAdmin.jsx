import { useState, useEffect } from 'react';
import "./registroAdmin.css";
import { getAdmin, postAdmin } from '../../services/servicios';
import fondoLogin from "../../assets/fondoLogin.png";

function RegistroAdmin() {
  const [admin, setAdmin] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");

  const [contraseña, setContraseña] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await getAdmin();
      setAdmin(res);
    };
    fetchUsuarios();
  }, []);

  const mostrarMensaje = (setMensaje, texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);
  };

  const handleRegistro = async () => {
    try {
      if (!nombre || !correo || !numero  || !contraseña) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Complete todos los campos");
        return;
      }

      const nombreExiste = admin.some((u) => u.nombre === nombre);
      const correoExiste = admin.some((u) => u.correo === correo);
      const numeroExiste = admin.some((u) => u.numero === numero);
   

      if (nombreExiste) return mostrarMensaje(setMensajeRegistro, "⚠️ Nombre ya registrado");
      if (correoExiste) return mostrarMensaje(setMensajeRegistro, "⚠️ Correo ya registrado");
      if (numeroExiste) return mostrarMensaje(setMensajeRegistro, "⚠️ Número ya registrado");
      

      // Generar token simple
      const token = btoa(`${correo}:${Date.now()}`); // Base64 simple

      const  nuevoAdmin = {
        id: Date.now(),
        nombre,
        correo,
        numero,
    
    
        contraseña
      };

     
      await postAdmin(nuevoAdmin);
      setAdmin([...admin, admin]);
      mostrarMensaje(setMensajeRegistro, "✅ Registro exitoso");

      // Guardar token en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(nuevoAdmin));

      // Limpiar formulario
      setNombre("");
      setCorreo("");
      setNumero("");
   

      setContraseña("");

    } catch (error) {
      console.error(error);
      mostrarMensaje(setMensajeRegistro, "❌ Error al registrar");
    }
  };

  return (
    <div className="login-page">
      <section className="left">
        <header className="brand">
          <div className="logo"></div>
        </header>

        <div className="form-wrap registro-form">
          <h1>Registro</h1>
          <p className="sub">Crea tu cuenta</p>

          <label>
            <span className="label-text">Nombre</span>
            <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Introduce tu Usuario" />
          </label>

          <label>
            <span className="label-text">Correo</span>
            <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="ejemplo@email.com" />
          </label>

          <p className="label-text">Número</p>
          <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder='Número de telefono' />

          <label>
            <span className="label-text">Contraseña</span>
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Introduce tu Contraseña" />
          </label>

          <button className="btn primary" onClick={handleRegistro}>
            Registrar
          </button>

          <p className="small">{mensajeRegistro}</p>

          <p className="small">
            ¿Ya tienes cuenta? <a className="link" href="/login">Inicia sesión</a>
          </p>
        </div>
      </section>

      <section className="right">
        <img src={fondoLogin} alt="fondoLoginTicoLand" />
      </section>
    </div>
  );
}

export default RegistroAdmin;
