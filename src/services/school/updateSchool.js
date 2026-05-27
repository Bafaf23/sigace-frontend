/**
 * Actualiza una institución en el sistema
 * @param {object} school - Institución a actualizar
 * @returns {Promise<object>} - Datos de la respuesta del servidor
 */
export async function updateSchool(school) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/updateSchool`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(school),
      },
    );
    if (!response.ok) {
      console.error("Error al actualizar la institución:", response.statusText);
      return {
        error: "Error al actualizar la institución: " + response.statusText,
      };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar la institución:", error);
    return { error: "Error al actualizar la institución: " + error.message };
  }
}
