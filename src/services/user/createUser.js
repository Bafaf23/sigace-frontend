import axios from "axios";
/**
 *
 * @param {Object} data - Datos del usuario a crear.
 * @returns {Object} - Datos de la respuesta del servidor.
 */
export async function createUser(data) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/createUser`,
      data,
    );

    return response.json();
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return error.response.json();
  }
}
