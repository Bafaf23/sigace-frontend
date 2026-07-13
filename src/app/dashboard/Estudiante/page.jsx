"use client";

import Loading from "@/app/loading";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { getGrade } from "@/services/student/getGrade";
import {
  faCalendarCheck,
  faLayerGroup,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function DashboardStudentPage() {
  // Nota: Asegúrate de si tu contexto exporta 'loadingU' o 'loading'. Usaré 'loading' por consistencia.
  const { user, loading: authLoading } = useAuth();

  const [sectionData, setSectionData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.user?.id) return;

    const fetchSection = async () => {
      try {
        setDataLoading(true);
        const result = await getGrade(user.user.id_user);
        setSectionData(result.data);
      } catch (error) {
        console.error("Error al obtener el grado/sección:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchSection();
  }, [user]);

  // Primero esperamos a que el contexto de autenticación termine
  if (authLoading) return <Loading />;

  // Extraemos el rol para validar accesos
  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Estudiante") {
    return <AccessDenied />;
  }

  // Si la autenticación ya pasó, pero aún estamos buscando los datos de la sección en la API
  if (dataLoading) return <Loading />;
  console.log(sectionData);
  return (
    <div className="animate-in fade-in duration-500 h-full">
      <HeaderDashbord user={user} />

      <section className="p-3 grid md:grid-cols-2 gap-3">
        <InfoCard
          label="Año"
          value={sectionData?.year ?? "No asignado"}
          icon={faLayerGroup}
          colorClass="bg-orange-500/50 text-orange-600"
          description="Este es el año en el que estás cursando actualmente"
        />

        <InfoCard
          label="Sección"
          value={sectionData?.section ?? "N/A"} // Asumo que el servicio también traerá la sección dinámica
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
