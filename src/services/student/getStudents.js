import axios from "axios";

/**
 ** Obtiene los estudiantes de la base de datos
 * @returns {Promise<Array>} - Un array de estudiantes
 */
export const getStudents = async (SIG, id_period) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students/getStudents`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
