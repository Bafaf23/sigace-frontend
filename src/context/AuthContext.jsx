/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { login } from "@/services/auth/login";
import { logout } from "@/services/auth/logout";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PUBLIC_ROUTES = ["/login", "/register"];
  const INACTIVITY_TIME = 15 * 60 * 1000;

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
      router.push("/login");
    } else if (user && isPublicRoute) {
      const userRole = user?.user?.role || user?.role;
      if (userRole) {
        router.push(`/dashboard/${userRole}`);
      }
    }
  }, [PUBLIC_ROUTES, loading, pathname, router, user]);

  /**
   * Función para iniciar sesión
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
   * Función para cerrar sesión (Modificada para alertar si es por inactividad)
   */
  const handleLogout = async (isAutomatic = false) => {
    try {
      await logout();
    } catch (error) {
      console.error("Error en el flujo de logout del servidor:", error);
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current);
      sessionStorage.clear();
      setUser(null);

      if (isAutomatic === true) {
        toast.error("Tu sesión ha expirado por inactividad.", {
          id: "inactivity-alert",
        });
      }
      router.push("/login");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      // Pasamos 'true' para avisarle a handleLogout que fue un cierre automático
      timerRef.current = setTimeout(() => handleLogout(true), INACTIVITY_TIME);
    }
  };

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    if (user) {
      resetTimer();
      events.forEach((event) => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer, user]);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
