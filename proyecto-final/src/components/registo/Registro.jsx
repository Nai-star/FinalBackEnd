import React, { useState, useEffect } from "react";
import { postUsuarios, getUsuarios } from "../../services/servicios";
import "./registro.css";
import fondoLogin from "../../assets/fondoLogin.png";
import ModalLogin from "../modalLogin/ModalLogin";

function Registro() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");
  const [mostrarModal,setMostrarModal] = useState(false)

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await getUsuarios();
      setUsuarios(res);
    };
    fetchUsuarios();
  
}, []);

  useEffect(() => {
  setMostrarModal(true);
}, []);

  const mostrarMensaje = (setMensaje, texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);
  };

  const handleRegistro = async () => {
    try {
      if (!nombre || !correo || !contraseña) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Complete todos los campos");
        return;
      }

      const nombreExiste = usuarios.some((u) => u.nombre === nombre);
      const correoExiste = usuarios.some((u) => u.correo === correo);

      if (nombreExiste) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Nombre ya registrado");
        return;
      }
      if (correoExiste) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Correo ya registrado");
        return;
      }

      const nuevoUsuario = { id: Date.now(), nombre, correo, contraseña };
      await postUsuarios(nuevoUsuario);
      setUsuarios([...usuarios, nuevoUsuario]);
      mostrarMensaje(setMensajeRegistro, "✅ Registro exitoso");

      setNombre("");
      setCorreo("");
      setContraseña("");
    } catch (error) {
      console.error(error);
      mostrarMensaje(setMensajeRegistro, "❌ Error al registrar");
    }
  };

  return (


    <div className="login-page">
       <ModalLogin visible={mostrarModal} onClose={() => setMostrarModal(false)} />
      {/* Lado izquierdo: formulario */}
      <section className="left">
        <header className="brand">
          <div className="logo"></div>
       
        </header>

        <div className="form-wrap registro-form">
          <h1>Registro</h1>
          <p className="sub">Crea tu cuenta</p>

          <label>
            <span className="label-text">Nombre</span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Introduce tu Usuario"
            />
          </label>

          <label>
            <span className="label-text">Correo</span>
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@email.com"
            />
          </label>

          <label>
            <span className="label-text">Contraseña</span>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Introduce tu Contraseña"
            />
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

      {/* Lado derecho: imagen */}
      <section className="right">
        <img src={fondoLogin} alt="fondoLoginTicoLand" />
      </section>
    </div>
  );
}

export default Registro;
