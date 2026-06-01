import axios from "axios";

/**
 * Llamada a todo los profesorres por intitucion
 *
 * @param {string} schoolId - codigo SIG unico para cada institucion
 * @param {string} authToken - token de autenticacion
 * @returns {Array<object>} - Lista de los prefesores.
 */
export async function getTeachersAll(SIG, authToken) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/get`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          SIG,
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
