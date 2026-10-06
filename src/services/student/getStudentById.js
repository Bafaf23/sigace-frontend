import axios from "axios";

/**
 * obtiene las imformacion de un estudante por ID
 * @param {number} id_student -id de estudienta
 * @param {string} tuitionNumber - matricula
 */

export async function getStudentByI(id_student, tuitionNumber) {
  try {
    let url;
    if (tuitionNumber) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/${tuitionNumber}`;
    }

    if (id_student) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/${id_student}`;
    }
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
