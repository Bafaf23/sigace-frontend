import axios from "axios";

/**
 ** Obtiene una lista de los estudiates que complen con lo minimo para ser promovidos al año superior siguente.
 * @param {number} id_period - Id del periodo academico activo
 * @returns {object}
 */
export async function getApproved(id_period) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/enrollments/approved?id_period=${id_period}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.response.data.message };
  }
}
