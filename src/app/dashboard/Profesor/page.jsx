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
  const [loadAcademic, setLoadAcademic] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // Evitamos llamar a la API si el usuario aún no se ha cargado en el contexto
    if (!user?.user?.id_user) return;

    const fetchLoadAcademic = async () => {
      try {
        setDataLoading(true);
        const data = await getLoadAcademic(user.user.id_user);
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setLoadAcademic(data);
      } catch (error) {
        console.error("Error al cargar la carga académica:", error);
        toast.error("Error al conectar con el servidor");
      } finally {
        setDataLoading(false);
      }
    };

    fetchLoadAcademic();
  }, [user]);

  // Primero validamos la carga de la autenticación
  if (authLoading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    router.push("/");
    return <AccessDenied />;
  }

  // Si la sesión es correcta pero los datos de las materias aún se están pidiendo
  if (dataLoading) return <Loading />;

  // --- CÁLCULO DE TOTALES ÚNICOS ---
  const totalSecciones = new Set(
    loadAcademic.map((item) => `${item.year_name}-${item.section_name}`),
  ).size;

  const totalAnos = new Set(loadAcademic.map((item) => item.year_name)).size;

  // --- LISTAS FORMATEADAS (SIN DUPLICADOS) PARA LAS DESCRIPCIONES ---
  const listaMaterias = [
    ...new Set(loadAcademic.map((item) => item.name)),
  ].join(", ");
  const listaSecciones = [
    ...new Set(loadAcademic.map((item) => item.section_name)),
  ].join(", ");
  const listaAnos = [
    ...new Set(loadAcademic.map((item) => item.year_name)),
  ].join(", ");

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {/* Materias */}
        <div className="col-span-1">
          <InfoCard
            label="Materias asignadas"
            value={loadAcademic.length || 0}
            icon={faBook}
            colorClass="bg-green-500/60 text-green-500/90"
            description={
              loadAcademic.length > 0
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

        <div className="col-span-1">
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
