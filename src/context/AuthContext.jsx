"use client";
import { login } from "@/services/auth/login";
import { logout } from "@/services/auth/logout";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

// Opcional, por si quieres avisarle al usuario

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const PUBLIC_ROUTES = ["/", "/register"];
  const INACTIVITY_TIME = 15 * 60 * 1000; // 1 minuto en milisegundos

  // 1. Cargar usuario inicial desde sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. Sistema de Redirecciones (Guardianes de Rutas)
  useEffect(() => {
    if (loading) return;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!user && !isPublicRoute) {
      router.push("/");
    } else if (user && isPublicRoute) {
      // 🛡️ Safe navigation por si la estructura del objeto varía
      const userRole = user?.user?.role || user?.role;
      if (userRole) {
        router.push(`/dashboard/${userRole}`);
      }
    }
  }, [loading, pathname, user]);

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
      // Limpieza absoluta pase lo que pase con la petición de red
      if (timerRef.current) clearTimeout(timerRef.current);
      sessionStorage.clear();
      setUser(null);

      if (isAutomatic === true) {
        toast.error("Tu sesión ha expirado por inactividad.", {
          id: "inactivity-alert",
        });
      }

      router.push("/");
    }
  };

  // ⏱️ 3. Resetea el reloj y evalúa la inactividad
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      // Pasamos 'true' para avisarle a handleLogout que fue un cierre automático
      timerRef.current = setTimeout(() => handleLogout(true), INACTIVITY_TIME);
    }
  };

  // 🕵️‍♂️ 4. ¡EL BLOQUE FALTANTE! Escuchadores de actividad en el navegador
  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    if (user) {
      // Arranca el reloj apenas el usuario se loguea o refresca la página
      resetTimer();

      // Vincula los eventos para capturar clics, teclado o scroll en el liceo
      events.forEach((event) => window.addEventListener(event, resetTimer));
    }

    // 🧹 Cleanup: Remueve los listeners si el usuario se desloguea voluntariamente
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user]); // 🔄 Reacciona instantáneamente cada vez que el estado 'user' cambie

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
