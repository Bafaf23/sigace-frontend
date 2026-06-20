import axios from "axios";

/**
 * Elimina una materia por id en el backend Flask.
 * @param {string|number} id
 * @returns {Promise<{ ok: boolean, status?: number }>}
 */
export async function deleteSubject(code_subject) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/deleteSub/${code_subject}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error(`Error al eliminar materia: ${response.status}`);
      return { ok: false, status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error de conexión al eliminar materia:", error);
    return { ok: false };
  }
}
