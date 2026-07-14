"use client";
import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";
import InputPass from "@/components/atom/InputPass";
import Links from "@/components/atom/Links";
import VersionTag from "../atom/VersionTag";
import { login } from "@/services/auth/login";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FromLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    } else if (
      data.mustChangePassword === true ||
      data.mustChangePassword === 1
    ) {
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.loading("La contraseña debe ser cambiada");
      router.push("/force-password-change");
      toast.dismiss();
      toast.success("Por favor, cambie su contraseña");
    } else {
      sessionStorage.setItem("user", JSON.stringify(data));
      const role = data?.user?.role;

      toast.success("Inicio de sesión exitoso");
      router.push(`/dashboard/${role}`);
    }
    setLoading(false);
  };
  return (
    <div className="w-full max-w-md px-5 md:py-0">
      {/* Botón para volver */}
      <Links
        direction="/"
        className="group mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400"
        label={"Volver al inicio"}
        classNameIcon={"transition-transform group-hover:-translate-x-1 "}
        icon={faArrowLeft}
      ></Links>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl shadow-indigo-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-indigo-600/20">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-black text-indigo-900 dark:text-indigo-600">
            SIGACE<span className="text-cyan-500">.</span>
          </h1>
          <p className="font-medium text-slate-500 dark:text-slate-300">
            control de Estudios Inteligente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
          />

          <InputPass
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-end">
            <Links
              icon={faKey}
              direction="/resetpass"
              className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 text-center md:text-left gap-2"
              label={"¿Olvidaste tu contraseña?"}
            ></Links>
          </div>

          <Button
            classNameBtn="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
            icon={faKey}
            type="submit"
            disabled={loading}
            // eslint-disable-next-line react/no-children-prop
            children={loading ? "Verificando..." : "Iniciar Sesión"}
          ></Button>
        </form>

        <section className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          ¿No tienes acceso?,{" "}
          <Link
            href="https://wa.link/a6tg3m"
            className="text-indigo-600 dark:text-indigo-500"
          >
            {" "}
            <span className="cursor-pointer font-bold text-indigo-600 dark:text-indigo-500">
              Contacta al administrador
            </span>
          </Link>
          <div className="flex items-center justify-center mt-2">
            <VersionTag />
          </div>
        </section>
      </div>
    </div>
  );
}
