"use client";
import Button from "@/components/atom/Button";
import FormSubjetc from "@/components/organism/FormSubjetc";
import Modal from "@/components/organism/Modal";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function HeaderGestionMaterias({ onSubjectCreated }) {
  const [isOpent, setIsOpent] = useState(false);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-between lg:justify-between">
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Asignaturas
      </h2>

      <Button
        onClick={() => setIsOpent(true)}
        icon={faAdd}
        classNameBtn="bg-cyan-600 text-white hover:bg-cyan-700"
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
  );
}
