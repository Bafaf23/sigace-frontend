import axios from "axios";

/**
 * Obtiene las instituciones del sistema desde el backend Flask.
 * @param {string} SIG Codigo SIG del Colegio
 * @returns {Promise<Object>}
 */
export async function getSchoolBySIG(SIG) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/getSchoolBySIG/${SIG}`,
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
