import axios from "axios";

/**
 * Crea una asignatura en el sistema
 * @param {Object} data - Datos de la asignatura
 * @returns {Promise<Object>} - Respuesta de la API
 */
export async function createSubject(data) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/create/`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la asignatura:", error);
    throw error;
  }
}
