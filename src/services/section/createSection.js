import axios from "axios";

/**
 * Crea una nueva sección
 * @param {object} formData - Los datos de la sección
 * @param {string} authority - La autorización del usuario
 * @returns {Promise<object>} La sección creada
 */
export const createSection = async (formData, authority) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sections/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authority}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    const data = error.response?.data;
    return {
      success: false,
      error: data?.error ?? true,
      message:
        data?.message ??
        (typeof data?.error === "string" ? data.error : null) ??
        "Error al crear la sección",
    };
  }
};
