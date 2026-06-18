import axios from "axios";

/**
 * Obtiene las evaluaciones de un plan evaluativo
 *
 * @param {number} idLoadAcademic - El ID del plan evaluativo
 * @param {number} idLapse - ID del lapso en curso, es opcional en algunas peticiones
 * @returns {Promise<Object>} - La respuesta de la API
 */
export const getEvaluation = async (idLoadAcademic, idLapse) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/evaluations/get/${idLoadAcademic}`,
      idLapse != null ? { params: { id_lapse: idLapse } } : undefined,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message || "Error al obtener las evaluaciones",
    };
  }
};
