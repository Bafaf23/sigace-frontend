"use client";
import Icon from "../atom/Icon";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function AcademicRecord({ recordData = [] }) {
  // Manejamos un estado para saber qué año escolar está expandido (por defecto el primero)
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  if (!recordData || recordData.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl mt-3">
        <p className="text-sm font-medium text-slate-500">
          No hay antecedentes académicos registrados para este estudiante.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col gap-3 mt-3">
        {recordData.map((period, index) => {
          const isOpen = activeYearIndex === index;

          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200"
            >
              {/* BOTÓN O CABECERA DEL AÑO ESCOLAR */}
              <button
                onClick={() => setActiveYearIndex(isOpen ? -1 : index)}
                className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100/70 transition-colors text-left"
              >
                <div>
                  <span className="text-xs font-black text-cyan-600 uppercase tracking-wide">
                    {period.school_year}
                  </span>
                  <h3 className="text-sm font-bold text-slate-700 uppercase mt-0.5">
                    {period.year_level} —{" "}
                    <span className="text-slate-500">
                      Sección "{period.section}"
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {period.subjects?.length || 0} Materias
                  </span>
                  <Icon
                    icon={faChevronDown}
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* TABLA DE CALIFICACIONES (CONTENIDO COLAPSABLE) */}
              {isOpen && (
                <div className="border-t border-slate-100 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-500 uppercase text-sm font-black tracking-wider border-b border-slate-200">
                        <th className="p-3">Asignatura</th>
                        <th className="p-3 text-center">Monento 1</th>
                        <th className="p-3 text-center">Monento 2</th>
                        <th className="p-3 text-center">Monento 3</th>
                        <th className="p-3 text-center bg-cyan-50/40 text-cyan-800">
                          Definitiva
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {period.subjects &&
                        period.subjects.map((sub, sIdx) => {
                          const finalGrade = parseFloat(sub.final_grade || 0);
                          const isPassed = finalGrade >= 10; // Nota mínima aprobatoria en Venezuela

                          return (
                            <tr
                              key={sIdx}
                              className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors"
                            >
                              <td className="p-3 text-sm font-bold text-slate-700 uppercase">
                                {sub.subject_name}
                              </td>
                              <td className="p-3 text-sm text-center text-slate-600">
                                {sub.lap_1 !== null
                                  ? String(sub.lap_1).padStart(2, "0")
                                  : "—"}
                              </td>
                              <td className="p-3  text-sm text-center text-slate-600">
                                {sub.lap_2 !== null
                                  ? String(sub.lap_2).padStart(2, "0")
                                  : "—"}
                              </td>
                              <td className="p-3 text-sm text-center text-slate-600">
                                {sub.lap_3 !== null
                                  ? String(sub.lap_3).padStart(2, "0")
                                  : "—"}
                              </td>
                              <td className="p-3 text-center bg-cyan-50/20">
                                <span
                                  className={`text-sm font-black px-2 py-0.5 rounded ${
                                    isPassed
                                      ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                                      : "text-red-700 bg-red-50 border border-red-100"
                                  }`}
                                >
                                  {sub.final_grade !== null
                                    ? String(sub.final_grade).padStart(2, "0")
                                    : "—"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
