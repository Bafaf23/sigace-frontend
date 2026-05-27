
/**
 * Funcion para cambiar la contraseña del usuario
 * @param {Object} formData - Datos del formulario de cambio de contraseña
 * @returns {Object} - Datos de la respuesta del servidor
 */
export async function changePassword(formData) {
  console.log("formData", formData);
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/changePassword`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    console.log("data recuperada del servidor", data);
    return data;
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return { error: "Error al cambiar la contraseña: " + error.message };
  }
}
