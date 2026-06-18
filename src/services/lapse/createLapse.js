import axios from "axios";

/**
 * Crea un nuevo lapso de forma individual
 * @param {string} SIG - Código SIG del año escolar
 * @param {object} formDataLapse - data del formulario crear Lapso
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const createLapse = async (SIG, formDataLapse) => {
  try {
    // BLINDAJE: Estructuramos el cuerpo de la petición explícitamente.
    // Esto asegura que al backend le lleguen las propiedades con el nombre exacto que espera.
    const requestBody = {
      nameLapse: formDataLapse.nameLapse,
      dateStart: formDataLapse.dateStart || formDataLapse.dateStard, // Soporta ambas variantes de tipeo
      dateEnd: formDataLapse.dateEnd,
    };

    console.log("✈️ Enviando payload al backend:", requestBody);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/lapses/create/${SIG}`,
      requestBody, // Enviamos el objeto verificado
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
      error: error.response?.data?.message ?? "Error al crear el lapso",
    };
  }
};
