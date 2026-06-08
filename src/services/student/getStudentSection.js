import axios from "axios";

/**
 * Obtener las secciones de los estudiantes
 * @param {number} id - El ID del estudiante
 * @returns {Promise<Array>} - Las secciones de los estudiantes
 */
export const getStudentSection = async (id, SIG) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getStudentsBySection/${id}/${SIG}`,
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
