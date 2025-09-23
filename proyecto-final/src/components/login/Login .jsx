import React, { useState, useEffect } from "react";
import { getUsuarios } from "../../services/servicios";
import "./login.css";
import fondoLogin from "../../assets/fondoLogin.png";
import ModalLogin from "../modalLogin/ModalLogin";

function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombreI, setNombreI] = useState("");
  const [contraseñaU, setContraseñaU] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await getUsuarios();
        setUsuarios(res);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const mostrarMensaje = (setMensaje, texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);

    if (!usuarios || !contraseñaU) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Complete todos los campos");
        return;
      }
  };

  // Quitamos handleLogin porque el login real se hace en las rutas específicas
  // O si quieres puedes mantenerlo para validar datos aquí

  return (
    <main className="login-page">
      <section className="left">
        <header className="brand">
          <div className="logo"></div>
          <div className="brand-name">TO-DoNaiReact</div>
        </header>

        <div className="form-wrap login-form">
          <h1>Bienvenido</h1>
          <p className="sub">Ingrese sus datos</p>

          <label>
            <span className="label-text">Usuario:</span>
            <input
              value={nombreI}
              onChange={(e) => setNombreI(e.target.value)}
              placeholder="Tu nombre de Usuario"
            />
          </label>

          <label>
            <span className="label-text">Contraseña:</span>
            <input
              type="password"
              value={contraseñaU}
              onChange={(e) => setContraseñaU(e.target.value)}
              placeholder="Introduce una contraseña"
            />
          </label>

          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Recordar 30 días</label>
          </div>

          <p className="small muted">
            ¿Olvidaste tu contraseña? <a href="/recover">Recupérala aquí</a>
          </p>

          {/* Este botón ahora solo abre el modal */}
          <button className="btn primary" onClick={() => setMostrarModal(true)}>
            Iniciar Sesión
          </button>
          <p>{mensajeLogin}</p>

          <p className="small muted">
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </div>
      </section>

      {/* Lado derecho con imagen */}
      <section className="right">
        <div className="image-container">
          <img src={fondoLogin} alt="fondoLoginTicoLand" />
        </div>
      </section>

      {/* Modal */}
      <ModalLogin visible={mostrarModal} onClose={() => setMostrarModal(false)} />
    </main>
  );
}

export default Login;
