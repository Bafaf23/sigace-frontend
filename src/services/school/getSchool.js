/**
 * Obtiene las instituciones del sistema desde el backend Flask.
 * @returns {Promise<Array<Object>>}
 */
export async function getSchools() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/getAllSchools`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then(async (res) => {
        if (!res.ok) {
          console.error(`Error en la API: ${res.status}`);
          return [];
        }
        const data = await res.json();
        return data;
      })
      .then((data) => {
        return Array.isArray(data) ? data : data.schools || [];
      });
    return response;
  } catch (error) {
    console.error("Error de conexión con el servidor Flask:", error);
    return [];
  }
}

/**
 * Obtener los roles del backend
 * @returns {Promise<Array<Object>>}
 */
export async function getRoles() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/getRoles`,
    );
  } catch (error) {
    console.error("Error de conexión con el servidor Flask:", error);
    return [];
  }
}
