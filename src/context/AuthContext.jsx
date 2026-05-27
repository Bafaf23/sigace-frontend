"use client";
import { login } from "@/services/auth/login";
import { logout } from "@/services/auth/logout";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const PUBLIC_ROUTES = ["/", "/register"];

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    if (!user && !isPublicRoute) {
      router.push("/");
    } else if (user && isPublicRoute) {
      router.push(`/dashboard/${user.user.role}`);
    }
  }, [loading, pathname, user]);

  /**
   * Funcion para iniciar sesión
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Object} - Datos del usuario
   */
  const handleLogin = async (formData) => {
    const data = await login(formData);

    if (data.error) {
      return { error: data.error };
    }

    setUser(data);
    sessionStorage.setItem("user", JSON.stringify(data));
    return data;
  };

  /**
   * Funcion para cerrar sesión
   * @returns {void}
   */
  const handleLogout = async () => {
    try {
      const result = await logout();

      sessionStorage.clear();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error en el flujo de logout:", error);
      sessionStorage.clear();
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
