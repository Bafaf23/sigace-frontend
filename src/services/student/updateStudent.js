import axios from "axios";

/**
 * Actualiza un estudiante en la base de datos.
 * @param {object} formData - Datos del estudiante.
 * @param {string} authority - La autorización del usuario.
 * @returns {Promise<object>} - Datos del estudiante actualizado.
 */
export async function updateStudent(formData, authority) {
  try {
    const result = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/students/updateStudent`,
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
    return {
      success: false,
      message:
        error.response?.data?.message || "Error al actualizar el estudiante.",
    };
  }
}
