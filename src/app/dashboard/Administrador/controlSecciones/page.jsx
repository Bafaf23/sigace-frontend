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
import { useState, useEffect, useCallback } from "react";

export default function controlSecciones() {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const SIG = user?.user?.SIG;
  const authority = user?.user?.token;
  const period = user?.user?.id_period;

  console.log(sections);
  // 1. Obtener Estudiantes sin inscripción (Disponibles para asignar)
  const loadStudents = useCallback(() => {
    if (!SIG || !authority || !period) return;
    setLoading(true);
    getStudenNotEnrollment({ SIG, id_period: period })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) =>
        console.error("Error al cargar Estudiantes no inscritos:", err),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [SIG, authority, period]);

  // 2. Obtener Secciones emparejadas con sus respectivos estudiantes (Carga en Paralelo)
  const loadSections = useCallback(() => {
    if (!SIG || !authority || !period) return;
    setLoading(true);

    getSection(SIG, authority, period)
      .then(async (seccionesData) => {
        if (!Array.isArray(seccionesData)) return;

        // Mapeamos cada sección para buscar sus Estudiantes de base de datos simultáneamente
        const seccionesConEstudiantes = await Promise.all(
          seccionesData.map(async (seccion) => {
            try {
              // Ajusta los parámetros de getStudentSection según requiera tu servicio
              const EstudiantesDeLaSeccion = await getStudentSection(
                seccion.id,
                SIG,
              );

              return {
                ...seccion,
                sectionStudents: EstudiantesDeLaSeccion || [], // Data real inyectada para el PDF
                current: EstudiantesDeLaSeccion?.length || 0, // Sincroniza el contador en base a la Query SQL
              };
            } catch (error) {
              console.error(
                `Error cargando Estudiantes de la sección ${seccion.id}:`,
                error,
              );
              return { ...seccion, sectionStudents: [], current: 0 };
            }
          }),
        );

        setSections(seccionesConEstudiantes);
      })
      .catch((err) => console.error("Error al cargar secciones:", err))
      .finally(() => {
        setLoading(false);
      });
  }, [SIG, authority, period]);

  useEffect(() => {
    loadSections();
    loadStudents();
  }, [loadSections, loadStudents]);
  console.log(sections);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <HeaderDashbord titelPage={"control de Secciones"} />
        <div className="p-3 hidden md:block lg:block">
          <Button
            onClick={() => setIsopen(!isOpen)}
            icon={faPlus}
            classNameBtn={
              "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
          >
            {"Crear seccion"}
          </Button>
        </div>
      </div>

      <Modal
        title={"Crea una nueva seccion"}
        isOpen={isOpen}
        onClose={() => setIsopen(!isOpen)}
      >
        <FormSection
          onSuccess={() => {
            loadSections();
            setIsopen(false);
          }}
        />
      </Modal>

      <div className="p-3">
        <div className="flex items-center gap-2 bg-indigo-500/20 p-3 rounded-lg border border-indigo-500/30">
          <Icon icon={faInfoCircle} className="text-indigo-500 text-2xl" />
          <p className="text-sm font-medium text-indigo-500  dark:text-indigo-400">
            En este modulo puedes crear y gestionar las secciones de tu escuela.
            Tambien puedes inscribir a los Estudiantes a las secciones.
          </p>
        </div>
      </div>

      <div className="md:hidden lg:hidden p-3 w-full">
        <Button
          onClick={() => setIsopen(!isOpen)}
          icon={faPlus}
          classNameBtn={
            "bg-indigo-500 p-4 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 w-full"
          }
        >
          {"Crear seccion"}
        </Button>
      </div>

      {loading ? (
        <SkeletonCard />
      ) : (
        <CardGridSetion
          SIG={SIG}
          dataSet={sections}
          availableStudents={students}
          period={period}
        />
      )}
    </div>
  );
}
