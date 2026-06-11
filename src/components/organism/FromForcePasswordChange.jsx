"use client";
import Button from "../atom/Button";
import Icon from "../atom/Icon";
import InputPass from "../atom/InputPass";
import Loading from "@/app/(auth)/force-password-change/loading";
import { changePassword } from "@/services/auth/changePassw";
import { validate, patterns } from "@/services/regex/regex";
import { faInfoCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function FromForcePasswordChange() {
  const router = useRouter();
  // 1. Iniciamos cargando en verdadero para evitar destellos del formulario
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Extraemos el ID considerando tu estructura de datos segura
      const userId = parsedUser?.user?.id_user;

      setFormData({
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsAuthenticated(true);
    } else {
      toast.error("No hay usuario en la sesión, por favor inicie sesión");
      router.push("/");
    }

    // Apagamos la carga una sola vez al terminar de comprobar
    setLoading(false);

    // 🚨 Arreglo de dependencias vacío para evitar el bucle infinito
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmNewPassword) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!validate(patterns.password, formData.newPassword)) {
      toast.error("La contraseña no cumple con los requisitos de seguridad");
      return;
    }

    try {
      setLoading(true);
      const data = await changePassword(formData);

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      toast.success("Contraseña cambiada correctamente");
      sessionStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado al cambiar la contraseña");
      setLoading(false);
    }
  };

  // Bloqueo de seguridad en renderizado
  if (loading || !isAuthenticated) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-md px-5 md:py-0">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl shadow-indigo-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-indigo-600/20">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-black text-indigo-900 dark:text-indigo-600 mb-2">
            Actualización Obligatoria
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Por seguridad, debes configurar tu contraseña definitiva para
            continuar.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <InputPass
              label="Nueva Contraseña"
              name="newPassword"
              onChange={handleChange}
              value={formData.newPassword}
              placeholder="••••••••"
            />
            <InputPass
              label="Confirmar Contraseña"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="flex p-4 rounded-xl border border-cyan-200 bg-cyan-50/50 dark:border-slate-800 dark:bg-slate-950/40">
            <ul className="text-cyan-700 dark:text-cyan-400 text-xs space-y-2">
              <li className="flex items-start gap-2">
                <Icon
                  icon={faInfoCircle}
                  className="text-cyan-600 text-base mt-0.5"
                />
                <p>
                  La contraseña debe tener al menos{" "}
                  <span className="font-bold">8 caracteres</span> y ser
                  alfanumérica.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon={faInfoCircle}
                  className="text-cyan-600 text-base mt-0.5"
                />
                <p>
                  Debe incluir una letra{" "}
                  <span className="font-bold">mayúscula</span>, una{" "}
                  <span className="font-bold">minúscula</span> y un carácter
                  especial{" "}
                  <strong className="font-mono text-cyan-800 dark:text-cyan-300">
                    (@$!%*?&amp;)
                  </strong>
                  .
                </p>
              </li>
            </ul>
          </div>

          <Button
            icon={faCheck}
            type="submit"
            classNameBtn="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
          >
            Cambiar Contraseña
          </Button>
        </form>
      </div>
    </div>
  );
}
