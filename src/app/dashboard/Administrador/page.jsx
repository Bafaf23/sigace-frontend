"use client";
import Loading from "@/app/loading";
import Icon from "@/components/atom/Icon";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import {
  faBook,
  faFilePen,
  faUser,
  faUserTie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <main className="space-y-6 p-4">
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <InfoCard
            label="Total de estudiantes"
            value={user.user.total_students || 0}
            icon={faUser}
            colorClass="bg-green-500/60 text-green-500/90"
            description="Total de estudiantes inscritos en el sistema"
          />
          <InfoCard
            label="Total de secciones"
            value={user.user.total_sections || 0}
            icon={faBook}
            colorClass="bg-blue-500/60 text-blue-500/90"
            description="Total de secciones creadas en el sistema"
          />
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <InfoCard
              label="Total de docentes"
              value={user.user.total_teachers || 0}
              icon={faUserTie}
              colorClass="bg-purple-500/60 text-purple-500/90"
              description="Total de docentes inscritos en el sistema"
            />
          </div>
          <div className="col-span-2">
            <InfoCard
              label="Notas Cargadas"
              value={user.user.total_notes || 0}
              icon={faFilePen}
              colorClass="bg-yellow-500/60 text-yellow-500/90"
              description="Total de notas cargadas en el lapso actual"
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
