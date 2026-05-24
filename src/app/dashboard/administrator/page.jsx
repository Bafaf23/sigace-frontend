"use client";
import AccessDenied from "@/components/molecules/AccessDenied";
import QuickActions from "@/components/molecules/QuickActions";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import Loading from "../loading";

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || user.user.role !== "administrator") return <AccessDenied />;

  return (
    <div className="animate-in fade-in duration-500">
      <HeaderDashbord user={user} />
      <main className="space-y-6 p-4">
        <QuickActions />
      </main>
    </div>
  );
}
