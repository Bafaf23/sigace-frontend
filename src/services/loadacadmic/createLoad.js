import axios from "axios";
/**
 * Crea una carga académica
 * @param {object} formData - Datos de la carga académica
 * @returns {Promise<object>} - Carga académica creada
 */
export const createLoad = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/loadAcademic/create`,
      formData,
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
