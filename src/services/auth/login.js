/**
 * Funcion para iniciar sesión con los datos del formulario
 * @param {Object} formData - Datos del formulario de inicio de sesión
 * @returns {Object} - Datos de la respuesta del servidor
 */
export async function login(formData) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (data.error) {
      console.error("Error al iniciar sesión:", data.error);
      return { error: data.error };
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Error al iniciar sesión: " + error.message };
  }
}
