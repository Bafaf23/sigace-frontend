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
 * @componet
 * @returns {JSX.Element}
 */

export default function ListSubjects({ dataSubjects, onSubjectDeleted }) {
  if (!dataSubjects || dataSubjects?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
        <Icon
          icon={faBook}
          className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
        />
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
          No hay materias registradas
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Comienza agregando una materia en el formulario lateral.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Código
                </th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Materia
                </th>
                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Año / Grado
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dataSubjects?.map((subject, index) => (
                <tr
                  key={getSubjectKey(subject, index)}
                  className="group transition-all hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-1 text-xs font-bold text-cyan-700 ring-1 ring-cyan-700/10 ring-inset dark:bg-cyan-400/10 dark:text-cyan-400">
                      {subject.code_subject || "S/C"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {subject.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {subject.area || "Formación General"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {subject.year_academic}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <SubjectActions
                        subject={subject}
                        onSubjectDeleted={onSubjectDeleted}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer de la tabla para paginación o info extra */}
          <div className="border-t border-slate-100 bg-slate-50/30 px-6 py-3 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[10px] text-slate-400">
              Mostrando {dataSubjects?.length} materias asignadas al periodo
              actual.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
