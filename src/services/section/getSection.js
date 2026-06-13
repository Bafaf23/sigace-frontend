import axios from "axios";

/**
 ** Obtiene todas las secciones
 * @param {string} SIG - El SIG de la institución
 * @param {string} authority - La autorización del usuario
 * @param {string} id_period id del perido academico
 * @returns {Promise<object>} Las secciones
 */
export async function getSection(SIG, authority, id_period) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sections/get/${SIG}/${id_period}`,
      {
        headers: {
          Authorization: `Bearer ${authority}`,
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
