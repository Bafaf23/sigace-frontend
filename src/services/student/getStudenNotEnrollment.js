import axios from "axios";

/**
 * Obtiene los estudiantes que no tienen inscripción
 * @param {object} SIG - El código SIG del estudiante
 * @param {object} id_period - El ID del periodo
 * @returns {Promise<object>} Los estudiantes que no tienen inscripción
 *
 */

export const getStudenNotEnrollment = async ({ SIG, id_period }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getStudentNotEnrolled/${id_period}/${SIG}`,
    );
    const data = response.data;

    if (data.length === 0) return [];

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error:
        error.response?.data?.message || "Error al obtener los estudiantes",
    };
  }
};
