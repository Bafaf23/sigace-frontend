import axios from "axios";

/**
 *
 * @param {object} data - Datos del usuario a crear.
 * @returns {object} - Datos de la respuesta del servidor.
 */
export async function createUser(data) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/createUser`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return error.response.data;
  }
}
