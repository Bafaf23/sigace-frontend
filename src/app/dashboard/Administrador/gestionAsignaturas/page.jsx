"use client";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import ListSubjects from "@/components/molecules/ListSubjects";
import HeaderGestionMaterias from "@/components/organism/HeaderGestionMaterias";
import { useAuth } from "@/context/AuthContext";
import { getSubjects } from "@/services/subject/getSujects";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

export default function MateriasPage() {
  const { user } = useAuth();
  const [dataSubjects, setDataSubjects] = useState([]);
  const [loading, setLoading] = useState(false);


  /** @param {boolean} [silent] Si es true, actualiza la lista sin pantalla de carga completa. */
  const loadSubjects = useCallback(
    (silent = false) => {
      if (!silent) setLoading(true);
      getSubjects()
        .then((data) => setDataSubjects(data))
        .finally(() => {
          if (!silent) setLoading(false);
        });
    },
    [],
  );

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  return (
    <div className="">
      <HeaderGestionMaterias
        onSubjectCreated={() => loadSubjects(true)}
      />
      <div className="p-4">
        <div className="p-4 bg-cyan-400/10 border border-cyan-500 rounded-xl flex items-center gap-2">
          <Icon icon={faInfoCircle} className="text-cyan-600 text-xl" />
          <p className="text-md text-cyan-600">
            Las Asignaturas creadas se cargaran en el{" "}
            <span className="font-bold">Liceo</span> en el que eres {""}
            <span className="font-bold">administrador</span>.
          </p>
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
