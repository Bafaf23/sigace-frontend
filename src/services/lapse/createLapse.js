import axios from "axios";

/**
 * Crea un nuevo lapso
 * @param {string} SIG - Código SIG del año escolar
 * @param {string} token - Token de autenticación
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const createLapse = async (SIG, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/create/${SIG}`,
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
      error: error.response?.data?.message ?? "Error al crear los lapsos",
    };
  }
};
