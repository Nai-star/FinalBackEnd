import  { useState, useEffect } from 'react'
import "./loginE.css"
import { getEmprendedores,postEmprendedores } from '../../services/servicios';
import fondoLogin from "../../assets/fondoLogin.png"

function LoginEmprendedor() {
      const [emprendedores, setEmprendedores] = useState([]);
      const [nombre, setNombre] = useState("");
      const [correo, setCorreo] = useState("");
      const [numero,setNumero] = useState("")
      const [nombreTienda,setNombretienda] = useState("")
      const [ubi,setUbi] = useState("")
      const [contraseña, setContraseña] = useState("");
      const [mensajeRegistro, setMensajeRegistro] = useState("");
    
      useEffect(() => {
        const fetchUsuarios = async () => {
          const res = await getEmprendedores();
          setEmprendedores(res);
        };
        fetchUsuarios();
      }, []);
    
      const mostrarMensaje = (setMensaje, texto) => {
        setMensaje(texto);
        setTimeout(() => setMensaje(""), 4000);
      };
    
      const handleRegistro = async () => {
        try {
          if (!nombre || !correo || !numero||!nombreTienda||!ubi || !contraseña) {
            mostrarMensaje(setMensajeRegistro, "⚠️ Complete todos los campos");
            return;
          }
    
          const nombreExiste = emprendedores.some((u) => u.nombre === nombre);
          const correoExiste = emprendedores.some((u) => u.correo === correo);
          const numeroExiste = emprendedores.some((u) => u.numero === numero);
          const nombreTiendaExiste = emprendedores.some((u) => u.nombreTienda === nombreTienda);


          if (nombreExiste) {
            mostrarMensaje(setMensajeRegistro, "⚠️ Nombre ya registrado");
            return;
          }
          if (correoExiste) {
            mostrarMensaje(setMensajeRegistro, "⚠️ Correo ya registrado");
            return;
          }
          if (numeroExiste) {
            mostrarMensaje(setMensajeRegistro, "⚠️ Número ya registrado");
            return;
          }
          if (nombreTiendaExiste) {
            mostrarMensaje(setMensajeRegistro, "⚠️ Nombre de la tienda ya registrado");
            return;
          }
    
    
    
          const nuevoEmprendedor = { id: Date.now(), nombre, correo, numero, nombreTienda,ubi, contraseña };
          await postEmprendedores(nuevoEmprendedor);
          setEmprendedores([...emprendedores, nuevoEmprendedor]);
          mostrarMensaje(setMensajeRegistro, "✅ Registro exitoso");
    
          setNombre("");
          setCorreo("");
          setNumero("")
          setNombretienda("")
          setUbi("")
          setContraseña("");
        } catch (error) {
          console.error(error);
          mostrarMensaje(setMensajeRegistro, "❌ Error al registrar");
        }
      };
    
  return (
    <div>
        
    <div className="login-page">
   
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
              type='text'
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
          <p className="label-text">Número</p>
         <input type="number" value={numero}onChange={(e)=> setNumero(e.target.value)}placeholder='Número de telefono'/>
          <label>
          
        <label>
            <p className="label-text">Emprendimiento</p>
            <input type="text" value={nombreTienda} onChange={(e)=> setNombretienda(e.target.value)}placeholder="Nombre de la tienda"/>
        </label>

        <label>
            <p className="label-text">Ubicación</p>
            <input type="text" value={ubi} onChange={(e)=>setUbi (e.target.value)} />
        </label>

          </label>

          <label>
            <span className="label-text">Contraseña</span>
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Introduce tu Contraseña"
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
      
    </div>
  )
}

export default LoginEmprendedor
