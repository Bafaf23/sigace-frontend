import axios from "axios";

/**
 ** Obienen todos las periodos academicos recoridos de un estudiante en el colegio
 * @param {number} idStudent - id de estudiante
 */
export async function getPeriodStudent(idStudent) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/periodStudent/${idStudent}`,
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
