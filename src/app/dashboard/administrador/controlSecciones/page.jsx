"use client";

import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import SkeletonCard from "@/components/atom/SkeletonCard";
import CardGridSetion from "@/components/molecules/CardGridSetion";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormSection from "@/components/organism/FormSection";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getSection } from "@/services/section/getSection";
import { getStudentSection } from "@/services/section/getStudentSection";
import { getPreinscription } from "@/services/student/getPreinscription";
import { getStudenNotEnrollment } from "@/services/student/getStudenNotEnrollment";
import { faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";

export default function ControlSecciones() {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const [sections, setSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsPre, setStudentsPre] = useState(null);

  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(true);

  // Extracción segura del periodo escolar activo
  const period = user?.user?.id_period || user?.id_period;

  // Sincronización estricta del lado del cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Carga de estudiantes no inscritos y preinscripciones
  const loadStudents = useCallback(async () => {
    if (!period) return;
    setStudentsLoading(true);

    try {
      const [notEnrolledRes, preinscriptionRes] = await Promise.allSettled([
        getStudenNotEnrollment({ id_period: period }),
        getPreinscription({ id_period: period }),
      ]);

      if (notEnrolledRes.status === "fulfilled") {
        const res = notEnrolledRes.value;
        const studentDataList = res?.data ?? res ?? [];
        setStudents(Array.isArray(studentDataList) ? studentDataList : []);
      } else {
        console.error(
          "❌ [SIGACE UI]: Error al cargar estudiantes no inscritos:",
          notEnrolledRes.reason,
        );
      }

      if (preinscriptionRes.status === "fulfilled") {
        const data = preinscriptionRes.value;
        const preList = data?.data ?? data ?? [];
        setStudentsPre(
          Array.isArray(preList) && preList.length > 0 ? preList[0] : null,
        );
      } else {
        console.error(
          "❌ [SIGACE UI]: Error al cargar preinscripción:",
          preinscriptionRes.reason,
        );
      }
    } finally {
      setStudentsLoading(false);
    }
  }, [period]);

  // Carga de secciones y estudiantes asignados
  const loadSections = useCallback(async () => {
    if (!period) return;
    setSectionsLoading(true);

    try {
      const res = await getSection();
      const seccionesData = res?.data ?? res ?? [];

      if (!Array.isArray(seccionesData)) {
        setSections([]);
        return;
      }

      const seccionesConEstudiantes = await Promise.all(
        seccionesData.map(async (seccion) => {
          try {
            const studentsRes = await getStudentSection(seccion.id);

            // Extraer la lista de estudiantes de forma segura
            const estudiantesDeLaSeccion = studentsRes.data.students;

            return {
              ...seccion,
              students: estudiantesDeLaSeccion, // Proporciona la propiedad 'students' que espera CardGridSetion
              current: estudiantesDeLaSeccion.length, // Se calcula dinámicamente según la cantidad real
            };
          } catch (error) {
            console.error(
              `❌ [SIGACE UI]: Error cargando estudiantes de sección ${seccion.id}:`,
              error,
            );
            return {
              ...seccion,
              students: [],
              current: 0,
            };
          }
        }),
      );

      startTransition(() => {
        setSections(seccionesConEstudiantes);
      });
    } catch (err) {
      console.error("❌ [SIGACE UI]: Error al obtener secciones:", err);
    } finally {
      setSectionsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    let active = true;

    if (isMounted && period) {
      const fetchData = async () => {
        if (active) {
          await Promise.all([loadSections(), loadStudents()]);
        }
      };
      fetchData();
    }

    return () => {
      active = false;
    };
  }, [isMounted, period, loadSections, loadStudents]);

  // Si no se ha completado la hidratación inicial del navegador, se renderiza la vista por defecto
  if (!isMounted) {
    return (
      <div className="p-3">
        <SkeletonCard />
      </div>
    );
  }

  const isGlobalLoading = sectionsLoading || studentsLoading;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
        <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
          Control de Secciones
        </h2>

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
            loadStudents();
            setIsOpen(false);
          }}
        />
      </Modal>

      <Banner
        icon={faInfo}
        title="Información de interés"
        message="En este módulo puedes crear y gestionar las secciones de tu institución, así como realizar el proceso de inscripción y asignación de los estudiantes."
      />

      <div className="md:hidden w-full">
        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-indigo-600 active:scale-95 transition-transform p-4 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full shadow-lg shadow-indigo-500/20"
        >
          Crear sección
        </Button>
      </div>

      {isGlobalLoading ? (
        <SkeletonCard />
      ) : (
        <CardGridSetion
          dataSet={sections}
          availableStudents={students}
          period={period}
          preinscriptionStudent={studentsPre}
        />
      )}
    </div>
  );
}
