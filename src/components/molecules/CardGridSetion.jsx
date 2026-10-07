import CardSecction from "../atom/CardSection";
import Icon from "../atom/Icon";
import { faBook } from "@fortawesome/free-solid-svg-icons";

/**
 * Grilla de secciones cargadas en el sistema.
 *
 * @component
 *
 * @param {object} props
 * @param {Array} props.dataSet - Arreglo de objetos de sección
 * @param {Array} props.availableStudents
 * @param {string|number} props.period
 * @param {Array} props.preinscriptionStudent
 * @returns {JSX.Element}
 */

export default function CardGridSetion({
  dataSet = [],
  availableStudents = [],
  period,
  preinscriptionStudent = [],
}) {
  // Validamos que dataSet exista y tenga elementos válidos
  const validDataSet = Array.isArray(dataSet) ? dataSet.filter(Boolean) : [];

  if (validDataSet.length === 0)
    return (
      <div>
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-zinc-500 dark:bg-zinc-800">
          <Icon
            icon={faBook}
            className="mb-4 text-4xl text-slate-300 dark:text-zinc-400"
          />
          <p className="text-lg font-medium text-slate-500 dark:text-zinc-400">
            No hay secciones creadas
          </p>
          <p className="text-sm text-slate-400 dark:text-zinc-500">
            Comienza agregando una materia en el formulario lateral.
          </p>
        </div>
      </div>
    );

  return (
    <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
      {validDataSet.map((section, index) => {
        const teacherName = section?.guide
          ? `${section.guide?.name || ""} ${section.guide?.last_name || ""}`.trim()
          : "No asignado";

        return (
          <CardSecction
            id={section?.id}
            key={section?.id || index}
            grade={section?.name}
            identifier={section?.nomenclature}
            teacher={teacherName}
            idTeacher={section?.guide?.document || null}
            current={section?.students?.length || 0}
            max={section?.capacity || 35}
            availableStudents={availableStudents}
            period={period}
            idYearSection={section?.year_id}
            id_section={section?.id}
            sectionStudents={section?.students || []}
            preinscriptionStudent={preinscriptionStudent}
          />
        );
      })}
    </div>
  );
}
