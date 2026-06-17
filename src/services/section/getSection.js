import axios from "axios";

/**
 ** Obtiene todas las secciones
 * @param {string} SIG - El SIG de la institución

 * @param {string} id_period id del perido academico
 * @returns {Promise<object>} Las secciones
 */
export async function getSection(SIG, id_period) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sections/get/${SIG}/${id_period}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
