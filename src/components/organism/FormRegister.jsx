"use client";
import DataSchoolRegister from "../molecules/DataSchoolRegister";
import DataUserRegister from "../molecules/DataUserRegister";
import { patterns, validate } from "@/services/regex/regex";
import Button from "@/components/atom/Button";
import {
  faRightLong,
  faLeftLong,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createUser } from "@/services/user/createUser";

export default function FormRegister() {
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
   * @property {string} email
   * @property {string} phone
   * @property {string} sig - Codigo unico dado por el sistema que identifica a la institucion.
   */
  const [data, setData] = useState({
    typeDocuement: "",
    document: "",
    name: "",
    last_name: "",
    email: "",
    phone: "",
    SIG: "",
    role_id: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    /* validar los campos obligatorios */
    if (!data.email) {
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

    if (!validate(patterns.sig, data.SIG)) {
      setLoading(false);
      toast.error("El código SIG no es válido, debe tener el formato SIG0000");
      return;
    }
    const response = await createUser(data);

    if (response.error) {
      setLoading(false);
      toast.error(response.error);
      return;
    } else {
      toast.success(response.message);
    }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        {passed == 1 && (
          <DataUserRegister data={data} manejoCambio={handleChange} />
        )}

        {passed == 2 && (
          <DataSchoolRegister data={data} manejoCambio={handleChange} />
        )}

        <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
          {passed === 1 ? (
            <div></div>
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
                disabled={loading}
                classNameBtn="rounded-lg bg-green-600 px-8 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 shadow-lg shadow-green-100"
              >
                {loading ? "Procesando..." : "Registrar"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
