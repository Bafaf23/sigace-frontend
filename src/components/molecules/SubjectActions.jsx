"use client";
import Button from "../atom/Button";
import { deleteSubject } from "@/services/subject/deleteSubject";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Grupo de acciones rápidas (Editar/Eliminar) para la entidad Materia.
 * Encapsula la lógica de cliente para interactuar con registros individuales.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.subject - Objeto de la materia (debe contener id y name).
 * @param {() => void} [props.onSubjectDeleted] - Se ejecuta tras eliminar con éxito.
 *
 * @returns {JSX.Element} Un contenedor flex con botones iconográficos estilizados.
 */

export default function SubjectActions({ subject, onSubjectDeleted }) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        icon={faTrash}
        classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
        onClick={async () => {
          const { ok } = await deleteSubject(subject.id);
          if (ok) onSubjectDeleted?.();
        }}
      />
    </div>
  );
}
