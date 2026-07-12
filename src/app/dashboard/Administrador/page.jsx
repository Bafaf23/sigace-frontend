"use client";

import Loading from "@/app/loading";
import Icon from "@/components/atom/Icon";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { getStudents } from "@/services/student/getStudents";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import { getSubjects } from "@/services/subject/getSujects";
import { getSection } from "@/services/section/getSection";
import { useEffect, useState, startTransition } from "react";
import {
  faBook,
  faFilePen,
  faUser,
  faUserTie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();

  // Estados numéricos inicializados en cero para evitar saltos bruscos en el layout (CLS)
  const [studentCount, setStudentCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.user?.id_period) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!authLoading) setDataLoading(false);
      return;
    }

    const fetchDashboardMetrics = async () => {
      try {
        setDataLoading(true);

        // Despacho síncrono de promesas en el canal de red
        const [/* studentsRes */ teachersRes, subjectsRes, sectionsRes] =
          await Promise.all([
            /* getStudents(), */
            getTeachersAll(),
            getSubjects(),
            getSection(user.user.id_period),
          ]);
        const students = await getStudents();
        // Adaptación defensiva: lee .data si viene de la API unificada, o el array directo si el service lo mapea
        const studentsList = students?.data;
        const teachersList = teachersRes?.data;
        const subjectsList = subjectsRes?.data;
        const sectionsList = sectionsRes?.data;

        // Filtrado de asignaturas únicas por coincidencia de nombre estricta
        const uniqueSubjects = subjectsList.filter(
          (subject, index, self) =>
            self.findIndex((s) => s.name === subject.name) === index,
        );

        // Actualizaciones de estado agrupadas con React 18 Transition para mantener fluida la UI
        startTransition(() => {
          setStudentCount(studentsList.length);
          setTeachersCount(teachersList.length);
          setSectionCount(sectionsList.length);
          setSubjectsCount(uniqueSubjects.length);
        });
      } catch (error) {
        console.error(
          "❌ [SIGACE UI]: Error recuperando métricas del panel administrativo:",
          error,
        );
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, [user, authLoading]);

  if (authLoading || dataLoading) return <Loading />;

  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      <HeaderDashbord user={user} />

      <main className="space-y-6 p-4 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <InfoCard
            label="Total de estudiantes"
            value={studentCount}
            icon={faUser}
            colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md"
            description="Alumnos inscritos en el período"
          />

          <InfoCard
            label="Total de secciones"
            value={sectionCount}
            icon={faBook}
            colorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md"
            description="Divisiones de aula activas"
          />

          <InfoCard
            label="Total de docentes"
            value={teachersCount}
            icon={faUserTie}
            colorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 backdrop-blur-md"
            description="Personal docente registrado"
          />

          <InfoCard
            label="Pensum académico"
            value={subjectsCount}
            icon={faFilePen}
            colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md"
            description="Asignaturas base cargadas"
          />

          {/* Banner Informativo Minimalista con efecto de cristal de la suite premium */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mt-2">
            <div className="flex items-center gap-3 p-4 border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border-dashed">
              <Icon
                icon={faCircleInfo}
                className="text-xl text-slate-400 dark:text-slate-500 shrink-0"
              />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                Garantía de Resguardo: Cada alteración de notas, lapsos o cargas
                académicas queda auditada en el expediente central de{" "}
                <strong>SIGACE</strong>.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
