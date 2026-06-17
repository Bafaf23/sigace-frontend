import axios from "axios";

/**
 * Obtiene el periodo académico activo de la institución.
 * @param {string} SIG - SIG de la institución
 * @returns {Promise<{ periodActive: object | null } | { error: string }>}
 */
export const getPeriod = async (SIG) => {
  if (!SIG) {
    return { periodActive: null };
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/getAcademicPeriods/${SIG}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { periodActive: response.data.periodActive ?? null };
  } catch (error) {
    const message = error.response?.data?.message;
    // Sin periodo activo: estado normal, no es error de red/servidor
    if (error.response?.status === 400) {
      return { periodActive: null };
    }
    return {
      error: message ?? "Error al obtener el periodo académico",
    };
  }
};
