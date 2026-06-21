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
import { useEffect, useState } from "react";
import {
  faBook,
  faFilePen,
  faUser,
  faUserTie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [section, setSection] = useState(null);
  useEffect(() => {
    if (!user?.user?.id_period) return;
    const fetchData = async () => {
      const [studentsData, teachersData, subjectData, sectionData] =
        await Promise.all([
          getStudents(),
          getTeachersAll(),
          getSubjects(),
          getSection(user?.user.id_period),
        ]);

      setStudent(studentsData.length);
      setTeachers(teachersData.length);
      setSubjects(
        subjectData.filter(
          (subject, index, self) =>
            self.findIndex((s) => s.name === subject.name) === index,
        ).length,
      );
      setSection(sectionData.length);
    };
    fetchData();
  }, [user]);

  if (loading) return <Loading />;

  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <main className="space-y-6 p-4">
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <InfoCard
            label="Total de estudiantes"
            value={student || 0}
            icon={faUser}
            colorClass="bg-green-500/60 text-green-500/90"
            description="Total de estudiantes inscritos"
          />
          <InfoCard
            label="Total de secciones"
            value={section || 0}
            icon={faBook}
            colorClass="bg-blue-500/60 text-blue-500/90"
            description="Total de secciones creadas"
          />
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <InfoCard
              label="Total de docentes"
              value={teachers || 0}
              icon={faUserTie}
              colorClass="bg-purple-500/60 text-purple-500/90"
              description="Total de docentes registrados"
            />
          </div>
          <div className="col-span-2">
            <InfoCard
              label="Total del pensum academico"
              value={subjects || 0}
              icon={faFilePen}
              colorClass="bg-yellow-500/60 text-yellow-500/90"
              description="Total de asignaturas"
            />
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 p-4 border border-slate-300 rounded-2xl bg-slate-50 dark:border-slate-700 dark:bg-slate-900 h-full border-dashed">
              <Icon
                icon={faCircleInfo}
                className="text-2xl text-slate-500 dark:text-slate-300"
              />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-300">
                Recuerda, la seguridad es primordial para la correcta gestión de
                la información.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
