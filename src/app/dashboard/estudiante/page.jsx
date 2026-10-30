"use client";

import Loading from "@/app/loading";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { getPeriodStudent } from "@/services/enrollment/getPeriodStudent";
import {
  faCalendarCheck,
  faLayerGroup,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function DashboardStudentPage() {
  const { user, loading: authLoading } = useAuth();

  const [sectionData, setSectionData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.user?.id) return;

    const fetchSection = async () => {
      try {
        setDataLoading(true);
        const result = await getPeriodStudent(user.user.id_student);
        const enrollmentActive = result.data.find((e) => e.status === "activo");
        setSectionData(enrollmentActive);
      } catch (error) {
        console.error("Error al obtener el grado/sección:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchSection();
  }, [user]);

  if (authLoading) return <Loading />;

  const role = user?.user?.role ?? user?.role;

  if (!user || role !== "estudiante") {
    return <AccessDenied />;
  }

  if (dataLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-500 h-full">
      <HeaderDashbord user={user} />

      <section className="p-3 grid md:grid-cols-2 gap-3">
        <InfoCard
          label="Año"
          value={sectionData?.section.year.name ?? "No asignado"}
          icon={faLayerGroup}
          colorClass="bg-orange-500/50 text-orange-600"
          description="Este es el año en el que estás cursando actualmente"
        />

        <InfoCard
          label="Sección"
          value={sectionData?.section.name ?? "N/A"} // Asumo que el servicio también traerá la sección dinámica
          icon={faChalkboardUser}
          colorClass="bg-green-500/50 text-green-600"
          description="Esta es la sección a la que perteneces"
        />

        <div className="col-span-2">
          <InfoCard
            label="Periodo Escolar"
            value={user?.user?.period ?? "No asignado"}
            icon={faCalendarCheck}
            colorClass="bg-cyan-500/50 text-cyan-600"
            description="Este es el periodo escolar en el que estás actualmente. (Un periodo es un año)"
          />
        </div>
      </section>
    </div>
  );
}
