"use client";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import ListSubjects from "@/components/molecules/ListSubjects";
import HeaderGestionMaterias from "@/components/organism/HeaderGestionMaterias";
import { getSubjects } from "@/services/subject/getSujects";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

export default function MateriasPage() {
  const [dataSubjects, setDataSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  /** @param {boolean} [silent] Si es true, actualiza la lista sin pantalla de carga completa. */
  const loadSubjects = useCallback((silent = false) => {
    if (!silent) setLoading(true);
    getSubjects()
      .then((data) => setDataSubjects(data))
      .finally(() => {
        if (!silent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  return (
    <div className="">
      <HeaderGestionMaterias onSubjectCreated={() => loadSubjects(true)} />
      <div className="p-4">
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 shadow-sm dark:border-blue-900/30 dark:bg-blue-950/20">
          <Icon
            icon={faInfoCircle}
            className="mt-0.5 text-xl text-blue-600 dark:text-blue-400"
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
              Información Institucional
            </h4>
            <p className="text-sm text-blue-700 leading-relaxed dark:text-blue-400">
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
