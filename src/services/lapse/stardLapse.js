import axios from "axios";

/**
 * Iniciar un lapso
 * @param {string} id - El ID del lapso
 * @returns {Promise<Object>} - La respuesta de la API
 */
export const startLapse = async (id) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/start/${id}`,
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
        "Error al iniciar el lapso",
    };
  }
};
