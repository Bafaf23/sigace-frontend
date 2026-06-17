import axios from "axios";

/**
 * Todo: icluir header con token para validacion del back
 * obtiene las imformacion de un estudante por ID
 * @param {number} id_student -id de estudienta
 */

export async function getStudentByI(id_student) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/getStudentByID/${id_student}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
