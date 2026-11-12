"use client";
import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";
import InputPass from "@/components/atom/InputPass";
import Links from "@/components/atom/Links";
import { useRemember } from "@/context/RememberContext";
import { login } from "@/services/auth/login";
import {
  faArrowAltCircleDown,
  faKey,
  faarrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function FromLogin({ schoolName }) {
  const { rememberUser, hasRememberedUser, forgetUser } = useRemember();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (hasRememberedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        email: rememberUser.email,
        rememberMe: true,
      }));
    }
  }, [hasRememberedUser, rememberUser]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email) {
      toast.error("Los campos no pueden estar vacios");
      setLoading(false);
      return;
    }

    const data = await login(formData);

    if (data.error) {
      toast.error(data.error);
      setLoading(false);
      return;
    } else if (data.mustChangePassword === true) {
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.loading("La contraseña debe ser cambiada");
      router.push("/force-password-change");
      toast.dismiss();
    } else {
      if (formData.rememberMe) {
        const dataUser = {
          name: data?.user?.name,
          email: formData.email,
        };
        localStorage.setItem("rememberedUser", JSON.stringify(dataUser));
      }
      sessionStorage.setItem("user", JSON.stringify(data));
      const role = data?.user?.role;

      toast.success("Inicio de sesión exitoso");

      if (role === "director" || role === "gestion" || role === "subdirector") {
        router.push(`/dashboard/administrador`);
      } else {
        router.push(`/dashboard/${role}`);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10">
        <div className="font-bold text-slate-800 dark:text-zinc-400 uppercase text-center">
          {schoolName ? schoolName : "Sistema adminstrativo sudo"}
        </div>
        {hasRememberedUser ? (
          <h1 className="mb-2 text-2xl uppercase font-extrabold text-zinc-900 ">
            <span className="capitalize text-slate-700 dark:text-zinc-100">
              {hasRememberedUser ? rememberUser.name : ""}
            </span>
          </h1>
        ) : (
          <h1 className="mb-2 text-2xl text-center font-extrabold uppercase text-zinc-900 dark:text-white">
            Inicia sesion en tu cuenta
          </h1>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {hasRememberedUser ? (
          <InputPass
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        ) : (
          <div className="space-y-5">
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-zinc-100"
            />

            <InputPass
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-zinc-100"
            />
          </div>
        )}
        <div className="flex justify-between mt-8 items-center">
          {hasRememberedUser ? (
            <Button
              classNameBtn="text-sm text-orange-400 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 cursor-pointer"
              onClick={forgetUser}
              icon={faArrowAltCircleDown}
            >
              {"Cambiar de Cuenta"}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-orange-600 focus:ring-orange-500 cursor-pointer bg-white dark:bg-zinc-800"
                />
                <label
                  htmlFor="remember"
                  className="text-slate-600 dark:text-zinc-300 cursor-pointer select-none font-medium"
                >
                  Recordarme
                </label>
              </div>
            </>
          )}

          <Links
            icon={faKey}
            direction="/resetpass"
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 text-center md:text-left gap-2"
            label={"¿Olvidaste tu contraseña?"}
          ></Links>
        </div>
        <Button
          classNameBtn=" bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white py-4 w-full flex justify-center items-center gap-2 shadow-md dark:shadow-none"
          icon={faKey}
          type="submit"
          disabled={loading}
        >
          {loading ? "Verificando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
}
