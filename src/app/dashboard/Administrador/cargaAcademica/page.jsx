"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import ListAcademicLoand from "@/components/molecules/ListAcademicLoand";
import Button from "@/components/atom/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/organism/Modal";
import FormAcadLoand from "@/components/organism/FormAcadLoand";
import { useState } from "react";

export default function cargaAcademicaPage() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <HeaderDashbord titelPage="Gestion de Carga academica" />
        <div>
          <Button
            onClick={() => setisOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 "
          >
            {"Crear carga Academica"}
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setisOpen(!isOpen)}
            title={"Carga Academica"}
          >
            <FormAcadLoand
              academicLoads={[]}
              subjects={[]}
              teachers={[]}
              sections={[]}
            />
          </Modal>
        </div>
      </div>
      <ListAcademicLoand
        academicLoads={[]}
        subjects={[]}
        teachers={[]}
        sections={[]}
      />
    </div>
  );
}
