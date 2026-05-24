"use client";
import DataSchoolRegister from "../molecules/DataSchoolRegister";
import DataUserRegister from "../molecules/DataUserRegister";
import { StepIndicator } from "../molecules/StepIndicator";
import { patterns, validate } from "@/services/regex/regex";
import Button from "@/components/atom/Button";
import {
  faRightLong,
  faLeftLong,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormRegister() {
  const router = useRouter();
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);

  /**
   * Objeto data de usuarios par el registro de usuarios para el sistema con role por defecto teacher.
   *
   * @typedef {Object} dataUser
   * @property {string} typeDocuement
   * @property {string} document
   * @property {string} name
   * @property {string} lastName
   * @property {string} birthdate
   * @property {string} email
   * @property {string} phone
   * @property {string} password
   * @property {string} passwordConfir
   * @property {string} sig - Codigo unico dado por el sistema que identifica a la institucion.
   * @property {string} role - role del usuario (teacher, student, administrator). por defecto es teacher. En este registro solo se puede registrar un usuario de tipo teacher.
   */
  const [data, setData] = useState({
    typeDocuement: "",
    document: "",
    name: "",
    lastName: "",
    birthdate: "",
    email: "",
    phone: "",
    password: "",
    passwordConfir: "",
    sig: "",
    accepted: false,
    role: "teacher",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    /* validar los campos obligatorios */
    if (!data.email || !data.password) {
      setLoading(false);
      toast.error("Los campos no pueden estar vacios");
      return;
    }

    /* validar los campos del formulario */
    if (!validate(patterns.email, data.email)) {
      setLoading(false);
      toast.error("El correo electrónico no es válido");
      return;
    }
    if (!validate(patterns.password, data.password)) {
      setLoading(false);
      toast.error("La contraseña no es válida");
      return;
    }
    if (!validate(patterns.name, data.name)) {
      setLoading(false);
      toast.error("El nombre no es válido");
      return;
    }
    if (!validate(patterns.lastName, data.lastName)) {
      setLoading(false);
      toast.error("El apellido no es válido");
      return;
    }
    if (!validate(patterns.dni, data.document)) {
      setLoading(false);
      toast.error("El número de documento no es válido");
      return;
    }
    if (!validate(patterns.phone, data.phone)) {
      setLoading(false);
      toast.error("El teléfono no es válido");
      return;
    }

    if (!validate(patterns.sig, data.sig)) {
      setLoading(false);
      toast.error("El código SIG no es válido, debe tener el formato SIG0000");
      return;
    }

    if (data.password != data.passwordConfir) {
      setLoading(false);
      return toast.error("Las contrasenas no son iguales");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const resData = await response.json();
      if (response.ok) {
        toast.success("¡Registro completado en SIGACE!");
        router.push("/");
      } else {
        console.log("Error del backend:", resData.error);
        toast.error(resData.error);
      }
    } catch (error) {
      console.error("Error de red:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  console.log(data.accepted);

  return (
    <div className="w-full max-w-2xl p-3 md:p-0">
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow">
        <div className="mb-2 text-center">
          <h1 className="mb-1 text-3xl font-black text-indigo-900">
            SIGACE<span className="text-cyan-500">.</span>
          </h1>
          <p className="font-medium text-slate-500">
            Controle de Estudios Inteligente
          </p>
        </div>
        <StepIndicator currentStep={passed} totalSteps={2} mode={"user"} />
        <form onSubmit={handleSubmit} className="">
          {passed == 1 && (
            <DataUserRegister data={data} manejoCambio={handleChange} />
          )}

          {passed == 2 && (
            <DataSchoolRegister data={data} manejoCambio={handleChange} />
          )}

          <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
            {passed === 1 ? (
              <Link
                className="font-medium text-slate-400 hover:text-slate-600"
                href="/"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <Button
                icon={faLeftLong}
                onClick={() => setPassed((p) => Math.max(1, p - 1))}
                classNameBtn={`text-slate-400 hover:text-slate-600 font-medium`}
              >
                {"Anterior"}
              </Button>
            )}

            {passed < 2 ? (
              <Button
                icon={faRightLong}
                onClick={() => setPassed((p) => Math.min(2, p + 1))}
                classNameBtn="rounded-lg bg-indigo-600 px-8 py-2 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 group flex items-center gap-3"
                classNameIcon="group-hover:translate-x-1 transition-transform duration-300"
              >
                Siguiente
              </Button>
            ) : (
              <>
                <Button
                  icon={faUserPlus}
                  type="submit"
                  disabled={loading || !data.accepted}
                  classNameBtn="rounded-lg bg-green-600 px-8 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 shadow-lg shadow-green-100"
                >
                  {loading ? "Procesando..." : "Registrar"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
