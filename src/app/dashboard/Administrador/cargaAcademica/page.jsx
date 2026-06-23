"use client";

import Button from "@/components/atom/Button";
import SkeletonCard from "@/components/atom/SkeletonCard";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import ListAcademicLoand from "@/components/molecules/ListAcademicLoand";
import FormAcadLoand from "@/components/organism/FormAcadLoand";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getLoad } from "@/services/loadacadmic/getLoad";
import { getSection } from "@/services/section/getSection";
import { getSubjects } from "@/services/subject/getSujects";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";

export default function CargaAcademicaPage() {
  const { user } = useAuth();
  const id_period = user?.user?.id_period;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados de catálogos e histórico
  const [academicLoads, setAcademicLoads] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sections, setSections] = useState([]);

  // Recarga silenciosa o completa de los catálogos institucionales
  const loadCatalogData = useCallback(
    (silent = false) => {
      if (!id_period) return;
      if (!silent) setLoading(true);

      Promise.all([
        getTeachersAll(),
        getSection(id_period),
        getSubjects(),
        getLoad(),
      ])
        .then(([teachersRes, sectionsRes, subjectsRes, loadRes]) => {
          // Axios + Interceptor: Si limpia el canal, extrae el array directo, sino aplica fallback defensivo
          const teachersList = teachersRes?.data ?? teachersRes ?? [];
          const sectionsList = sectionsRes?.data ?? sectionsRes ?? [];
          const subjectsList = subjectsRes?.data ?? subjectsRes ?? [];
          const loadList = loadRes?.data ?? loadRes ?? [];

          // Agrupación transicional de React 18 para evitar micro-congelamientos de UI
          startTransition(() => {
            setTeachers(teachersList);
            setSections(sectionsList);
            setSubjects(subjectsList);
            setAcademicLoads(loadList);
          });
        })
        .catch((error) => {
          console.error(
            "❌ [SIGACE UI]: Error crítico al compilar la matriz de carga académica:",
            error,
          );
        })
        .finally(() => {
          if (!silent) setLoading(false);
        });
    },
    [id_period],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCatalogData();
  }, [loadCatalogData]);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Encabezado Principal y Botón de Escritorio */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-1">
        <HeaderDashbord titelPage="Gestión de Carga Académica" />
        <div className="hidden md:block">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-600 hover:bg-indigo-700 transition-all p-2.5 rounded-xl text-slate-50 font-semibold cursor-pointer flex items-center gap-2 text-sm shadow-md shadow-indigo-500/10"
          >
            Asignar carga académica
          </Button>
        </div>
      </div>

      {/* Modal de Registro / Formulario Integrado */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nueva Asignación de Carga Académica"
      >
        <FormAcadLoand
          subjects={subjects}
          teachers={teachers}
          sections={sections}
          id_period={id_period}
          onSuccess={() => {
            loadCatalogData(true); // Refresco silencioso invisible en segundo plano tras guardar
            setIsOpen(false);
          }}
        />
      </Modal>

      {/* Botón Móvil con Ajuste UI Premium */}
      <div className="p-3 md:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-indigo-600 active:scale-95 transition-transform p-4 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full shadow-lg shadow-indigo-500/20"
        >
          Asignar carga académica
        </Button>
      </div>

      {/* Control del Estado de Carga (Skeleton vs Lista Estructurada) */}
      {loading ? (
        <div className="p-3">
          <SkeletonCard />
        </div>
      ) : (
        <ListAcademicLoand
          academicLoads={academicLoads}
          subjects={subjects}
          teachers={teachers}
          sections={sections}
          onRefresh={() => loadCatalogData(true)} // Callback opcional si la lista requiere refrescar al eliminar
        />
      )}
    </div>
  );
}
