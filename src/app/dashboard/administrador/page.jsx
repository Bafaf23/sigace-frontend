"use client";

import Loading from "@/app/loading";
import Banner from "@/components/atom/Banner";
import Icon from "@/components/atom/Icon";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { getSection } from "@/services/section/getSection";
import { getStudents } from "@/services/student/getStudents";
import { getSubjects } from "@/services/subject/getSujects";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import {
  faBook,
  faFilePen,
  faUser,
  faUserTie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, startTransition } from "react";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();

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
        const [teachersRes, subjectsRes, sectionsRes] = await Promise.all([
          getTeachersAll(),
          getSubjects(),
          getSection(),
        ]);

        const students = await getStudents();

        const studentsList = students?.data || [];
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

  if (
    !user ||
    user.user.role == "estudiantes" ||
    user.user.role == "profesores"
  )
    return <AccessDenied />;

  return (
    <>
      <HeaderDashbord user={user} />
      <section className="space-y-6 mt-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <InfoCard
            label="Total de estudiantes"
            value={studentCount}
            icon={faUser}
            colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 backdrop-blur-md"
            description="Alumnos inscritos en el período"
          />

          <InfoCard
            label="Total de secciones"
            value={sectionCount}
            icon={faBook}
            colorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md"
            description="Divisiones de aula activas"
          />

          <InfoCard
            label="Total de docentes"
            value={teachersCount}
            icon={faUserTie}
            colorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400 backdrop-blur-md"
            description="Personal docente registrado"
          />

          <InfoCard
            label="Pensum académico"
            value={subjectsCount}
            icon={faFilePen}
            colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 backdrop-blur-md"
            description="Asignaturas base cargadas"
          />

          <div className="col-span-2 md:col-span-4">
            <Banner
              titel="La segurida es lo primero"
              icon={faCircleInfo}
              message="Cada alteración de notas, lapsos o cargas
                académicas queda auditada en el expediente central de
                ScholPack"
            />
          </div>
        </section>
      </section>
    </>
  );
}
