import axios from "axios";

/**
 * Registra o actualiza la calificación de un estudiante.
 * @param {Object} data - Datos de la calificación
 * @returns {Promise<Object>}
 */
export const createGrade = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/grades/uploadNote`,
      data,
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message || "Error al registrar la calificación",
    };
  }
};
