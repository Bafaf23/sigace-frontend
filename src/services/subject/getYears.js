import axios from "axios";

/**
 * Obtiene los años académicos disponibles para la asignatura.
 * @param {string} SIG - SIG de la institución.
 * @returns {Promise<Array<object>>} - Array de años académicos disponibles.
 */
export async function getYears() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/getYears`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}
