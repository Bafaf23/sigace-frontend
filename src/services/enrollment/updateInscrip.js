import axios from "axios";

/**
 * Actualiza la pre-incripcion de un estudiante promovido
 * @param {object} formData - Los datos de la inscripción
 * @returns {Promise<object>} La inscripción creada
 */
export const updateInscrip = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/enrollments/updateInscrip`,
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
