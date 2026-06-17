import axios from "axios";

/**
 * Actualiza un usuario en el sistema
 * @param {Object} data - Datos del usuario a actualizar
 * @returns {Promise<{ ok: boolean, status?: number }>} - Resultado de la actualización
 */
export async function updateUser(data) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/updateUser`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
