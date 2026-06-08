import axios from "axios";

/**
 * Obtiene los lapsos de la base de datos.
 * @returns {Promise<Array>} - Array de lapsos.
 */
export const getLapses = async (SIG) => {
  if (!SIG) {
    return { error: "SIG es requerido" };
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/getLapses/${SIG}`,
    );
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message ?? "Error al obtener los lapsos",
    };
  }
};
