import axios from "axios";

/**
 * Llamada a todo los profesorres por intitucion
 *
 * @param {string} schoolId - codigo SIG unico para cada institucion
 * @param {number} id_period - codigo del period activo
 * @returns {Array<object>} - Lista de los prefesores.
 */
export async function getTeachersAll(SIG, id_period) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/get/${SIG}/${id_period}`,
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
