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
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TeachersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loadAcademic, setLoadAcademic] = useState([]);

  useEffect(() => {
    const fetchLoadAcademic = async () => {
      const data = await getLoadAcademic(user?.user?.id);
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLoadAcademic(data);
    };
    fetchLoadAcademic();
  }, [user]);

  if (loading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    router.push("/");
    return <AccessDenied />;
  }
  console.log(loadAcademic);
  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        <div className="col-span-1">
          <InfoCard
            label="Materias asignadas"
            value={loadAcademic.length || 0}
            icon={faBook}
            colorClass="bg-green-500/60 text-green-500/90"
            description={`Total de materias asignadas al profesor: ${loadAcademic.map((item) => item.name).join(", ") || "Asignando..."}`}
          />
        </div>
        <div className="col-span-1">
          <InfoCard
            label="Secciones asignadas"
            value={user.user.total_sections || 0}
            icon={faLayerGroup}
            colorClass="bg-purple-500/60 text-purple-500/90"
            description={`Total de secciones asignadas al profesor: ${user.user.sections_assigned || "Asignando..."}`}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            label="Años a los que das clase"
            value={user.user.total_years || 0}
            icon={faCalendarDays}
            colorClass="bg-yellow-500/60 text-yellow-500/90"
            description={`Total de años a los que das clase: ${user.user.total_years || "Asignando..."}`}
          />
        </div>
        <div className="col-span-1">
          <InfoCard
            label="Estudiantes asignados"
            value={user.user.total_students || 0}
            icon={faUser}
            colorClass="bg-blue-500/60 text-blue-500/90"
            description={`Total de estudiantes asignados al profesor: ${user.user.students_assigned || "Asignando..."}`}
          />
        </div>
      </section>
    </div>
  );
}
