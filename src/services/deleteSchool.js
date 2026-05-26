/**
 * Elimina una institución del sistema
 * @param {string} SIG - Codigo SIG unco para cada institución
 * @returns {Promise<{ ok: boolean, status?: number }>} - Resultado de la eliminación
 */

export async function deleteSchool(SIG) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/deleteSchool/${SIG}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(`Error en la API: ${response.status}`);
      return { ok: false, status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    return { ok: false };
  }
}
