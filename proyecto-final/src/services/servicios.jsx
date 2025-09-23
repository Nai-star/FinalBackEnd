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

// Productos
export async function postProductos(productos) {
   try {
      const response = await fetch("http://localhost:3001/productos", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(productos)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el productos", error);
      throw error;
   }
}

export async function getProductos() {
   try {
      const response = await fetch("http://localhost:3001/productos");
      if (!response.ok) throw new Error("Error al obtener usuarios");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los productos", error);
      throw error;
   }
}