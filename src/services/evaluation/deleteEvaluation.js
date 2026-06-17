import axios from "axios";

/**
 * Elimina una evaluación de la base de datos.
 * @param {number} id - El ID de la evaluación a eliminar.
 * @returns {Promise<{object}>} - Una promesa que resuelve con el resultado de la eliminación.
 */
export const deleteEvaluation = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/evaluations/delete/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
