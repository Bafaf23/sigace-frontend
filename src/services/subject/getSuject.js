import axios from "axios";

/**
 * Obtiene las materias del sistema desde el backend Flask.
 * @param {string} schoolId - Codigo SIG unco para cada institucion
 * @returns {Promise<Array<Object>>}
 */
export async function getSubjects(schoolId) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/get/${schoolId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error de conexión con el servidor Flask:", error);
    return [];
  }
}
