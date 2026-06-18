import axios from "axios";

/**
 * Crea una nueva inscripción
 * @param {object} formData - Los datos de la inscripción
 * @returns {Promise<object>} La inscripción creada
 */
export const createEnrollment = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/enrollments/create`,
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
    console.error(error);
    return { error: error.response.data.message };
  }
};
