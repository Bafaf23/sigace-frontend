import axios from "axios";

/**
 * Obtiene las materias del sistema desde el backend Flask.
 * @returns {Promise<Array<Object>>}
 */
export async function getSubjects() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/get`,
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
