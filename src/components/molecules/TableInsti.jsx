import Icon from "../atom/Icon";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faPhone,
  faIdCard,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { getSchools } from "@/services/getSchool";
import { useEffect, useState } from "react";

export default function TableInsti() {
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getSchools().then((data) => {
      setInstituciones(data);
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
        Cargando instituciones
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-900">
        <table className={`w-full border-collapse text-left`}>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faCode} />
                Codigo SIG
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faInstitution} />
                Institución
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faLocationDot} />
                Dirección
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faPhone} />
                Contacto
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faTag} />
                Tipo
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faIdCard} />
                RIF / Codigo DEA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {instituciones.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No hay instituciones cargadas.
                </td>
              </tr>
            ) : (
              instituciones.map((institucion, index) => {
                return (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {institucion.SIG}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-700">
                      {institucion.nombre}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-700">
                      {institucion.direccion}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-700">
                      <span className="text-xs text-slate-400 block">
                        {institucion.telefono}
                      </span>
                      <span className="text-xs text-slate-400">
                        {institucion.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold uppercase ${institucion.tipo === "publico" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {institucion.tipo}
                      </span>
                    </td>
                    {institucion.tipo === "publico" ? (
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-bold">
                          {institucion.codigo_DEA}
                        </span>
                      </td>
                    ) : (
                      <td className="px-4 py-4 text-center">
                        {institucion.rif}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
