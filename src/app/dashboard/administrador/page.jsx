"use client";

import Loading from "@/app/loading";
import Banner from "@/components/atom/Banner";
import Icon from "@/components/atom/Icon";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { metricsAdmin } from "@/services/metrics/metricsSudo";
import {
  faBook,
  faFilePen,
  faUser,
  faUserTie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.user?.id_period) {
      if (!authLoading) setDataLoading(false);
      return;
    }

    const fetchDashboardMetrics = async () => {
      try {
        await metricsAdmin().then((data) => setMetrics(data));
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
    <section className="space-y-6">
      <HeaderDashbord user={user} nameI={`Bienvenido, ${user?.user.name}`} />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <InfoCard
          label="Total de estudiantes"
          value={metrics.students}
          icon={faUser}
          colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 backdrop-blur-md"
          description="Alumnos inscritos en el período"
        />

        <InfoCard
          label="Total de secciones"
          value={metrics.sections}
          icon={faBook}
          colorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md"
          description="Divisiones de aula activas"
        />

        <InfoCard
          label="Total de docentes"
          value={metrics.teachers}
          icon={faUserTie}
          colorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400 backdrop-blur-md"
          description="Personal docente registrado"
        />

        <InfoCard
          label="Pensum académico"
          value={metrics.subject}
          icon={faFilePen}
          colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 backdrop-blur-md"
          description="Asignaturas base cargadas"
        />

        <div className="col-span-2 md:col-span-4">
          <Banner
            title="La segurida es lo primero"
            icon={faCircleInfo}
            message="Garantisemos la seguridad no compartas tus credenciales con nadien."
          />
        </div>
      </section>
    </section>
  );
}
