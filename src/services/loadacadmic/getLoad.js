import axios from "axios";

/**
 * Obtiene todas las cargas académicas
 * @param {object} params - Parámetros de la consulta
 * @param {string} params.token - Token de autenticación
 * @param {string} params.SIG - SIG del colegio
 * @returns {Promise<object>} - Cargas académicas
 */
export const getLoad = async ({ SIG, token }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/loadAcademic/get/${SIG}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
