import axios from "axios";

/**
 * Llamada a todo los profesorres por intitucion
 * @returns {Array<object>} - Lista de los prefesores.
 */
export async function getTeachersAll() {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/get`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = result.data;
    return data;
  } catch (error) {
    console.error("Error de conexión con el servidor:", error);
    return [];
  }
}
