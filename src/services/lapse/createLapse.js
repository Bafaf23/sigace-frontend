import axios from "axios";

/**
 * Crea un nuevo lapso de forma individual
 * @param {string} SIG - Código SIG del año escolar
 * @param {object} formDataLapse - data del formulario crear Lapso
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const createLapse = async (formDataLapse) => {
  try {
    const requestBody = {
      nameLapse: formDataLapse.nameLapse,
      dateStart: formDataLapse.dateStart || formDataLapse.dateStard, // Soporta ambas variantes de tipeo
      dateEnd: formDataLapse.dateEnd,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/create`,
      requestBody,
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
      error: error.response?.data?.message ?? "Error al crear el lapso",
    };
  }
};
