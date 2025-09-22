import React, { useState, useEffect } from "react";
import { getUsuarios } from "../../services/servicios";
import "./login.css";
import fondoLogin from "../../assets/fondoLogin.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombreI, setNombreI] = useState("");
  const [contraseñaI, setContraseñaI] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");
  const navigate = useNavigate()

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
  };

  const handleLogin = () => {
    if (!nombreI || !contraseñaI) {
      mostrarMensaje(setMensajeLogin, "⚠️ Complete todos los campos");
      return;
    }

    const usuario = usuarios.find(
      (u) => u.nombre === nombreI && u.contraseña === contraseñaI
    );

    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      mostrarMensaje(setMensajeLogin, "✅ Bienvenido " + usuario.nombre);
      setTimeout(() => {
        window.location.href = "/lista";
      }, 1000);
    } else {
      mostrarMensaje(setMensajeLogin, "❌ Usuario o contraseña incorrectos");
    }
  };

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
              value={contraseñaI}
              onChange={(e) => setContraseñaI(e.target.value)}
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

          <button className="btn primary" onClick={(handleLogin) => navigate("/")}>
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
    </main>
  );
}

export default Login;

