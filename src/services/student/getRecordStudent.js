import axios from "axios";

/**
 ** Obtiene el récord académico histórico de un estudiante por su ID
 * @param {number} idStudent - id de estudiante
 */
export async function getRecordStudent(idStudent) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getRecordStudent/${idStudent}`,
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
