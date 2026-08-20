import axios from "axios";

/**
 * Funcion para eliminar un usuario del sistema
 * @param {string} userId - ID del usuario a eliminar
 * @returns {Promise<object>} - Respuesta del servidor
 */
export async function deleteUser(userId, roleId) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/${roleId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
