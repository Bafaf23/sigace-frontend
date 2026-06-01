import axios from "axios";

/**
 * Crea un nuevo estudiante
 * @param {object} formData - Los datos del estudiante
 * @param {string} authority - La autorización del usuario
 * @returns {Promise<object>} El estudiante creado
 */
export async function createStudent(formData, authority) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/students/createStudent`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authority}`,
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
