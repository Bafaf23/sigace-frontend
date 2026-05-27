/**
 * Obtiene los usuarios del sistema desde el backend
 * @returns {Promise<Array<Object>>}
 */

export async function getUsers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/getUser`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
}
