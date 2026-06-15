"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import FormAssignStudent from "../organism/FormAssignStudent";
import Modal from "../organism/Modal";
import ReporteImprimiblePorSeccion from "@/docs/ReporteImprimiblePorSeccion";
import {
  faUsers,
  faChalkboardUser,
  faUserPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { usePDF } from "@react-pdf/renderer";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function CardSecction({
  SIG,
  id,
  grade,
  identifier,
  teacher,
  current,
  max,
  availableStudents = [],
  period,
  id_section,
  students,
  sectionStudents,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFull = current >= max;

  // 1. Consolidamos la lista de estudiantes de forma segura
  const listaAlumnos = students || sectionStudents || [];

  // 2. Serializamos la lista a un string para tener una dependencia ultra estable
  const alumnosClave = JSON.stringify(listaAlumnos);

  // 3. MEMORIZAMOS EL DOCUMENTO COMPLETO: Esto es lo que evita el error de "changed size"
  const documentoPdf = useMemo(() => {
    // Si la data básica no ha cargado, devolvemos null para no romper el render inicial
    if (!grade || !identifier) return null;

    return (
      <ReporteImprimiblePorSeccion
        students={listaAlumnos}
        section={identifier}
        institution="U.E.N Juana de Escalona"
        year={grade}
        teacher={teacher || "No asignado"}
      />
    );
    // Solo se recalcula el objeto si cambia el string de los alumnos o la info de la sección
  }, [alumnosClave, grade, identifier, teacher]);

  // 4. Inicializamos el hook usePDF de forma limpia sin argumentos iniciales
  const [instance, updateInstance] = usePDF();

  // 5. Manejamos la actualización del blob de forma totalmente controlada
  useEffect(() => {
    if (!documentoPdf) return;

    updateInstance(documentoPdf);
  }, [documentoPdf, updateInstance]);

  // Auxiliar para saber si el botón de impresión debe estar activo o no
  const puedeDescargar =
    !instance.loading && instance.url && listaAlumnos.length > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
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

      <div className="space-y-4 p-4">
        {/* Info del Docente Guía */}
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

        {/* Capacidad y barra de progreso */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Icon icon={faUsers} /> Capacidad: {current}/{max}
            </span>
            <span>{max > 0 ? Math.round((current / max) * 100) : 0}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-indigo-500"}`}
              style={{ width: `${max > 0 ? (current / max) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer de Acciones */}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 p-3 md:justify-around dark:border-slate-800 dark:bg-slate-700">
        {/* Enlace de descarga interactivo */}
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/reports/sectionList/${SIG}/${id_section}`}
          download={`Lista_${grade}_${identifier}.pdf`}
          onClick={(e) => {
            if (!puedeDescargar) e.preventDefault();
          }}
          className={`flex items-center justify-center gap-2 p-2 px-3 rounded-lg text-sm font-medium text-white transition-all active:scale-95 ${
            !puedeDescargar
              ? "bg-slate-400 cursor-not-allowed opacity-70"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {instance.loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generando...</span>
            </>
          ) : listaAlumnos.length === 0 ? (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Sección vacía</span>
            </>
          ) : (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Ver lista</span>
            </>
          )}
        </Link>

        {/* Botón de inscripción */}
        {availableStudents.length > 0 && (
          <Button
            onClick={() => setIsOpen(true)}
            icon={faUserPlus}
            classNameBtn="text-slate-500 transition-colors hover:text-green-600 text-sm font-medium truncate dark:text-slate-200"
          >
            {"Inscribir alumno"}
          </Button>
        )}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
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
