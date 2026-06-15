import axios from "axios";

/**
 * Obtiene estudiantes de la sección que aún no tienen notas en el lapso activo.
 * @param {number} idLoadAcademic - ID de la carga académica
 * @param {number} idLapse - ID del lapso activo
 * @returns {Promise<Array|{error: string}>}
 */
export const getStudentsWithoutGrades = async (idLoadAcademic, idLapse) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/grades/students/${idLoadAcademic}`,
      { params: { id_lapse: idLapse } },
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message ||
        "Error al obtener los estudiantes sin notas",
    };
  }
};
