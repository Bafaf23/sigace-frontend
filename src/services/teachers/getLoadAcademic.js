import axios from "axios";

/**
 * Obtiene los cargos académicos de un profesor
 * @param {number} id - Usuario ID
 * @param {string} SIG - codigo unico del Colegio
 * @returns {Promise<object>} - La respuesta de la API
 */
export const getLoadAcademic = async (id, SIG) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/getLoadAcademicTeacher/${id}/${SIG}`,
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
        error.response?.data?.message ||
        "Error al obtener los cargos académicos",
    };
  }
};
