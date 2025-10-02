import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logoblanco from "../../assets/Logoblanco.png";
import { getProductos,postProductos,deleteProductos,  patchProductos,} from "../../services/servicios";
import "./emprendedor.css";

const Emprendedor = () => {
  const [productos, setProductos] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false); // Para agregar producto
  const [modalData, setModalData] = useState({ nombre: "", precio: "" });

  const [editModalOpen, setEditModalOpen] = useState(false); // Para editar
  const [editData, setEditData] = useState({ id: null, nombre: "", precio: "" });

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Para eliminar
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // Cargar productos desde db.json
  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  // Guardar producto
  const guardarProducto = async (imgBase64, nombre, precio) => {
    const nuevoProducto = { nombre, precio, img: imgBase64 };
    const guardado = await postProductos(nuevoProducto);
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
        setModalOpen(true); // Abrir modal agregar
        setModalData({ nombre: "", precio: "" });
      };
    }
  };

  const allowDrop = (e) => e.preventDefault();

  // Guardar en modal de nuevo producto
  const handleModalSave = async () => {
    if (!modalData.nombre || !modalData.precio) return;
    await guardarProducto(draggedImage, modalData.nombre, modalData.precio);
    setModalOpen(false);
    setDraggedImage(null);
  };

  // Editar producto (abrir modal)
  const handleEditar = (producto) => {
    setEditData({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    const actualizado = await patchProductos(editData.id, {
      nombre: editData.nombre,
      precio: editData.precio,
    });
    setProductos((prev) =>
      prev.map((p) => (p.id === editData.id ? actualizado : p))
    );
    setEditModalOpen(false);
  };

  // Eliminar producto (abrir confirmación)
  const handleEliminar = (producto) => {
    setDeleteId(producto.id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    await deleteProductos(deleteId);
    setProductos((prev) => prev.filter((p) => p.id !== deleteId));
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="container-emprendedor">
      {/* Navbar */}
      <nav className="navbar">
        <img src={Logoblanco} alt="Logo" className="logo" />
        <div className="menu">
          <button onClick={() => navigate("/")}>Inicio</button>
        
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

      {/* Modal agregar producto */}
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
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar producto</h3>
            <input
              type="text"
              value={editData.nombre}
              onChange={(e) =>
                setEditData({ ...editData, nombre: e.target.value })
              }
            />
            <input
              type="text"
              value={editData.precio}
              onChange={(e) =>
                setEditData({ ...editData, precio: e.target.value })
              }
            />
            <button onClick={handleEditSave}>Guardar cambios</button>
            <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal confirmación eliminar */}
      {confirmDeleteOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Seguro que quieres eliminar este producto?</h3>
            <button onClick={confirmDelete}>Sí, eliminar</button>
            <button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</button>
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
