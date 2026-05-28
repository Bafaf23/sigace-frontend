"use client";
import AccionesRapidas from "@/components/molecules/QuickActions";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Reportes from "@/components/molecules/Reports";
import Resumenes from "@/components/molecules/SummaryCards";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/dashboard/loading";
import AccessDenied from "@/components/molecules/AccessDenied";
import { useRouter } from "next/navigation";

export default function TeachersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    router.push("/");
    return <AccessDenied />;
  }

  const teacherId = user?.user?.id ?? user?.id;

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <Resumenes teachersId={teacherId} />
      {/* movil */}
      <AccionesRapidas />
      <Reportes />
    </div>
  );
}
