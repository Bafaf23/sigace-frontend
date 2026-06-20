import axios from "axios";

/**
 * Obtiene los lapsos de la base de datos.
 * @returns {Promise<Array>} - Array de lapsos.
 */
export const getLapseActive = async () => {

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/getLapseActive`,
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
      error: error.response?.data?.message ?? "Error al obtener los lapsos",
    };
  }
};
