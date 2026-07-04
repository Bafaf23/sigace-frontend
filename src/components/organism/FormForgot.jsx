"use client";
import Button from "@/components/atom/Button";
import axios from "axios";
import Input from "@/components/atom/Input";
import Links from "@/components/atom/Links";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormForgot() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("El campo de correo electrónico es obligatorio");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
        { email: formData.email },
      );

      const data = await response.data;

      if (data.success === false) {
        toast.success(data.message);
        setLoading(false);
        return;
      } else {
        toast.success(data.message);
        setFormData({ email: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-5 md:py-0">
      {/* Botón para volver al login */}
      <Links
        direction="/"
        className="group mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400"
        label={"Volver al inicio de sesión"}
        classNameIcon={"transition-transform group-hover:-translate-x-1 "}
        icon={faArrowLeft}
      ></Links>

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
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Button
            classNameBtn="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
            icon={faKey}
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
          </Button>
        </form>
      </div>
    </div>
  );
}
