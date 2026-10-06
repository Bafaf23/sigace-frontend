import axios from "axios";

/**
 * procesa la solicitud de consulta de notas
 * @param {string} tuitionNumber - ID del estudiante
 */

export async function consult({ tuitionNumber }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/students/consult`,
      { tuitionNumber },
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error en el servicio HTTP consult:", error);

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (error.response
        ? "El servidor no pudo procesar la consulta."
        : "No se pudo conectar con el servidor.");

    return { success: false, message };
  }
}
