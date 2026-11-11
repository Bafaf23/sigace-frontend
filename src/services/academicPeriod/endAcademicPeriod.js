import axios from "axios";

/**
 * End Academic Period
 * @returns {Promise<void>}
 */
export const endAcademicPeriod = async (id) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/end`,
      {},
      {
        withCredentials: true, // Envía la cookie 'auth_token' al backend
        headers: {
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
