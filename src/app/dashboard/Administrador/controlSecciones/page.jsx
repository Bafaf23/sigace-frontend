"use client";

import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import CardGridSetion from "@/components/molecules/CardGridSetion";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormSection from "@/components/organism/FormSection";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getSection } from "@/services/section/getSection";
import { getStudenNotEnrollment } from "@/services/student/getStudenNotEnrollment";
import { getStudentSection } from "@/services/student/getStudentSection";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";

// Corregido: Inicial con mayúscula para cumplir con la especificación de componentes React
export default function ControlSecciones() {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const period = user?.user?.id_period;

  // Recupera los estudiantes que aún no pertenecen a ninguna sección
  const loadStudents = useCallback(() => {
    if (!period) return;
    setStudentsLoading(true);

    getStudenNotEnrollment({ id_period: period })
      .then((res) => {
        // Validación defensiva: Extrae .data si viene estructurado, o el array fallback
        const studentDataList = res?.data ?? res ?? [];
        setStudents(studentDataList);
      })
      .catch((err) =>
        console.error(
          "❌ [SIGACE UI]: Error al cargar estudiantes no inscritos:",
          err,
        ),
      )
      .finally(() => setStudentsLoading(false));
  }, [period]);

  // Recupera las secciones y anida concurrentemente sus listas de alumnos
  const loadSections = useCallback(() => {
    if (!period) return;
    setSectionsLoading(true);

    getSection(period)
      .then(async (res) => {
        const seccionesData = res?.data ?? res ?? [];
        if (!Array.isArray(seccionesData)) return;

        const seccionesConEstudiantes = await Promise.all(
          seccionesData.map(async (seccion) => {
            try {
              const studentsRes = await getStudentSection(seccion.id);
              const estudiantesDeLaSeccion =
                studentsRes?.data ?? studentsRes ?? [];

              return {
                ...seccion,
                sectionStudents: estudiantesDeLaSeccion,
                current: estudiantesDeLaSeccion.length,
              };
            } catch (error) {
              console.error(
                `❌ [SIGACE UI]: Error cargando estudiantes de sección ${seccion.id}:`,
                error,
              );
              return { ...seccion, sectionStudents: [], current: 0 };
            }
          }),
        );

        startTransition(() => {
          setSections(seccionesConEstudiantes);
        });
      })
      .catch((err) =>
        console.error("❌ [SIGACE UI]: Error al cargar secciones:", err),
      )
      .finally(() => setSectionsLoading(false));
  }, [period]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSections();
    loadStudents();
  }, [loadSections, loadStudents]);

  // La UI muestra el Skeleton solo si las secciones principales siguen pendientes de red
  const isGlobalLoading = sectionsLoading;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
        <HeaderDashbord titelPage={"Control de Secciones"} />
        <div className="p-3 hidden md:block">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-600 hover:bg-indigo-700 transition-all p-2.5 rounded-xl text-slate-50 font-semibold cursor-pointer flex items-center gap-2 text-sm shadow-md shadow-indigo-500/10"
          >
            Crear sección
          </Button>
        </div>
      </div>

      <Modal
        title="Crea una nueva sección"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormSection
          onSuccess={() => {
            loadSections();
            setIsOpen(false);
          }}
        />
      </Modal>

      {/* Banner Informativo con Estilo Premium Glassmorphism */}
      <div className="p-3">
        <div className="flex items-start gap-3 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-md">
          <Icon
            icon={faInfoCircle}
            className="text-indigo-600 dark:text-indigo-400 text-xl mt-0.5 shrink-0"
          />
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              En este módulo puedes{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                crear y gestionar
              </span>{" "}
              las secciones de tu institución, así como realizar el proceso de{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                inscripción y asignación
              </span>{" "}
              de los estudiantes.
            </p>
          </div>
        </div>
      </div>

      {/* Botón de acción para entornos Mobile */}
      <div className="md:hidden p-3 w-full">
        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-indigo-600 active:scale-95 transition-transform p-4 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full shadow-lg shadow-indigo-500/20"
        >
          Crear sección
        </Button>
      </div>

      {/* Renderizado Condicional Seguro */}
      {isGlobalLoading ? (
        <div className="p-3">
          <SkeletonCard />
        </div>
      ) : (
        <CardGridSetion
          dataSet={sections}
          availableStudents={students}
          period={period}
        />
      )}
    </div>
  );
}
