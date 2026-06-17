import axios from "axios";

/**
 * Finalizar un lapso
 * @param {string} id - El ID del lapso
 * @returns {Promise<Object>} - La respuesta de la API
 */
export const endLapse = async (id) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/end/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
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
