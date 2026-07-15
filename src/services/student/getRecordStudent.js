import axios from "axios";

/**
 ** Obtiene el récord académico histórico de un estudiante por su ID
 * @param {number} idStudent - id de estudiante
 * @param {number} idPeriod - id del perido escolar
 */
export async function getRecordStudent(idStudent, idPeriod) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getRecordStudent/${idStudent}?id_period=${idPeriod}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
