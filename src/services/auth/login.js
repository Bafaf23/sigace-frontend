import axios from "axios";

/**
 * Función para iniciar sesión con los datos del formulario
 * @param {Object} formData - Datos del formulario de inicio de sesión
 * @returns {Object} - Datos de la respuesta del servidor o error controlado
 */
export async function login(formData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    // Verificamos si el backend alcanzó a responder algo
    if (error.response && error.response.data) {
      // Extraemos cualquiera de las variantes que pueda mandar el servidor
      const serverError =
        error.response.data.error || error.response.data.message;

      console.error("Error del servidor original:", serverError);

      return {
        error: serverError || "Credenciales incorrectas o error de acceso",
      };
    }

    // Si el servidor ni siquiera respondió (ej. backend apagado o error de red)
    console.error("Error de conexión:", error.message);
    return { error: "No se pudo conectar con el servidor de autenticación" };
  }
}
