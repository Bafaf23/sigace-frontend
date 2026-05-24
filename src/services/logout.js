"server action";
export async function logout() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (result.ok) {
      sessionStorage.clear();
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}
