"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading } = useAuth();
  const [isOpent, setIsOpent] = useState(false);
  if (loading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Gestion de Estudiantes"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpent(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          >
            Crear Estudiante
          </Button>
        </div>
        <Modal
          title="Crear Estudiante"
          isOpen={isOpent}
          onClose={() => setIsOpent(false)}
        >
          <FormInscrip />
        </Modal>
      </div>
      <TableInsti />
    </>
  );
}
