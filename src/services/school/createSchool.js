import axios from "axios";

/**
 * Funcion para crear una nueva institucion
 * @param {Object} school - Datos de la institucion
 * @returns {Object} - Datos de la respuesta del servidor
 */
export async function createSchool(school) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/schools`,
      school,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const schools = response.data;

    if (schools.error) {
      console.error("Error al crear la institucion:", data.error);
      return { error: school.error };
    }
    return schools;
  } catch (error) {
    console.error("Error al crear la institucion:", error);
    return { error: "Error al crear la institucion: " + error.message };
  }
}
