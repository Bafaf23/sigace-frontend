import axios from "axios";

/**
 * Obtiene todas las cargas académicas
 * @returns {Promise<object>} - Cargas académicas
 */
export const getLoad = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/loadAcademic/get`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
