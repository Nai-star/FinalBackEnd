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

export async function getProductos() {
   try {
      const response = await fetch("http://localhost:3001/productos");
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