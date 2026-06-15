import axios from "axios";

/**
 * Crea una evaluación en el plan evaluativo
 * @param {Object} data - Datos de la evaluación
 * @returns {Promise<Object>} - Datos de la evaluación creada
 */
export const createEvaluation = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/evaluations/create`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la evaluación:", error);
    return { error: error.response.data.message };
  }
};
