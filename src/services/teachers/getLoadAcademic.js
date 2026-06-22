import axios from "axios";

/**
 * Obtiene los cargos académicos de un profesor
 * @returns {Promise<object>} - La respuesta de la API
 */
export const getLoadAcademic = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/getLoadAcademicTeacher`,
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
        error.response?.data?.message ||
        "Error al obtener los cargos académicos",
    };
  }
};
