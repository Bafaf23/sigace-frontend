import axios from "axios";

/**
 * Obtiene las actividades con las notas de cada materia del estudiante en la sección inscrito.
 * @param {number} id_student - ID del estudiante
 */

export async function getGrade(id_student) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/getSubjectSecction/student/${id_student}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error en el servicio HTTP getGrade:", error);
    return null; // Devolvemos null para que el catch de la vista sepa que la API falló
  }
}
