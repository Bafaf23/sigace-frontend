import axios from "axios";

/**
 * Obtiene todas las secciones
 * @param {string} SIG - El SIG de la institución
 * @param {string} authority - La autorización del usuario
 * @returns {Promise<object>} Las secciones
 */
export async function getSection(SIG, authority) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sections/get/${SIG}`,
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
