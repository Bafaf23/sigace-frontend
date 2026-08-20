import axios from "axios";

/**
 * Obtiene los usuarios del sistema desde el backend
 * @returns {Promise<Array<Object>>}
 */

export async function getUsers() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
}
