import axios from "axios";

/**
 * Crea un nuevo periodo academico
 * @param {string} SIG - The SIG to use
 * @param {string} token - The token to use
 * @returns {Promise<Object>}
 */
export const createPeriod = async (SIG, token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/createAcademicPeriod/${SIG}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message ?? "Error al crear el periodo" };
  }
};
