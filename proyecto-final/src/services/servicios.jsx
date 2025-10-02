//admin
export async function postAdmin(admin) {
   try {
      const response = await fetch("http://localhost:3001/admin", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(admin)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los datos del emprendedor", error);
      throw error;
   }
}
export async function getAdmin() {
   try {
      const response = await fetch("http://localhost:3001/admin");
      if (!response.ok) throw new Error("Error al obtener admins");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los admins", error);
      throw error;
   }
}



export async function postUsuarios(usuario) {
   try {
      const response = await fetch("http://localhost:3001/usuarios", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(usuario)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el usuario", error);
      throw error;
   }
}

export async function getUsuarios() {
   try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (!response.ok) throw new Error("Error al obtener usuarios");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los usuarios", error);
      throw error;
   }
}

export async function findUser(identifier) {
   try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (!response.ok) throw new Error("Error en la solicitud de búsqueda de usuario");
      const users = await response.json();
      return users.find(u => u.nombre === identifier || u.correo === identifier) || null;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function updatePassword(userId, newPassword) {
   try {
      const response = await fetch(`http://localhost:3001/usuarios/${userId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ contraseña: newPassword })
      });
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}


//Emprendedores
export async function postEmprendedores(emprendedores) {
   try {
      const response = await fetch("http://localhost:3001/emprendedores", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(emprendedores)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los datos del emprendedor", error);
      throw error;
   }
}

export async function deleteEmprendedores(id) {
   try {
      const response = await fetch(`http://localhost:3001/emprendedores/${id}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" }
      });
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function updateemprendedores(id, emprendedor) {
   console.log(id, emprendedor);
   

  // PATCH solo envía los campos que queremos actualizar
  const res = await fetch(`http://localhost:3001/emprendedores/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emprendedor),
  });

  if (!res.ok) throw new Error("Error al actualizar");

  return await res.json();
}


export async function getEmprendedores() {
   try {
      const response = await fetch("http://localhost:3001/emprendedores");
      if (!response.ok) throw new Error("Error al obtener los datos del emprendedor");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los datos de emprendedor", error);
      throw error;
   }
}



//productos

export async function postProductos(productos) {
   try {
      const response = await fetch("http://localhost:3001/productos", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(productos)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el producto", error);
      throw error;
   }
}

export async function getProductos(id) {
   try {
      const url = id ? `http://localhost:3001/productos/${id}` : "http://localhost:3001/productos";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener el producto");
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function deleteProductos(id) {
   try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar la tarea");
      return true;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function patchProductos(id, productoEditado) {
   try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(productoEditado)
      });
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}
//carrito
export async function addToCarrito(productoConCantidad) {
   try {
      // 1. Verificar si ya existe el producto en el carrito
      const response = await fetch(`http://localhost:3001/carrito?id=${productoConCantidad.id}`);
      const existentes = await response.json();

      if (existentes.length > 0) {
         // 2. Ya existe → actualizar cantidad
         const existente = existentes[0];
         const nuevaCantidad = existente.cantidad + productoConCantidad.cantidad;

         const patchResponse = await fetch(`http://localhost:3001/carrito/${existente.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cantidad: nuevaCantidad })
         });

         if (!patchResponse.ok) throw new Error("Error al actualizar la cantidad del producto en el carrito");
         return await patchResponse.json();
      } else {
         // 3. No existe → agregar nuevo producto al carrito
         const postResponse = await fetch("http://localhost:3001/carrito", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoConCantidad)
         });

         if (!postResponse.ok) throw new Error("Error al agregar producto al carrito");
         return await postResponse.json();
      }
   } catch (error) {
      console.error("Error en addToCarrito:", error);
      throw error;
   }
}

// Obtener todos los productos del carrito
export async function getCarrito() {
   try {
      const response = await fetch("http://localhost:3001/carrito");
      if (!response.ok) throw new Error("Error al obtener el carrito");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener el carrito:", error);
      throw error;
   }
}

// Eliminar un producto del carrito por ID
export async function deleteCarrito(id) {
   try {
      const response = await fetch(`http://localhost:3001/carrito/${id}`, {
         method: "DELETE"
      });
      if (!response.ok) throw new Error("Error al eliminar producto del carrito");
      return true;
   } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      throw error;
   }
}

// Actualizar cantidad de un producto en el carrito
export async function updateCarritoCantidad(id, nuevaCantidad) {
   try {
      const response = await fetch(`http://localhost:3001/carrito/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ cantidad: nuevaCantidad })
      });
      if (!response.ok) throw new Error("Error al actualizar cantidad del producto");
      return await response.json();
   } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      throw error;
   }
}


export async function postDetalles(detalles) {
   try {
      const response = await fetch("http://localhost:3001/detalles", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(detalles)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el usuario", error);
      throw error;
   }
}
export async function getDetalles() {
   try {
      const response = await fetch("http://localhost:3001/detalles");
      if (!response.ok) throw new Error("Error al obtener el carrito");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener el carrito:", error);
      throw error;
   }
}

export async function postPagos(pagos) {
   try {
      const response = await fetch("http://localhost:3001/pagos", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(pagos)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el usuario", error);
      throw error;
   }
}