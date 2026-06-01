import Button from "../atom/Button";
import Icon from "../atom/Icon";
import FormAssignStudent from "../organism/FormAssignStudent";
import Modal from "../organism/Modal";
import {
  faUsers,
  faChalkboardUser,
  faPenToSquare,
  faUserPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * Tarjeta de gestión de sección con indicadores de capacidad y acciones administrativas.
 * Incluye un modal integrado para la inscripción rápida de alumnos.
 *  @component
 * @param {Object} props
 * @param {string} props.id - ID único de la sección.
 * @param {string} props.grade - Año o grado (ej: "5to Año").
 * @param {string} props.identifier - Letra o nombre de la sección (ej: "A").
 * @param {string} [props.teacher] - Nombre del docente guía asignado.
 * @param {number} props.current - Cantidad actual de alumnos inscritos.
 * @param {number} props.max - Capacidad máxima de la sección.
 * @param {Array} props.availableStudents - Lista de alumnos sin sección para el formulario de inscripción.
 * @returns {JSX.Element}
 */

export default function CardSecction({
  id,
  grade,
  identifier,
  teacher,
  current,
  max,
  availableStudents,
  period,
  id_section,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFull = current >= max;
  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
      key={id}
    >
      {/* Encabezado: Año y Sección */}
      <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
        <h3 className="text-xl font-bold">
          {grade} "{identifier}"
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${isFull ? "bg-red-500" : "bg-green-500"}`}
        >
          {isFull ? "LLENO" : "DISPONIBLE"}
        </span>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="space-y-4 p-4">
        {/* Info del Guía */}
        <div className="flex items-center gap-3 text-slate-600">
          <Icon icon={faChalkboardUser} className="w-5 text-indigo-500" />
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-200">
              Docente Guía
            </p>
            <p className="text-sm font-medium dark:text-slate-300">
              {teacher || "No asignado"}
            </p>
          </div>
        </div>

        {/* Info de Capacidad (Barra de progreso estilo Retail) */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Icon icon={faUsers} /> Capacidad: {current}/{max}
            </span>
            <span>{Math.round((current / max) * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-indigo-500"}`}
              style={{ width: `${(current / max) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas (Footer) */}
      <div className="flex gap-2 border-t border-slate-100 bg-slate-50 p-3 md:justify-around dark:border-slate-800 dark:bg-slate-700">
        <Button
          icon={faPrint}
          classNameBtn="text-slate-500 dark:text-slate-200 transition-colors hover:text-indigo-600 truncate"
        >
          {"Ver lista de alumnos"}
        </Button>
        {availableStudents.length > 0 && (
          <Button
            onClick={() => setIsOpen(true)}
            icon={faUserPlus}
            classNameBtn="text-slate-500 transition-colors hover:text-green-600 truncate  dark:text-slate-200"
          >
            {"Inscribir en esta sección"}
          </Button>
        )}

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          title={"Inscribir Alumno en Sección"}
        >
          <FormAssignStudent
            students={availableStudents}
            period={period}
            id_section={id_section}
          />
        </Modal>
      </div>
    </div>
  );
}
