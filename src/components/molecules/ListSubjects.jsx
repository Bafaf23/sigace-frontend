"use client";

import Icon from "../atom/Icon";
import SubjectActions from "./SubjectActions";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const getSubjectKey = (subject, index) =>
  subject.id ??
  subject._id ??
  subject.code_subject ??
  `${subject.name ?? "subject"}-${subject.year_academic ?? "year"}-${index}`;

/**
 * Lista de materias del plantel.
 * Este componente llama a la tabla Subject de la BD
 *
 * @component
 * @returns {JSX.Element}
 */

export default function ListSubjects({ dataSubjects, onSubjectDeleted }) {
  if (!dataSubjects || dataSubjects?.length === 0) {
    return (
      <div className=" flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-slate-50/50 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
          <Icon
            icon={faBook}
            className="text-2xl text-slate-400 dark:text-zinc-500"
          />
        </div>
        <p className="text-base font-semibold text-slate-700 dark:text-zinc-300">
          No hay materias registradas
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
          Comienza agregando una materia en el formulario lateral.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-zinc-800/80 dark:bg-zinc-950/60">
              <th className="px-6 py-3.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase dark:text-zinc-400">
                Código
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase dark:text-zinc-400">
                Abreviatura
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase dark:text-zinc-400">
                Asignatura
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
            {dataSubjects?.map((subject, index) => (
              <tr
                key={getSubjectKey(subject, index)}
                className="group transition-colors hover:bg-slate-50/60 dark:hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 border border-cyan-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/40">
                    {subject.code_subject || "S/C"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200/60 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/60">
                    {subject.abbreviation || "S/C"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                    {subject.name}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-slate-400 dark:text-zinc-400">
                    {subject.area || "Formación General"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de la tabla */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950/40">
        <p className="text-[11px] font-medium text-slate-400 dark:text-zinc-400">
          Total de asignaturas:{" "}
          <span className="font-bold text-slate-600 dark:text-zinc-300">
            {dataSubjects?.length}
          </span>
        </p>
      </div>
    </div>
  );
}
