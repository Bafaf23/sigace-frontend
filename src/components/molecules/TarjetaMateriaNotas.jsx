"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import {
  faBook,
  faAngleDown,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function TarjetaMateriaNotas({ subject }) {
  const [isOpen, setIsOpen] = useState(false);

  const evaluacionesMateria = subject.evaluations || [];
  const definitiva = parseFloat(subject.final_grade || 0).toFixed(2);
  const approved = parseFloat(definitiva) >= 9.5;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow border border-slate-100 dark:border-slate-800 dark:bg-slate-900 mb-4">
      {/* Cabecera Clickable */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer bg-slate-50/40 px-6 py-4 hover:bg-slate-50 transition-colors dark:bg-slate-800/40 dark:hover:bg-slate-800/80"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/40 dark:text-indigo-400">
            <Icon icon={faBook} />
          </div>
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-300">
              {subject.subject_name}
            </h3>
            <p className="text-xs font-mono text-slate-400">{subject.id}</p>
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
          <Button
            classNameBtn={`hover:bg-gray-200 text-slate-600/40 p-2 rounded-md transition-transform duration-300 ${isOpen ? "" : "rotate-180"} dark:hover:bg-slate-600 dark:text-slate-500`}
            icon={faAngleDown}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>

      {/* Tabla de Evaluaciones */}
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 border-t border-slate-100 dark:border-slate-800" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/60 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Icon icon={faClipboardList} className="mr-2" />
                  Evaluación / Actividad
                </th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Referente Teórico
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Porcentaje
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Nota (1-20)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {evaluacionesMateria.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-slate-400"
                  >
                    No hay evaluaciones asignadas para esta materia en este
                    lapso.
                  </td>
                </tr>
              ) : (
                evaluacionesMateria.map((activity) => {
                  // 🚀 LOGGER TEMPORAL: Mira la consola de tu navegador para inspeccionar este objeto
                  console.log("🔍 Estructura de activity en SIGACE:", activity);

                  // 🌟 AUTO-DETECCIÓN FLUIDA: Intentamos leer de 'grade' o de 'nota' por si acaso
                  const notaCruda =
                    activity.grade !== undefined
                      ? activity.grade
                      : activity.nota;

                  const notaFormateada =
                    notaCruda !== null && notaCruda !== undefined
                      ? parseFloat(notaCruda).toFixed(1)
                      : "—";

                  return (
                    <tr
                      key={activity.id}
                      className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block text-sm">
                          {activity.activity}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-500 dark:text-slate-400">
                        {activity.referent || "—"}
                      </td>
                      <td className="px-6 py-3.5 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                        {activity.porcentage}%
                      </td>
                      <td className="px-6 py-3.5 text-center font-bold text-sm text-slate-700 dark:text-slate-300">
                        {notaFormateada}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
