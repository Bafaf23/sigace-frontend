import axios from "axios";

/**
 * Obtiene los usuarios del sistema desde el backend
 * @returns {Promise<Array<Object>>}
 */
export async function getUsers({ page, search } = {}) {
  try {
    const parameters = new URLSearchParams();
    if (search) {
      parameters.append("search", search);
    }

    if (page) {
      parameters.append("page", page);
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/?${parameters.toString()}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error API (${error.response.status}):`,
        error.response.data,
      );
    } else {
      console.error("Error al obtener los usuarios:", error.message);
    }

    return [];
  }
}
