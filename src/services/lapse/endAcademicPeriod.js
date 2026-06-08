import axios from "axios";

/**
 * End Academic Period
 * @param {string} SIG - The period to end
 * @param {string} token - The token to use
 * @returns {Promise<void>}
 */
export const endAcademicPeriod = async (SIG, token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/endAcademicPeriod/${SIG}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message ?? "Error al finalizar el periodo",
    };
  }
};
