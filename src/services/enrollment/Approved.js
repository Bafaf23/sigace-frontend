import axios from "axios";

/**
 ** Finaliza el proceso de promoción de los estudiantes
 */
export async function approved() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/enrollments/processStart`,
      {}, // 1. CORRECCIÓN: El segundo argumento es el BODY de la petición (enviamos objeto vacío)
      {
        // 2. CORRECCIÓN: El tercer argumento es la CONFIGURACIÓN (headers y credentials)
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error en la petición de aprobación:", error);

    // 3. CORRECCIÓN: Controlar si la respuesta del servidor existe para evitar caídas de la app
    const errorMessage =
      error.response?.data?.message || "Error de conexión con el servidor";
    return { success: false, message: errorMessage };
  }
}
