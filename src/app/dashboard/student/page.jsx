"use client";
import AccessDenied from "@/components/molecules/AccessDenied";
import AccionesRapidas from "@/components/molecules/QuickActions";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Resumenes from "@/components/molecules/SummaryCards";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";

export default function dashboardStudiantPage() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "student") {
    return <AccessDenied />;
  }

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <Resumenes />
      <AccionesRapidas />
    </div>
  );
}
