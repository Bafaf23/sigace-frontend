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

  const period = user?.user?.id_period;

  const loadStudents = useCallback(() => {
    if (!period) return;
    setLoading(true);
    getStudenNotEnrollment({ id_period: period })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) =>
        console.error("Error al cargar Estudiantes no inscritos:", err),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [period]);

  const loadSections = useCallback(() => {
    if (!period) return;
    setLoading(true);

    getSection(period)
      .then(async (seccionesData) => {
        if (!Array.isArray(seccionesData)) return;

        const seccionesConEstudiantes = await Promise.all(
          seccionesData.map(async (seccion) => {
            try {
              // Ajusta los parámetros de getStudentSection según requiera tu servicio
              const EstudiantesDeLaSeccion = await getStudentSection(
                seccion.id,
              );

              return {
                ...seccion,
                sectionStudents: EstudiantesDeLaSeccion || [],
                current: EstudiantesDeLaSeccion?.length || 0,
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
  }, [period]);

  useEffect(() => {
    loadSections();
    loadStudents();
  }, [loadSections, loadStudents]);

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
        <div className="flex items-start gap-3 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
          <Icon
            icon={faInfoCircle}
            className="text-indigo-500 text-xl mt-0.5 shrink-0"
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
          dataSet={sections}
          availableStudents={students.data}
          period={period}
        />
      )}
    </div>
  );
}
