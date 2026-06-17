import axios from "axios";

/**
 * Actualiza un estudiante en la base de datos.
 * @param {object} formData - Datos del estudiante.
 * @returns {Promise<object>} - Datos del estudiante actualizado.
 */
export async function updateStudent(formData) {
  try {
    const result = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/students/updateStudent`,
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
      message:
        error.response?.data?.message || "Error al actualizar el estudiante.",
    };
  }
}
