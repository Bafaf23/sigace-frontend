"use client";

import CardLoand from "../atom/CardLoand";
import Icon from "../atom/Icon";
import {
  faLongArrowDown,
  faLayerGroup,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function ListAcademicLoand({ academicLoads = [] }) {
  const rawData = Array.isArray(academicLoads)
    ? academicLoads
    : Array.isArray(academicLoads?.data)
      ? academicLoads.data
      : [];

  if (rawData.length === 0) {
    return (
      <div className="p-3 mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
          <Icon
            icon={faLongArrowDown}
            className="text-2xl text-slate-400 dark:text-zinc-500"
          />
        </div>
        <p className="text-base font-semibold text-slate-700 dark:text-zinc-300">
          No hay cargas académicas registradas
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
          Comienza creando una nueva carga académica con el botón superior.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {rawData.map((group, groupIndex) => {
        const section = group?.section || {};
        const loads = Array.isArray(group?.academicLoad)
          ? group.academicLoad
          : [];

        return (
          <div
            key={section?.id || groupIndex}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Encabezado de la Sección / Año */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5 dark:border-zinc-800/80 dark:bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                  <Icon icon={faLayerGroup} className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100">
                      {section?.name || "Año no especificado"}
                    </h3>
                    <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 dark:border dark:border-orange-800/40">
                      Sección &quot;{section?.nomenclature || "-"}&quot;
                    </span>
                  </div>
                  {section?.period && (
                    <p className="text-xs font-medium text-slate-400 dark:text-zinc-400">
                      Período escolar: {section.period}
                    </p>
                  )}
                </div>
              </div>

              {/* Contador de Materias */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm border border-slate-200/80 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                <Icon
                  icon={faBookOpen}
                  className="text-orange-500 dark:text-orange-400"
                />
                <span>
                  {loads.length}{" "}
                  {loads.length === 1 ? "Asignatura" : "Asignaturas"}
                </span>
              </div>
            </div>

            {/* Grid de Cargas Académicas de la Sección */}
            <div className="p-5">
              {loads.length === 0 ? (
                <p className="py-4 text-center text-xs text-slate-400 dark:text-zinc-500">
                  Sin materias asignadas a esta sección.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {loads.map((loadItem) => (
                    <CardLoand
                      key={loadItem?.id_load_academic || loadItem?.id}
                      load={{
                        ...loadItem,
                        section: section,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
