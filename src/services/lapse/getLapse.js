import axios from "axios";

/**
 * Obtiene los lapsos de la base de datos.
 * @param {string} SIG - Codigo unico del colgio
 * @param {number} id_peirod - Id del periodo actual
 * @returns {Promise<Array>} - Array de lapsos.
 */
export const getLapses = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/getLapses`,
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
