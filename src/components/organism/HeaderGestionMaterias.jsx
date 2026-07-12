"use client";
import Button from "@/components/atom/Button";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormSubjetc from "@/components/organism/FormSubjetc";
import Modal from "@/components/organism/Modal";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function HeaderGestionMaterias({ onSubjectCreated }) {
  const [isOpent, setIsOpent] = useState(false);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
      <HeaderDashbord titelPage={"Gestion de Asignaturas"} />
      <div className="p-3">
        <Button
          onClick={() => setIsOpent(true)}
          icon={faAdd}
          classNameBtn="bg-indigo-600 hover:bg-indigo-700 transition-all p-2.5 rounded-xl text-slate-50 font-semibold cursor-pointer flex items-center gap-2 text-sm shadow-md shadow-indigo-500/1"
        >
          Crear Asignatura
        </Button>
        <Modal
          title="Crea una Asignatura"
          isOpen={isOpent}
          onClose={() => setIsOpent(false)}
        >
          <FormSubjetc
            onSuccess={() => {
              onSubjectCreated?.();
              setIsOpent(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
}
