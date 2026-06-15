import axios from "axios";

/**
 * Finalizar un lapso
 * @param {string} id - El ID del lapso
 * @param {string} token - Token de autenticación
 * @returns {Promise<Object>} - La respuesta de la API
 */
export const endLapse = async (id, token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/end/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ??
        error.response?.data?.message ??
        "Error al finalizar el lapso",
    };
  }
};
