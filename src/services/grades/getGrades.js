import axios from "axios";

/**
 * Obtiene las calificaciones agrupadas por lapso de una carga académica.
 * @param {number} idLoadAcademic - ID de la carga académica
 * @returns {Promise<Array|{error: string}>}
 */
export const getGrades = async (idLoadAcademic) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/grades/getGrade/${idLoadAcademic}`,
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message || "Error al obtener las calificaciones",
    };
  }
};
