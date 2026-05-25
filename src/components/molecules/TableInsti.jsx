import Icon from "../atom/Icon";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faPhone,
  faIdCard,
  faTag,
  faSearch,
  faBuilding,
  faInfoCircle,
  faEllipsis,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { getSchools } from "@/services/getSchool";
import Button from "../atom/Button";
import Input from "../atom/Input";
import { useEffect, useState } from "react";
import { deleteSchool } from "@/services/deleteSchool";

export default function TableInsti() {
  const [instituciones, setInstituciones] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingSIG, setDeletingSIG] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSchools()
      .then((data) => {
        setInstituciones(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteSchool = async (SIG) => {
    setDeletingSIG(SIG);
    const { ok } = await deleteSchool(SIG);

    if (ok) {
      setInstituciones((currentInstituciones) =>
        currentInstituciones.filter((institucion) => institucion.SIG !== SIG),
      );
    }

    setDeletingSIG(null);
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
        Cargando instituciones
      </div>
    );
  }

  return (
    <div className="p-4">
      <section className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Buscar institucion por SIG"
            className="w-full"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="button"
            onClick={() => setSearch("")}
            icon={faSearch}
            classNameBtn="bg-cyan-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 h-full hover:bg-cyan-600 transition-colors"
          >
            Buscar
          </Button>
        </div>
      </section>

      <div className="mb-4 border border-amber-200 bg-amber-50 p-4 rounded-xl flex items-center gap-2">
        <Icon icon={faInfoCircle} className="text-amber-600 text-xl" />
        <p className="text-sm text-amber-600 leading-relaxed">
          Las instituciones de tipo <span className="font-bold">pública</span>{" "}
          tienen como razón social el nombre del{" "}
          <span className="font-bold text-amber-800">
            Ministerio del Poder Popular para la Educación
          </span>{" "}
          y el RIF del mismo.
        </p>
      </div>
      {/* lista de instituciones mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {instituciones.map((institucion) => (
          <div
            key={`card-${institucion.SIG}`}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Encabezado de la Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  SIG: {institucion.SIG}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {institucion.nombre}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${institucion.tipo === "pública" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
              >
                {institucion.tipo}
              </span>
            </div>

            {/* Detalles en filas */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Icon icon={faBuilding} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Razón Social
                  </span>
                  {institucion.razon_social}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faLocationDot} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Dirección
                  </span>
                  {institucion.direccion}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faPhone} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Contacto
                  </span>
                  <p>{institucion.telefono}</p>
                  <p className="text-xs text-slate-400">{institucion.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    {institucion.tipo === "pública" ? "Código DEA" : "RIF"}
                  </span>
                  <span className="font-mono font-semibold">
                    {institucion.tipo === "pública"
                      ? institucion.codigo_DEA
                      : institucion.rif}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Tabla de instituciones PC */}
      <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-900 hidden md:block">
        <table className={`w-full border-collapse text-left`}>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faCode} />
                SIG
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faInstitution} />
                Institución
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faBuilding} />
                Razón Social
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
                RIF / DEA
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                <Icon icon={faEllipsis} />
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {instituciones.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No hay instituciones cargadas.
                </td>
              </tr>
            ) : (
              instituciones.map((institucion) => {
                return (
                  <tr
                    key={institucion.SIG}
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
                    <td className="px-4 py-4 text-center text-slate-700 ">
                      {institucion.tipo === "pública"
                        ? "---"
                        : institucion.razon_social}
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
                        className={`rounded-full px-3 py-1 text-sm font-bold uppercase ${institucion.tipo === "pública" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {institucion.tipo}
                      </span>
                    </td>
                    {institucion.tipo === "pública" ? (
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
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          icon={faEdit}
                          classNameBtn="p-2 text-slate-400 transition-colors hover:text-indigo-600"
                        />
                        <Button
                          onClick={() => handleDeleteSchool(institucion.SIG)}
                          disabled={deletingSIG === institucion.SIG}
                          icon={faTrashAlt}
                          classNameBtn="p-2 text-slate-400 transition-colors hover:text-red-600"
                        />
                      </div>
                    </td>
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
