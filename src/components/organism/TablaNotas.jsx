"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import {
  faUser,
  faAngleDown,
  faInbox,
  faIndent,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// Componente para la celda individual de notas
function GradeInput({ initialGrade, onSave }) {
  const [grade, setGrade] = useState(initialGrade ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGrade(initialGrade ?? "");
  }, [initialGrade]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || (/^\d*\.?\d*$/.test(val) && Number(val) <= 20)) {
      setGrade(val);
    }
  };

  const handleBlur = async () => {
    const normalizedGrade = grade === "" ? null : Number(grade);
    const normalizedInitial =
      initialGrade === null || initialGrade === undefined
        ? null
        : Number(initialGrade);

    if (normalizedGrade === normalizedInitial) return;

    setIsSaving(true);
    try {
      await onSave(normalizedGrade);
    } catch (error) {
      console.error("Error guardando nota:", error);
      setGrade(initialGrade ?? "");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={grade}
      placeholder="—"
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      disabled={isSaving}
      className={`w-14 text-center py-1 px-2 border rounded-md transition-colors font-semibold outline-none text-sm
        ${
          isSaving
            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-400"
            : "dark:bg-zinc-900 text-zinc-800 dark:text-slate-300 border-slate-100 dark:border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }
      `}
    />
  );
}

export default function TablaNotas({
  data,
  students = [],
  notes = [],
  activities = [],
  onSaveGrade,
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!data) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow animate-pulse">
        Cargando notas...
      </div>
    );
  }

  const name = data.name;
  const isActive = data.is_active === true;
  const status = isActive ? "Activo" : "Inactivo";

  return (
    <div className="rounded-xl bg-white shadow dark:bg-zinc-900 border border-slate-100 dark:border-zinc-700 hidden md:block lg:block overflow-hidden">
      {/* Cabecera */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-200 tracking-tight">
            {name}
          </h2>
          <p className="text-sm text-slate-400 dark:text-zinc-400 font-normal">
            Ciclo Escolar Actual • Evaluaciones Planificadas
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span
            className={`uppercase text-xs font-black tracking-wider px-2.5 py-1 rounded-full ${
              status === "Activo"
                ? "bg-green-50 text-green-600 dark:bg-green-800/20 dark:text-green-400"
                : "bg-red-50 text-red-500 dark:bg-red-950/20 dark:text-red-400"
            }`}
          >
            {status}
          </span>

          <Button
            classNameBtn={`hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-400 dark:text-zinc-300 transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            } dark:hover:bg-slate-800 dark:text-slate-500`}
            icon={faAngleDown}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Tabla Colapsable */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-375 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="overflow-x-auto overflow-y-auto max-h-[67vh] scrollbar-thin pb-2">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="sticky top-0 z-10 border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-zinc-200">
                  <Icon icon={faIndent} className="mr-2" />
                  N°
                </th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-zinc-200">
                  <Icon icon={faIdCard} className="mr-2" />
                  Matrícula
                </th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-zinc-200">
                  <Icon icon={faUser} className="mr-2" />
                  Estudiante
                </th>
                {activities.map((activity, index) => (
                  <th
                    className="px-4 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400 min-w-30"
                    key={activity.id ?? index}
                  >
                    <span className="block text-slate-700 dark:text-zinc-200 truncate max-w-37.5 mx-auto">
                      {activity.activity}
                    </span>
                    <span className="block text-slate-500 dark:text-zinc-300 truncate max-w-37.5 mx-auto">
                      {activity.referent_teorical}
                    </span>
                    <span className="text-xs text-zinc-500 block font-normal mt-0.5">
                      {activity.porcentage}%
                    </span>
                  </th>
                ))}
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-600 dark:text-zinc-200 bg-slate-100/50 dark:bg-zinc-800/50">
                  Definitiva
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-500 dark:text-zinc-200">
                  Estatus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-700 dark:bg-zinc-800">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={activities.length + 5}
                    className="px-6 py-10 text-center text-slate-400 font-normal"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon
                        icon={faInbox}
                        className="block text-xl text-slate-300"
                      />
                      <p className="dark:text-zinc-200">
                        No hay estudiantes inscritos en esta sección.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student, index) => {
                  const tuitionNumber = student?.tuition_number;

                  // Cálculo ponderado acumulado en caliente
                  const acumulado = activities.reduce((acc, act) => {
                    const currentNote = notes.find(
                      (n) =>
                        n.tuition_number === tuitionNumber &&
                        n.evaluation_id === act.id,
                    );
                    const gradeVal = Number(currentNote?.grade ?? 0);
                    const weight = Number(act.porcentage ?? 0) / 100;
                    return acc + gradeVal * weight;
                  }, 0);

                  const definitivaNum = Math.round(acumulado);
                  const definitivaStr = acumulado.toFixed(2);
                  const approved = definitivaNum >= 10;

                  return (
                    <tr
                      key={tuitionNumber}
                      className="transition-colors hover:bg-slate-50/40 dark:hover:bg-zinc-700/20"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-500 dark:text-zinc-200">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-semibold text-cyan-600 dark:text-zinc-200">
                        {student.tuition_number}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700 dark:text-zinc-200">
                            {student.name} {student.last_name}
                          </span>
                          <span className="text-xs text-slate-400 font-normal mt-0.5 dark:text-zinc-500">
                            {student.id_card}
                          </span>
                        </div>
                      </td>

                      {/* Celdas de Evaluaciones */}
                      {activities.map((activity, aIndex) => {
                        const currentNote = notes.find(
                          (n) =>
                            n.tuition_number === tuitionNumber &&
                            n.evaluation_id === activity.id,
                        );

                        return (
                          <td
                            className="px-4 py-4 text-center font-bold"
                            key={activity.id ?? aIndex}
                          >
                            <GradeInput
                              initialGrade={currentNote?.grade}
                              onSave={async (newGrade) => {
                                if (onSaveGrade) {
                                  await onSaveGrade({
                                    tuition_number: student.tuition_number,
                                    id_evaluation: activity.id,
                                    grade: newGrade,
                                  });
                                }
                              }}
                            />
                          </td>
                        );
                      })}

                      {/* Nota Definitiva */}
                      <td className="px-6 py-4 text-center bg-slate-50/30 dark:bg-zinc-900/10">
                        <span
                          className={`text-sm font-black ${
                            approved
                              ? "text-emerald-600 dark:text-green-500"
                              : "text-red-500 dark:text-rose-500"
                          }`}
                          titel={`Nota acumulada exacta: ${definitivaStr}`}
                        >
                          {definitivaNum}
                        </span>
                      </td>

                      {/* Estatus Final */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            approved
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-800/20 dark:text-emerald-500"
                              : "bg-red-50 text-red-700 dark:bg-red-800/20 dark:text-red-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              approved ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                          {approved ? "Aprobado" : "Reprobado"}
                        </span>
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
