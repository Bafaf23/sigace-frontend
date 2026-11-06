import axios from "axios";

/**
 * Crea un nuevo estudiante
 * @param {object} formData - Los datos del estudiante
 * @returns {Promise<object>} El estudiante creado
 */
export async function createStudent(formData) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Ocurrió un error al crear el estudiante.",
    };
  }
}

/**
 * Envia los datos del estudiante para inscripción en línea
 * @param {object} props
 * @param {object} formData - Los datos del estudiante
 * @returns {Promise<object>} El estudiante creado
 */
export async function incripOnline(formData) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/inscripOnline`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Ocurrió un error al crear el estudiante.",
    };
  }
}
