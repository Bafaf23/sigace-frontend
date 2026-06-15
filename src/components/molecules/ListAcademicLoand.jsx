"use client";
import Button from "../atom/Button";
import CardLoand from "../atom/CardLoand";
import Icon from "../atom/Icon";
import FormAcadLoand from "../organism/FormAcadLoand";
import Modal from "../organism/Modal";
import { faLongArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * Renderizado de carga academica del liceo, con formulario para crear carga academica.
 *
 * @componet
 * @param {object} props
 * @param {Array} props.subjects - Lista de mateiras.
 * @param {Array} props.teachers - Lista de profesores.
 * @param {Array} props.section - Lista de secciones.
 * @param {Array} props.academicLoads - Lista de de toda la carga academica.
 * @returns {JSX.Element}
 */

export default function ListAcademicLoand({
  academicLoads = [],
  subjects = [],
  teachers = [],
  sections = [],
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (academicLoads.length === 0) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
        <Icon
          icon={faLongArrowDown}
          className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
        />
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
          No hay carga academica registradas
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Comienza creadndo la carga academica en el boton de arriba.
        </p>
      </div>
    );
  }
  return (
    <div className="p-3">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {academicLoads.map((item) => (
          <CardLoand key={item.id} load={item} />
        ))}
      </div>
    </div>
  );
}
