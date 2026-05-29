"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import FormRegister from "@/components/organism/FormRegister";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import {
  faAdd,
  faIdCard,
  faUser,
  faPhone,
  faTrash,
  faEllipsisV,
  faInfoCircle,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function GestionDocentesPage() {
  const [isOpent, setIsOpent] = useState(false);
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Gestion de Docentes"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpent(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          >
            Crear Docente
          </Button>
        </div>
      </div>
      <Modal
        title="Crear Docente"
        isOpen={isOpent}
        onClose={() => setIsOpent(false)}
      >
        <FormRegister mode="create" />
      </Modal>

      <TableInsti
        titelTable={[
          { name: "Cédula", icon: faIdCard },
          { name: "Docente", icon: faUser },
          { name: "Asignación Académica (Materias)", icon: faBuilding },
          { name: "Contacto", icon: faPhone },
          { name: "Estatus", icon: faInfoCircle },
          { name: "Acciones", icon: faEllipsisV },
        ]}
      />
    </>
  );
}
