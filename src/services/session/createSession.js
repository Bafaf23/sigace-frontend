import axios from "axios";

/**
 * Funcion para crear una nueva sesion en la base de datos
 */

export const createSession = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions/create`,
    data,
  );
  return response.data;
};
