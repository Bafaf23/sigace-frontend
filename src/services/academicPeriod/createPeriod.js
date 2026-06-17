import axios from "axios";

/**
 * Crea un nuevo periodo academico
 * @param {string} SIG - The SIG to use
 * @param {object} formData - Objeto del formulario de inicio de periodo academico
 * @returns {Promise<Object>}
 */
export const createPeriod = async (SIG, formData) => {
  try {
    // CAMBIO: Se cambió .get por .post para que admita el body (formData)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/createAcademicPeriod/${SIG}`,
      formData, // Ahora Axios sí enviará esto en el req.body
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
