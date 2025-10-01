import { useState, useEffect } from "react";
import { getUsuarios, getEmprendedores,getAdmin } from "../../services/servicios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import fondoLogin from "../../assets/fondoLogin.png";

function Login() {
  const navigate = useNavigate();
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

  // Función para mostrar mensaje temporal
  const mostrarMensaje = (setMensaje, texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);
  };

  // Nueva función handleLogin con GET de usuarios y emprendedores
  const handleLogin = async () => {
    try {
      if (!nombreI || !contraseñaU) {
        mostrarMensaje(setMensajeLogin, "⚠️ Complete todos los campos");
        return;
      }

      // Obtener usuarios y emprendedores desde JSON Server
      const usuariosData = await getUsuarios();
      const emprendedoresData = await getEmprendedores();
      const adminsData = await getAdmin()

      // Buscar en usuarios
      const user = usuariosData.find(
        (u) => u.nombre === nombreI && u.contraseña === contraseñaU
      );
      if (user) {
        navigate("/"); // redirige a página de usuarios
        return;
      }

      // Buscar en emprendedores
      const emprendedor = emprendedoresData.find(
        (e) => e.nombre === nombreI && e.contraseña === contraseñaU
      );
      if (emprendedor) {
        navigate("/Paginaemprendedores"); // redirige a página de emprendedores
        return;
      }
      //Buscar admins

      const Admin= adminsData.find(
        (u) => u.nombre === nombreI && u.contraseña === contraseñaU
      );
      if (Admin) {
        navigate("/Admin"); // redirige a página de Admins
        return;
      }

      mostrarMensaje(setMensajeLogin, "❌ Usuario o contraseña incorrectos");
    } catch (error) {
      console.error("Error en login:", error);
      mostrarMensaje(setMensajeLogin, "⚠️ Error al conectar con el servidor");
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

          {/* Botón ahora hace login real */}
          <button className="btn primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <p>{mensajeLogin}</p>

          <p className="small muted">
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </div>
      </section>

      <section className="right">
        <div className="image-container">
          <img src={fondoLogin} alt="fondoLoginTicoLand" />
        </div>
      </section>
    </main>
  );
}

export default Login;
