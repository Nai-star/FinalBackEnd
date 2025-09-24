import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logoblanco from "../../assets/Logoblanco.png";
import { getProductos, postProductos, deleteProductos,patchProductos,} from "../../services/servicios";
import "./emprendedor.css";

const Emprendedor = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null); // 📌 usamos state para la imagen

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  // Convertir imagen a Base64
  const convertirBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Agregar producto
  const agregarProducto = async () => {
    if (!nombre || !precio || !imagen) {
      alert("Completa todos los campos e imagen");
      return;
    }

    // Evitar duplicados
    const existe = productos.some(
      (p) => p.nombre === nombre && p.precio === precio
    );
    if (existe) {
      alert("Este producto ya existe");
      return;
    }

    const base64 = await convertirBase64(imagen);

    const nuevoProducto = {
      nombre,
      precio,
      img: base64,
    };

    const guardado = await postProductos(nuevoProducto);
    setProductos((prev) => [...prev, guardado]);

    // 📌 Limpiar todos los estados
    setNombre("");
    setPrecio("");
    setImagen(null);
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    await deleteProductos(id);
    setProductos(productos.filter((p) => p.id !== id));
  };

  // Editar producto
  const editarProducto = async (id, producto) => {
    const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    const nuevoPrecio = prompt("Nuevo precio:", producto.precio);

    if (nuevoNombre && nuevoPrecio) {
      const actualizado = await patchProductos(id, {
        nombre: nuevoNombre,
        precio: nuevoPrecio,
      });
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? actualizado : p))
      );
    }
  };

  // Drag & Drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    for (const file of files) {
      if (!file.type.startsWith("image/")) return;

      const base64 = await convertirBase64(file);

      const existe = productos.some(
        (p) => p.nombre === nombre && p.precio === precio
      );
      if (existe) {
        alert("Este producto ya existe");
        continue;
      }

      const nuevoProducto = {
        nombre: nombre || "Producto",
        precio: precio || "0",
        img: base64,
      };

      const guardado = await postProductos(nuevoProducto);
      setProductos((prev) => [...prev, guardado]);
    }

    // Limpiar estados
    setNombre("");
    setPrecio("");
    setImagen(null);
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={Logoblanco} alt="Logo" className="Logo" />
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Inicio</li>
          <li>Perfil</li>
        </ul>
      </nav>

      {/* Inputs */}
      <div className="header-info">
        <div className="welcome">
          Hola, Venus!
          <input
            type="text"
            placeholder="Nombre producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])} // 📌 guardamos en state
          />
          <button onClick={agregarProducto}>Agregar Producto</button>
        </div>
      </div>

      {/* Productos */}
      <section className="productos">
        <h2>Productos (arrastra imágenes aquí)</h2>
        <div className="drop-area" onDrop={handleDrop} onDragOver={allowDrop}>
          {productos.length === 0 && <p>Arrastra tus imágenes aquí</p>}
          {productos.map((p) => (
            <div key={p.id} className="producto-item">
              <img src={p.img} alt={p.nombre} />
              <span>{p.nombre}</span>
              <span>${p.precio}</span>
              <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              <button onClick={() => editarProducto(p.id, p)}>Editar</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>Contacto</span> | <span>Redes Sociales</span>
      </footer>
    </div>
  );
};

export default Emprendedor;



