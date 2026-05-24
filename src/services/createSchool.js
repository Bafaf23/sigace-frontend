/**
 * Funcion para crear una nueva institucion
 * @param {Object} school - Datos de la institucion
 * @returns {Object} - Datos de la respuesta del servidor
 */
export async function createSchool(school) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/createSchool`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(school),
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.error("Error al crear la institucion:", data.error);
      return { error: data.error };
    }
    return data;
  } catch (error) {
    console.error("Error al crear la institucion:", error);
    return { error: "Error al crear la institucion: " + error.message };
  }
}
