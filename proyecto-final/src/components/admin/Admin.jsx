import { useState, useEffect } from "react";
import "./admin.css";
import {
  getEmprendedores,
  deleteEmprendedores,
  updateemprendedores,
} from "../../services/servicios";

function Admin() {
  // Estados para modales y contraseña
  const [contra, setContra] = useState(true); // Modal de contraseña visible
  const [input, setInput] = useState(""); // Input de contraseña
  const [error, setError] = useState("");

  // Estados para emprendedores
  const [emprendedores, setEmprendedores] = useState([]);
  const [usuario, setUsuario] = useState(null); // Usuario seleccionado para editar
  const [modalVisible, setModalVisible] = useState(false);

  // Estados individuales del usuario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");
  const [nombreTienda, setNombreTienda] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [ubi, setUbi] = useState("");

  const CONTRASEÑA_CORRECTA = "28228haK";

  // Traer emprendedores al cargar la página
  useEffect(() => {
    const fetchEmprendedores = async () => {
      try {
        const res = await getEmprendedores();
        setEmprendedores(res);
      } catch (err) {
        console.error("Error al cargar emprendedores:", err);
      }
    };
    fetchEmprendedores();
  }, []);

  // Validar contraseña
  const validarContraseña = () => {
    if (input === CONTRASEÑA_CORRECTA) {
      setContra(false);
      setError("");
    } else {
      setError("Contraseña incorrecta. Intenta de nuevo.");
    }
  };

  // Borrar usuario
  const eliminarUsuario = async (id) => {
    try {
      await deleteEmprendedores(id);
      setEmprendedores(emprendedores.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error al borrar:", err);
    }
  };

  // Abrir modal para editar
  const editarUsuario = (user) => {
    setUsuario({ ...user });
    setNombre(user.nombre);
    setCorreo(user.correo);
    setNumero(user.numero);
    setNombreTienda(user.nombreTienda);
    setContraseña(user.contraseña);
    setUbi(user.ubi);
    setModalVisible(true);
  };

  // Guardar cambios del usuario
  const guardarCambios = async (id) => {
    if (!usuario || !usuario.id) return;

    const datosActualizados = {
      ...usuario,
      nombre,
      correo,
      numero,
      nombreTienda,
      ubi,
      contraseña,
    };

    try {
      const actualizado = await updateemprendedores(id, datosActualizados);
      setEmprendedores(
        emprendedores.map((e) => (e.id === actualizado.id ? actualizado : e))
      );
      setModalVisible(false);
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  return (
    <div>
      {/* Modal de contraseña */}
      {contra ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Por favor, ingresa la contraseña</h2>
            <input
              type="password"
              placeholder="Contraseña"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && validarContraseña()}
            />
            {error && <p className="error">{error}</p>}
            <button onClick={validarContraseña}>Aceptar</button>
          </div>
        </div>
      ) : (
        <div className="admin-page">
          <h1>Panel de Administrador</h1>
          <div className="cards-container">
            {emprendedores.map((e) => (
              <div key={e.id} className="card">
                <p>
                  <strong>Nombre:</strong> {e.nombre}
                </p>
                <p>
                  <strong>Correo:</strong> {e.correo}
                </p>
                <p>
                  <strong>Número:</strong> {e.numero}
                </p>
                <p>
                  <strong>Tienda:</strong> {e.nombreTienda}
                </p>
                <p>
                  <strong>Ubicación:</strong> {e.ubi}
                </p>
                <p>
                  <strong>Contraseña:</strong> ****** 
                </p>
                <div className="acciones">
                  <button className="editar" onClick={() => editarUsuario(e)}>
                    Editar
                  </button>
                  <button className="borrar" onClick={() => eliminarUsuario(e.id)}>
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de edición */}
          {modalVisible && usuario && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Editar Usuario</h2>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                />
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Correo"
                />
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Número"
                />
                <input
                  type="text"
                  value={nombreTienda}
                  onChange={(e) => setNombreTienda(e.target.value)}
                  placeholder="Nombre Tienda"
                />
                <input
                  type="text"
                  value={ubi}
                  onChange={(e) => setUbi(e.target.value)}
                  placeholder="Ubicación"
                />
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Contraseña"
                />
                <div className="acciones">
                  <button
                    className="editar"
                    onClick={() => guardarCambios(usuario.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="borrar"
                    onClick={() => setModalVisible(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;






