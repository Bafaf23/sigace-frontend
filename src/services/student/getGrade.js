import axios from "axios";

/**
 * Obtiene las actividades con las notas de cada materia del estudiante en la sección inscrito.
 * @param {number} id_section - ID de la sección del Estudiante
 * @param {number} id_student - ID del estudiante
 * @param {string} SIG - Código SIG de la institución
 */

export async function getGrade(id_student, SIG) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/getSubjectSecction/student/${id_student}/${SIG}`,
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error en el servicio HTTP getGrade:", error);
    return null; // Devolvemos null para que el catch de la vista sepa que la API falló
  }
}
