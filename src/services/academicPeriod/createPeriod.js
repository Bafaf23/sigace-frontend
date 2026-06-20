import axios from "axios";

/**
 * Crea un nuevo periodo academico
 * @param {string} SIG - The SIG to use
 * @param {object} formData - Objeto del formulario de inicio de periodo academico
 * @returns {Promise<Object>}
 */
export const createPeriod = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/createAcademicPeriod`,
      formData, 
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message ?? "Error al crear el periodo",
    };
  }
};
