/**
 * Elimina una materia por id en el backend Flask.
 * @param {string|number} id
 * @returns {Promise<{ ok: boolean, status?: number }>}
 */
export async function deleteSubject(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(`Error al eliminar materia: ${response.status}`);
      return { ok: false, status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error de conexión al eliminar materia:", error);
    return { ok: false };
  }
}
