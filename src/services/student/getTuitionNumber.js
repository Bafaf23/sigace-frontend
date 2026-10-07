import axios from "axios";

/**
 ** Obtiene a un estudiante por matricula
 * @returns {Promise<Array>} - Un array de estudiantes
 */
export const getTuitionNumber = async (tuitionNumber) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students/${tuitionNumber}/tuitionNumber`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
