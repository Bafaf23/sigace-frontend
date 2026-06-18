import axios from "axios";

/**
 * Actualiza una institución en el sistema
 * @param {object} school - Institución a actualizar
 * @returns {Promise<object>} - Datos de la respuesta del servidor
 */
export async function updateSchool(school) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/updateSchool`,
      school,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response) {
      console.error("Error al actualizar la institución:", response.statusText);
      return {
        error: "Error al actualizar la institución: " + response.statusText,
      };
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error al actualizar la institución:", error);
    return { error: "Error al actualizar la institución: " + error.message };
  }
}
