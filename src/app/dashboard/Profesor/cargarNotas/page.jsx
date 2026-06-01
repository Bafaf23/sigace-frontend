"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Selector from "@/components/atom/Selector";
import AccessDenied from "@/components/molecules/AccessDenied";
import FormCargaNotas from "@/components/molecules/FromCargaNotas";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import AccionesRapidas from "@/components/molecules/QuickActions";
import Modal from "@/components/organism/Modal";
import TablaNotas from "@/components/organism/TablaNotas";
import { useAuth } from "@/context/AuthContext";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function cargarNotas() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (loading) return <Loading />;
  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    return <AccessDenied />;
  }
  const alumnosDisponibles = [];
  const data = [];
  const materias = [];

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row">
        <HeaderDashbord titelPage={"Cargar notas"} />
        <div className="p-3">
          <Button
            classNameBtn={
              "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
            icon={faPlus}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            {"Añadir Nueva Calificación"}
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Cargar Calificaciones"
          >
            <FormCargaNotas
              listaAlumnosSinNotas={alumnosDisponibles}
              onSave={(data) => {
                console.log("Guardando nueva nota para:", data.alumnoId);
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        </div>
      </div>

      <AccionesRapidas />

      <div className="mt-6 flex flex-col gap-5 p-3 font-bold text-gray-500/60">
        <div className="flex flex-col justify-between md:flex-row md:items-center lg:flex-row">
          <h1 className="text-2xl">Notas Cargadas</h1>
          <div className="max-w-xs">
            <Selector options={materias} name="materia" label="Materia" />
          </div>
        </div>
        {data.length > 0 ? (
          data.map((lapso) => <TablaNotas data={lapso} key={lapso.id} />)
        ) : (
          <div className="flex flex-col items-center bg-slate-100/50 justify-center gap-2 rounded-xl border border-slate-200 border-dashed p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
            <Icon icon={faInfoCircle} className="text-slate-500 text-2xl" />
            No hay notas cargadas en esta materia.
          </div>
        )}
      </div>
    </>
  );
}
