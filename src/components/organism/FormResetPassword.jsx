"use client";
import Button from "../atom/Button";
import InputPass from "../atom/InputPass";
import { useRouter } from "next/navigation";
import axios from "axios";
import { validate, patterns } from "@/services/regex/regex";
import Links from "../atom/Links";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // Para capturar el token
import toast from "react-hot-toast";

export default function FormResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    passwordConfir: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = searchParams.get("token");

    if (!token) {
      toast.error(
        "No se encontró un token válido. Por favor, solicita un nuevo enlace.",
      );
      return;
    }

    if (!validate(patterns.password, formData.password)) {
      toast.error("La contraseña no cumple con los requisitos mínimos.");
      return;
    }

    if (formData.pass !== formData.passConfir) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPass`,
        {
          token: token,
          password: formData.password,
        },
      );

      const data = await response.data;

      if (data.success === false) {
        toast.success(data.message);
        setLoading(false);
        return;
      } else {
        toast.success(data.message);
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-5 md:py-0 flex flex-col md:flex-row gap-6 items-center justify-center">
      {/* Columna Extra (ej. Panel de requisitos o ilustración) */}
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-3 font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-400">
          Requisitos de seguridad
        </h3>
        <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">1.</span>
            La contraseña debe ser alfanumérica (letras y números).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">2.</span>
            <span>
              Debe contener al menos un carácter especial permitido:{" "}
              <code className="rounded bg-indigo-50 px-1.5 py-0.5 font-bold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                @*#$%
              </code>
            </span>
          </li>
        </ul>
      </div>
      {/* Columna del Formulario */}
      <div className="w-full max-w-md">
        {/* Botón para volver al login */}
        <Links
          direction="/"
          className="group mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400"
          label={"Volver al inicio de sesión"}
          classNameIcon={"transition-transform group-hover:-translate-x-1 "}
          icon={faArrowLeft}
        />

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl shadow-indigo-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-indigo-600/20">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-black text-indigo-900 dark:text-indigo-600">
              SIGACE<span className="text-cyan-500">.</span>
            </h1>
            <p className="font-medium text-slate-500 dark:text-slate-300">
              Control de Estudios Inteligente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputPass
              label="Nueva Contraseña"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <InputPass
              label="Confirma tu Nueva Contraseña"
              name="passwordConfir"
              type="password"
              placeholder="********"
              value={formData.passwordConfir}
              onChange={handleChange}
              required
            />

            <Button
              classNameBtn="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
              icon={faKey}
              type="submit"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Restablecer"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
