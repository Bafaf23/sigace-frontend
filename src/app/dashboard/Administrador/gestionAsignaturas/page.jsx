/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Banner from "@/components/atom/Banner";
import SkeletonCard from "@/components/atom/SkeletonCard";
import ListSubjects from "@/components/molecules/ListSubjects";
import HeaderGestionMaterias from "@/components/organism/HeaderGestionMaterias";
import { getSubjects } from "@/services/subject/getSujects";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
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
    <div className="space-y-3">
      {/* Actualización silenciosa premium al crear materia */}
      <HeaderGestionMaterias onSubjectCreated={() => loadSubjects(true)} />
      {/* Banner Informativo con Estilo Premium Glassmorphism */}

      <Banner
        title="Sobre las asignaturas"
        icon={faInfo}
        message=" Las asignaturas registradas se asignarán automáticamente al Liceo  bajo tu gestión adminstrativa"
      />

      {/* Renderizado Condicional de Datos */}
      {loading ? (
        <SkeletonCard />
      ) : (
        <ListSubjects
          dataSubjects={dataSubjects}
          onSubjectDeleted={() => loadSubjects(true)}
        />
      )}
    </div>
  );
}
