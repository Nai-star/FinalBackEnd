import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logoblanco from "../../assets/Logoblanco.png";
import {
  getProductos,
  postProductos,
  deleteProductos,
  patchProductos,
} from "../../services/servicios";
import "./emprendedor.css";

const Emprendedor = () => {
  const [productos, setProductos] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ nombre: "", precio: "" });

  const navigate = useNavigate();

  // Cargar productos desde db.json
  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  // Guardar producto en db.json
  const guardarProducto = async (imgBase64, nombre, precio) => {
    const nuevoProducto = { nombre, precio, img: imgBase64 };
    const guardado = await postProductos(nuevoProducto); // ID generado
    setProductos((prev) => [...prev, guardado]);
  };

  // Drag & Drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDraggedImage(reader.result);
        setModalOpen(true); // Abrir modal para nombre y precio
        setModalData({ nombre: "", precio: "" });
      };
    }
  };

  const allowDrop = (e) => e.preventDefault();

  // Modal guardar
  const handleModalSave = async () => {
    if (!modalData.nombre || !modalData.precio) return;
    await guardarProducto(draggedImage, modalData.nombre, modalData.precio);
    setModalOpen(false);
    setDraggedImage(null);
  };

  // Editar producto
  const handleEditar = async (producto) => {
    const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    const nuevoPrecio = prompt("Nuevo precio:", producto.precio);
    if (nuevoNombre && nuevoPrecio) {
      const actualizado = await patchProductos(producto.id, {
        nombre: nuevoNombre,
        precio: nuevoPrecio,
      });
      setProductos((prev) =>
        prev.map((p) => (p.id === producto.id ? actualizado : p))
      );
    }
  };

  // Eliminar producto
  const handleEliminar = async (producto) => {
    if (!producto.id) return;
    await deleteProductos(producto.id);
    setProductos((prev) => prev.filter((p) => p.id !== producto.id));
  };

  return (
    <div className="container-emprendedor">
      {/* Navbar */}
      <nav className="navbar">
        <img src={Logoblanco} alt="Logo" className="logo" />
        <div className="menu">
          <button onClick={() => navigate("/")}>Inicio</button>
          <button>Perfil</button>
        </div>
      </nav>

      {/* Drag & Drop Area */}
      <section className="productos">
        <h2>Productos (Arrastra imágenes aquí)</h2>
        <div className="drop-area" onDrop={handleDrop} onDragOver={allowDrop}>
          {productos.map((p) => (
            <div key={p.id} className="producto-item">
              <img src={p.img} alt={p.nombre} />
              <span>{p.nombre}</span>
              <span>${p.precio}</span>
              <div className="botones">
                <button onClick={() => handleEditar(p)}>Editar</button>
                <button onClick={() => handleEliminar(p)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar producto</h3>
            <img src={draggedImage} alt="Producto" className="preview" />
            <input
              type="text"
              placeholder="Nombre del producto"
              value={modalData.nombre}
              onChange={(e) =>
                setModalData({ ...modalData, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Precio"
              value={modalData.precio}
              onChange={(e) =>
                setModalData({ ...modalData, precio: e.target.value })
              }
            />
            <button onClick={handleModalSave}>Guardar</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <span>Contacto</span> | <span>Redes Sociales</span>
      </footer>
    </div>
  );
};

export default Emprendedor;




