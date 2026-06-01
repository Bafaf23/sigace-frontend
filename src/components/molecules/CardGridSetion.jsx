import CardSecction from "../atom/CardSection";
import Icon from "../atom/Icon";
import { faBook } from "@fortawesome/free-solid-svg-icons";

/**
 * Grilla de secciones cargadas en el sistema.
 *
 * @componet
 *
 * @param {object} props
 * @param {object} props.dataSet - Objeto de la seccion
 * @param {Array} props.availableStudents
 * @returns {JSX.Element}
 */

export default function CardGridSetion({
  dataSet = [],
  availableStudents,
  period,
}) {
  if (!dataSet || dataSet.length === 0)
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
        <Icon
          icon={faBook}
          className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
        />
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
          No hay secciones creadas
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Comienza agregando una materia en el formulario lateral.
        </p>
      </div>
    );

  return (
    <div className="grid gap-5 p-3 md:grid-cols-1 lg:grid-cols-2">
      {dataSet.map((section) => {
        const teacherName = `${section.teacher_name} ${section.teacher_last_name}`;
        return (
          <CardSecction
            id={section.id}
            key={section.id}
            grade={section.year_name}
            identifier={section.name}
            teacher={teacherName}
            current={section.total_students || 0}
            max={section.capacity}
            availableStudents={availableStudents}
            period={period}
            id_section={section.id}
          />
        );
      })}
    </div>
  );
}
