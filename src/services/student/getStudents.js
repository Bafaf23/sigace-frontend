import axios from "axios";

/**
 ** Obtiene los estudiantes de la base de datos
 * @param {string} SIG - El SIG del estudiante
 * @param {string} Token - creado desde el servidor
 * @param {number} id_period - id de perido academico
 * @returns {Promise<Array>} - Un array de estudiantes
 */
export const getStudents = async (SIG, authority, id_period) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students/getStudents/${SIG}/${id_period}`,
    {
      headers: {
        Authorization: `Bearer ${authority}`,
        "Content-Type": "application/json",
        role_id: sessionStorage.getItem("user").role_id,
      },
    },
  );
  return response.data;
};
