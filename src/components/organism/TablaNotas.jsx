import Button from "../atom/Button";
import Icon from "../atom/Icon";
import {
  faUser,
  faCheckCircle,
  faTimesCircle,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function TablaNotas({ data, students, notes, activities }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!data) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow animate-pulse">
        Cargando notas...
      </div>
    );
  }

  const name = data.name;
  const isActive =
    data.is_active === true || data.is_active === 1 || data.is_active === "1";
  const status = isActive ? "Activo" : "Inactivo";

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-900">
      {/* Cabecera de la Tarjeta */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-300">
            {name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ciclo Escolar - Primer Trimestre
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div
            className={`uppercase text-sm font-bold ${status === "Activo" ? "text-green-500" : "text-red-500"}`}
          >
            {status}
          </div>
          <Button
            classNameBtn={`hover:bg-gray-200 text-slate-600/40 p-2 rounded-md transition-transform duration-300 ${isOpen ? "" : "rotate-180"} dark:hover:bg-slate-600 dark:text-slate-500`}
            icon={faAngleDown}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Contenedor colapsable de la Tabla */}
      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Icon icon={faUser} className="mr-2" />
                  Estudiante
                </th>
                {activities.map((activity, index) => (
                  <th
                    className="px-4 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400"
                    key={index}
                  >
                    <span className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                      {activity.activity}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {activity.referent_teorical} ({activity.porcentage}%)
                    </span>
                  </th>
                ))}
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Definitiva
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Estatus
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                // 🔍 1. Buscamos el primer registro de este estudiante en las notas del lapso
                // para extraer el 'final_grade' que calculó el backend
                const notaDelAlumno = notes.find(
                  (n) => n.id_student === student.id,
                );

                // Si existe el registro, usamos su final_grade, si no, por defecto es 0.00
                const definitiva =
                  notaDelAlumno?.final_grade !== undefined &&
                  notaDelAlumno?.final_grade !== null
                    ? parseFloat(notaDelAlumno.final_grade).toFixed(2)
                    : "0.00";

                // ⚖️ 2. Validamos el estatus de aprobación (en escala de 20, >= 9.5 aprueba)
                const approved = parseFloat(definitiva) >= 9.5;

                return (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    {/* Nombre del Estudiante */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800 dark:text-slate-300">
                          {student.name} {student.last_name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {student.document || `C.I: ${student.id}`}
                        </span>
                      </div>
                    </td>

                    {/* Celdas de Evaluaciones Individuales */}
                    {activities.map((activity, aIndex) => {
                      const currentNote = notes.find(
                        (n) =>
                          n.id_student === student.id &&
                          n.id_evaluation === activity.id,
                      );

                      return (
                        <td
                          className="px-4 py-4 text-center text-slate-700 dark:text-slate-300 font-medium"
                          key={aIndex}
                        >
                          {currentNote &&
                          currentNote.grade !== null &&
                          currentNote.grade !== undefined
                            ? currentNote.grade
                            : "—"}
                        </td>
                      );
                    })}

                    {/* 🌟 3. Celda de la Nota Definitiva del Backend (¡Sin .map()!) */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-sm font-bold ${approved ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
                      >
                        {definitiva}
                      </span>
                    </td>

                    {/* Estatus Final */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          approved
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${approved ? "bg-green-600" : "bg-red-500"}`}
                        />
                        {approved ? "Aprobado" : "Reprobado"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
