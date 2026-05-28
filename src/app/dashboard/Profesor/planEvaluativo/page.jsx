"use client";
import AccessDenied from "@/components/molecules/AccessDenied";
import Button from "@/components/atom/Button";
import Selector from "@/components/atom/Selector";
import AccionesRapidas from "@/components/molecules/QuickActions";
import FormCargaPV from "@/components/molecules/FormCargaPV";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/organism/Modal";
import TablaPV from "@/components/organism/TablaPV";
import Icon from "@/components/atom/Icon";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Loading from "@/app/dashboard/loading";

export default function PlanEvaluativo() {
  const { user, loading } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    return <AccessDenied />;
  }

  const materias = [];

  const evaluacionesEjemplo = [
    {
      semana: "02",
      contenido: "Ecuaciones de 2do Grado",
      actividad: "Taller Práctico",
      tecnica: "Análisis de producción",
      instrumento: "Escala de Estimación",
      tipoForma: "S/H",
      porcentaje: 20,
    },
    {
      semana: "04",
      contenido: "Funciones Cuadráticas",
      actividad: "Prueba Escrita",
      tecnica: "Prueba objetiva",
      instrumento: "Cuestionario",
      tipoForma: "S/H",
      porcentaje: 25,
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <HeaderDashbord titelPage={"Plan Evaluativo"} />
        <div className="p-3">
          <Button
            icon={faPlus}
            classNameBtn={
              "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            {"Cargar PV"}
          </Button>
          <Modal
            title={"Nueva Evaluación"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(!isModalOpen)}
          >
            <FormCargaPV />
          </Modal>
        </div>
      </div>
      <AccionesRapidas />

      <section className="p-3">
        <h1 className="text-2xl font-bold text-gray-500/60 dark:text-slate-500">
          Plan de Evaluación por Materia
        </h1>

        <div className="flex items-end justify-between mb-6 gap-2">
          <div className="max-w-xs">
            <Selector
              id={"selectorPV"}
              label={"Selecciona la Asignatura"}
              options={materias || []}
            />
          </div>
          <Button
            icon={faPrint}
            onClick={() => generadorPV(user, evaluacionesEjemplo)}
            classNameBtn={
              "bg-orange-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
          >
            {"Imprimir PV"}
          </Button>
        </div>

        {evaluacionesEjemplo.length > 0 ? (
          <TablaPV evaluaciones={evaluacionesEjemplo} />
        ) : (
          <div className="flex flex-col items-center bg-slate-100/50 justify-center gap-2 rounded-xl border border-slate-200 border-dashed p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
            <Icon icon={faInfoCircle} className="text-slate-500 text-2xl" />
            No hay evaluaciones cargadas.
          </div>
        )}
      </section>
    </div>
  );
}
