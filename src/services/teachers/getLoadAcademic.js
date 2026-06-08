import axios from "axios";

/**
 * Obtiene los cargos académicos de un profesor
 * @param {string} id - Usuario ID
 * @returns {Promise<Object>} - La respuesta de la API
 */
export const getLoadAcademic = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/getLoadAcademicTeacher/${id}`,
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message ||
        "Error al obtener los cargos académicos",
    };
  }
};
