/**
 * Funcion para iniciar sesión con los datos del formulario
 * @param {Object} formData - Datos del formulario de inicio de sesión
 * @returns {Object} - Datos de la respuesta del servidor
 */
export async function login(formData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      return { error: data.error ?? "Error al iniciar sesión" };
    }

    return data;
  } catch (error) {
    return { error: error.response.data.message };
  }
}
