"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Button from "@/components/atom/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QuickActions from "@/components/molecules/QuickActions";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import { useState } from "react";
import FormInstitucion from "@/components/organism/FormInstitucion";

export default function InstitucionesPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Instituciones"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          >
            Crear Institucion
          </Button>
          <Modal
            title="Crear Institucion"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <FormInstitucion />
          </Modal>
        </div>
      </div>

      <QuickActions />

      <TableInsti />
    </div>
  );
}
