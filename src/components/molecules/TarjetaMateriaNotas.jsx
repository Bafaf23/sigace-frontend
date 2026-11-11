"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import {
  faBook,
  faCalendarPlus,
  faListCheck,
  faClock,
  faBlog,
  faPercent,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import TableInsti from "./TableInsti";
import { useState } from "react";

export default function TarjetaMateriaNotas({ subject }) {
  const [isOpen, setIsOpen] = useState(false);

  const evaluacionesMateria = subject.evaluations || [];
  const definitiva = subject.score;
  const approved = definitiva >= 10;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow border border-slate-100 dark:border-zinc-700 dark:bg-zinc-800 mt-3">
      {/* Cabecera Clickable */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer bg-slate-50/40 px-6 py-4 hover:bg-slate-50 transition-colors dark:bg-zinc-800/40 dark:hover:bg-zinc-700/80"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg dark:bg-orange-700/40 dark:text-orange-400">
            <Icon icon={faBook} />
          </div>
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-zinc-200">
              {subject.name || "Sin asignar"}
            </h3>
            <p className="text-xs text-zinc-400">
              {subject.code_subject || "sin asignar"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">
              Definitiva
            </span>
            <span
              className={`text-base font-black ${approved ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
            >
              {definitiva} pts
            </span>
          </div>
        </div>
      </div>

      {/* Tabla de Evaluaciones */}
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-250 opacity-100 border-t border-slate-100 dark:border-slate-800" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <TableInsti
          titelTable={[
            { name: "Actividad", icon: faListCheck },
            { name: "Tema", icon: faBlog },
            { name: "Porcentaje", icon: faPercent },
            { name: "Calificación", icon: faGraduationCap },
            { name: "Fecha de Carga", icon: faCalendarPlus },
            { name: "Ultima actualizacion", icon: faClock },
          ]}
          data={evaluacionesMateria}
          renderTableRows={(eva) => {
            const isApproved = (eva.grade ?? 0) >= 10;

            return (
              <tr
                key={eva.id}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800 group border-b border-slate-100 dark:border-zinc-800"
              >
                {/* Actividad */}
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-orange-400 transition-colors">
                    {eva.activity || "N/A"}
                  </span>
                </td>

                {/* Tema */}
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-600 dark:text-zinc-100">
                    {eva.referent_teorical || "N/A"}
                  </span>
                </td>

                {/* Porcentaje */}
                <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-zinc-100">
                  {eva.porcentage ? `${eva.porcentage}%` : "0%"}
                </td>

                {/* Calificación */}
                <td className="px-6 py-4 font-bold">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={eva.grade ?? 0}
                    onChange={(e) => onGradeChange?.(eva.id, e.target.value)}
                    className={`w-17 px-2 py-1 text-center rounded text-xs border border-transparent focus:border-cyan-500 focus:outline-none transition-colors ${
                      isApproved
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                    }`}
                  />
                </td>

                {/* Fecha de Carga */}
                <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-zinc-100">
                  {eva.created_at
                    ? new Date(eva.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>

                {/* Última Actualización */}
                <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-zinc-100">
                  {eva.updated_at
                    ? new Date(eva.updated_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>
              </tr>
            );
          }}
        />
      </div>
    </div>
  );
}
