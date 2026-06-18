import axios from "axios";

/**
 * Obtener las secciones de los estudiantes
 * @param {number} id_section- El ID de la section
 * @param {string} SIG codigo unico del colegio
 * @returns {Promise<Array>} - Las secciones de los estudiantes
 */
export const getStudentSection = async (id_section, SIG) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getStudentsBySection/${id_section}/${SIG}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
