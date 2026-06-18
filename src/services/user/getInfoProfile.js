import axios from "axios";

/**
 ** Obtiene la informacion de perfil del usuario
 * @returns {Promise<object>}
 */
export async function getInfoProfile() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
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
