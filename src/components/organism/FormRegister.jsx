"use client";
import DataSchoolRegister from "../molecules/DataSchoolRegister";
import DataUserRegister from "../molecules/DataUserRegister";
import Button from "@/components/atom/Button";
import { patterns, validate } from "@/services/regex/regex";
import { createUser } from "@/services/user/createUser";
import { updateUser } from "@/services/user/updateUser";
import {
  faRightLong,
  faLeftLong,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormRegister({ user, mode, onSuccess, role }) {
  console.log("Rol actual:", role);
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    id: user?.id || "",
    typeDocuement: user?.typeDocuement || "V-",
    document: user?.document || "",
    name: user?.name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    SIG: user?.SIG || "",
    role_id: Number(3),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    if (!data.email) {
      setLoading(false);
      toast.error("Los campos no pueden estar vacíos");
      return;
    }

    if (!validate(patterns.email, data.email)) {
      setLoading(false);
      toast.error("El correo electrónico no es válido");
      return;
    }

    if (mode !== "edit") {
      if (!validate(patterns.dni, data.document)) {
        setLoading(false);
        toast.error("El número de documento no es válido");
        return;
      }
    }
    if (!validate(patterns.phone, data.phone)) {
      setLoading(false);
      toast.error("El teléfono no es válido");
      return;
    }

    let response;

    if (mode !== "edit") {
      response = await createUser(data);
    } else {
      response = await updateUser(data);
    }
    console.log(response);
    if (response.success === true) {
      toast.success(response.message);
      setLoading(false);
      onSuccess?.();
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        {/* PASO 1: Datos de usuario globales */}
        {passed === 1 && (
          <DataUserRegister
            data={data}
            manejoCambio={handleChange}
            mode={mode}
          />
        )}

        {/* PASO 2: Solo si es SuperAdmin y está en el paso 2 */}
        {passed === 2 && role === "SuperAdmin" && (
          <DataSchoolRegister
            data={data}
            manejoCambio={handleChange}
            mode={mode}
          />
        )}

        <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
          {/* Botón Anterior: solo se muestra si pasamos del paso 1 */}
          {passed === 1 ? (
            <div></div>
          ) : (
            <Button
              icon={faLeftLong}
              onClick={() => setPassed((p) => Math.max(1, p - 1))}
              classNameBtn="text-slate-400 hover:text-slate-600 font-medium"
            >
              Anterior
            </Button>
          )}

          {/* Gestión de botones Siguiente vs Registrar */}
          {passed === 1 && role === "SuperAdmin" ? (
            <Button
              icon={faRightLong}
              type="button" // Evita que dispare el submit del formulario antes de tiempo
              onClick={() => setPassed(2)}
              classNameBtn="rounded-lg bg-indigo-600 px-8 py-2 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 group flex items-center gap-3"
              classNameIcon="group-hover:translate-x-1 transition-transform duration-300"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              icon={faUserPlus}
              type="submit"
              disabled={loading}
              classNameBtn="rounded-lg bg-green-600 px-8 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 shadow-lg shadow-green-100"
            >
              {loading ? "Procesando..." : "Registrar"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
