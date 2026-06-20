import axios from "axios";

/**
 * Obtiene las instituciones del sistema desde el backend Flask.
 * @returns {Promise<Array<Object>>}
 */
export async function getSchools() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/getAllSchools`,
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

/**
 * Obtener los roles del backend
 * @returns {Promise<Array<Object>>}
 */
export async function getRoles() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/getRoles`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error de conexión con el servidor Flask:", error);
    return [];
  }
}
