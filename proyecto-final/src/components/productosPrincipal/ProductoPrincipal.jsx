import React from "react";
import "./productoP.css";

const productos = [
  { id: 1, nombre: "Conjunto verde–VENUS CR", precio: "20.00$", img: "/img/vestido-verde.jpg" },
  { id: 2, nombre: "Vestido Halter–VENUS CR", precio: "25.00$", img: "/img/vestido-rojo.jpg" },
  { id: 3, nombre: "Vela Cielo–AIRE", precio: "10.99$", img: "/img/vela-cielo.jpg" },
  { id: 4, nombre: "Vela CR–AIRE", precio: "9.99$", img: "/img/vela-cr.jpg" },
  { id: 5, nombre: "Aceites Doterra–AIRE", precio: "9.99$", img: "/img/aceites.jpg" },
  { id: 6, nombre: "Taza–AIRE", precio: "18.99$", img: "/img/taza.jpg" },
  { id: 7, nombre: "Conjunto lila–VENUS CR", precio: "21.99$", img: "/img/conjunto-lila.jpg" },
  { id: 8, nombre: "Print-mesh–VENUS CR", precio: "32.99$", img: "/img/conjunto-mesh.jpg" },
];

function ProductoPrincipal() {
  return (
    <section className="productos-section">
      <h2>Productos</h2>
      <p className="subtitulo">Ordena tu producto favorito</p>

      <div className="productos-grid">
        {productos.map((prod) => (
          <div className="producto-card" key={prod.id}>
            <img src={prod.img} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p className="precio">{prod.precio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductoPrincipal;

