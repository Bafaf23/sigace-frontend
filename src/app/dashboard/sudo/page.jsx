"use client";
import Loading from "@/app/loading";
import CardState from "@/components/atom/CardState";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { metricsSudo } from "@/services/metrics/metricsSudo";
import { useState, useEffect } from "react";

export default function sudoPage() {
  const { user, loading } = useAuth();
  const [dataMetric, seDataMetric] = useState();

  useEffect(() => {
    const fechData = async () => {
      const [userRes] = await Promise.all([metricsSudo()]);
      seDataMetric(userRes);
    };

    fechData();
  }, []);

  if (loading) return <Loading />;

  const role = user?.user?.role;

  if (!role || role !== "sudo") return <AccessDenied />;

  return (
    <div>
      <HeaderDashbord user={user} />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        <CardState
          title="Instituciones"
          info={dataMetric?.totalSchool}
          colorInfo="text-indigo-500"
          message="Total de instituciones activas en el sistema"
        />
        <CardState
          title="Usuarios"
          info={dataMetric?.totalUser}
          colorInfo="text-green-500"
          message="Total de usuarios activos en el sistema."
        />
        <CardState
          title="Servicios"
          info={dataMetric?.totalServices}
          colorInfo="text-orange-500"
          message="Total de servicios activos en el sistema."
        />
      </section>
    </div>
  );
}
