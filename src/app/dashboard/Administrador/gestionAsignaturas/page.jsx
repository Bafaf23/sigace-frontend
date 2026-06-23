/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import ListSubjects from "@/components/molecules/ListSubjects";
import HeaderGestionMaterias from "@/components/organism/HeaderGestionMaterias";
import { getSubjects } from "@/services/subject/getSujects";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState, startTransition } from "react";

export default function MateriasPage() {
  const [dataSubjects, setDataSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /** * Recupera las asignaturas registradas desde el servidor.
   * @param {boolean} [silent] Si es true, actualiza la lista en segundo plano.
   */
  const loadSubjects = useCallback((silent = false) => {
    if (!silent) setLoading(true);

    getSubjects()
      .then((res) => {
        // Axios + Interceptor: Si ya limpia el canal, 'res' es el array directo.
        // Si no, extraemos de forma defensiva con un fallback seguro.
        const subjectsList = res?.data ?? res ?? [];

        startTransition(() => {
          setDataSubjects(subjectsList);
        });
      })
      .catch((err) => {
        console.error(
          "❌ [SIGACE UI]: Error al procesar el listado de materias:",
          err,
        );
      })
      .finally(() => {
        if (!silent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Actualización silenciosa premium al crear materia */}
      <HeaderGestionMaterias onSubjectCreated={() => loadSubjects(true)} />

      {/* Banner Informativo con Estilo Premium Glassmorphism */}
      <div className="p-4">
        <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 backdrop-blur-md shadow-sm dark:border-blue-900/30 dark:bg-blue-950/20">
          <Icon
            icon={faInfoCircle}
            className="mt-0.5 text-xl text-blue-600 dark:text-blue-400 shrink-0"
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
              Información Institucional
            </h4>
            <p className="text-sm text-blue-700 leading-relaxed dark:text-blue-400/90">
              Las asignaturas registradas se asignarán automáticamente al{" "}
              <span className="font-semibold text-blue-900 dark:text-blue-200">
                Liceo
              </span>{" "}
              bajo tu gestión de{" "}
              <span className="font-semibold text-blue-900 dark:text-blue-200">
                Administrador
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Renderizado Condicional de Datos */}
      {loading ? (
        <div className="p-4">
          <SkeletonCard />
        </div>
      ) : (
        <ListSubjects
          dataSubjects={dataSubjects}
          onSubjectDeleted={() => loadSubjects(true)} // Borrado reactivo invisible sin parpadeos
        />
      )}
    </div>
  );
}
