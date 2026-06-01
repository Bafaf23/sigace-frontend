"use client";
import Icon from "../atom/Icon";
import Button from "./Button";
import {
  faUserTie,
  faLayerGroup,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Tarjeta informativa para visualizar una carga académica individual.
 * Muestra la relación entre materia, profesor guía y sección asignada.
 *
 * @component
 * @param {object} props
 * @param {object} props.load - Objeto de carga académica mapeado desde la base de datos.
 * @returns {JSX.Element} Una tarjeta con cabecera de materia, detalles de asignación y botones de acción.
 */
export default function CardLoad({ load }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Cabecera: Código y Nombre de la Materia */}
      <div className="mb-4">
        <span className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">
          Código: {load.id_subject}
        </span>
        <h3 className="text-lg font-bold text-indigo-600 dark:text-slate-300 mt-0.5">
          {load.name_subject}
        </h3>
      </div>

      {/* Info: Profesor, Sección y Período */}
      <div className="mb-6 space-y-3">
        {/* Profesor */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Icon icon={faUserTie} className="text-slate-400 w-4" />
          <span>
            {load.name_teacher} {load.last_name_teacher}
          </span>
        </div>

        {/* Sección y Período Académico */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Icon icon={faLayerGroup} className="text-slate-400 w-4" />
            <p className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium dark:bg-slate-700 text-slate-800 dark:text-slate-200">
              Sección: <span className="font-bold">{load.name_section}</span>
            </p>
            <p className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium dark:bg-slate-700 text-slate-800 dark:text-slate-200">
              Año: <span className="font-bold">{load.name_year}</span>
            </p>
          </div>

          {/* Badge extra para el Período que viene en tu SQL */}
          {load.name_period && (
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              {load.name_period}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
