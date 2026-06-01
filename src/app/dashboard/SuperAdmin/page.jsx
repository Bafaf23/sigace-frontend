"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";
import AccessDenied from "@/components/molecules/AccessDenied";
import QuickActions from "@/components/molecules/QuickActions";
import InfoCard from "@/components/atom/InfoCard";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSchools } from "@/services/school/getSchool";
import { getUsers } from "@/services/user/getUsers";
import { useState, useEffect } from "react";

export default function SuperAdminPage() {
  const { user, loading } = useAuth();
  const [instituciones, setInstituciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsuarios(data));
    getSchools().then((data) => setInstituciones(data));
  }, []);

  if (loading) return <Loading />;

  const role = user?.user?.role;

  if (!role || role !== "SuperAdmin") return <AccessDenied />;

  return (
    <div>
      <HeaderDashbord user={user} titelPage="SuperAdmin" />
      <main className="space-y-6 p-4">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            label="Instituciones"
            value={instituciones.length}
            icon={faBuilding}
            colorClass="bg-indigo-500/40 text-indigo-500"
          />
          <InfoCard
            label="Usuarios"
            value={usuarios.length}
            icon={faUser}
            colorClass="bg-green-500/40 text-green-500"
          />
        </section>
        <QuickActions />
      </main>
    </div>
  );
}
