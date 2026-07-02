import axios from "axios";

/**
 * Obtiene las materias pendientes de un estudiante
 * @returns {Promise<Array<Object>>}
 */
export async function getSubjectPending(id_student) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/getSubjectPending/${id_student}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error de conexión con el servidor Flask:", error);
    return [];
  }
}
