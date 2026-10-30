"use client";

import Loading from "@/app/loading";
import InfoCard from "@/components/atom/InfoCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import { getLoadAcademic } from "@/services/teachers/getLoadAcademic";
import {
  faBook,
  faLayerGroup,
  faCalendarCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TeachersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loadAcademic, setLoadAcademic] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const fetchLoadAcademic = async () => {
      try {
        setDataLoading(true);
        const data = await getLoadAcademic();
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        // Guardamos data.data que es el objeto con load_academics
        setLoadAcademic(data?.data || null);
      } catch (error) {
        console.error("Error al cargar la carga académica:", error);
        toast.error("Error al conectar con el servidor");
      } finally {
        setDataLoading(false);
      }
    };

    fetchLoadAcademic();
  }, []);

  // Validación de estados de autenticación y carga
  if (authLoading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "profesor") {
    router.push("/");
    return <AccessDenied />;
  }

  if (dataLoading) return <Loading />;

  // --- EXTRACCIÓN SEGURA DEL LISTADO DE CARGAS ---
  const list = loadAcademic?.load_academics || [];

  const totalMaterias = list.length;

  const totalSecciones = new Set(
    list.map(
      (item) =>
        `${item?.section?.year?.name || ""}-${item?.section?.name || ""}`,
    ),
  ).size;

  const totalAnos = new Set(
    list.map((item) => item?.section?.year?.name).filter(Boolean),
  ).size;

  // --- LISTAS FORMATEADAS PARA DESCRIPCIONES ---
  const listaMaterias = [
    ...new Set(list.map((item) => item?.subject?.name).filter(Boolean)),
  ].join(", ");

  const listaSecciones = [
    ...new Set(list.map((item) => item?.section?.name).filter(Boolean)),
  ].join(", ");

  const listaAnos = [
    ...new Set(list.map((item) => item?.section?.year?.name).filter(Boolean)),
  ].join(", ");

  return (
    <div className="space-y-3">
      <HeaderDashbord user={user} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Materias */}
        <div className="col-span-1">
          <InfoCard
            label="Materias asignadas"
            value={totalMaterias}
            icon={faBook}
            colorClass="bg-green-500/60 text-green-500/90"
            description={
              totalMaterias > 0
                ? `Materias: ${listaMaterias}`
                : "Sin materias asignadas"
            }
          />
        </div>

        {/* Secciones */}
        <div className="md:col-span-2">
          <InfoCard
            label="Secciones asignadas"
            value={totalSecciones}
            icon={faLayerGroup}
            colorClass="bg-purple-500/60 text-purple-500/90"
            description={
              totalSecciones > 0
                ? `Letras asignadas: ${listaSecciones}`
                : "Sin secciones"
            }
          />
        </div>

        {/* Años */}
        <div className="col-span-2">
          <InfoCard
            label="Años a los que das clase"
            value={totalAnos}
            icon={faCalendarDays}
            colorClass="bg-yellow-500/60 text-yellow-500/90"
            description={
              totalAnos > 0
                ? `Niveles actuales: ${listaAnos}`
                : "Sin años asignados"
            }
          />
        </div>

        {/* Periodo */}
        <div className="col-span-2 md:col-span-1">
          <InfoCard
            label="Periodo Escolar"
            value={user?.user?.period ?? "Activo"}
            icon={faCalendarCheck}
            colorClass="bg-blue-500/60 text-blue-500/90"
            description="Periodo académico en curso para la carga de evaluaciones."
          />
        </div>
      </section>
    </div>
  );
}
