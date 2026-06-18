import axios from "axios";

/**
 ** Obtiene los estudiantes de la base de datos
 * @param {string} SIG - El SIG del estudiante
 * @param {number} id_period - id de perido academico (Este parametro es query de la ruta)
 * @returns {Promise<Array>} - Un array de estudiantes
 */
export const getStudents = async (SIG, id_period) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students/getStudents/${SIG}?id_period=${id_period}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
