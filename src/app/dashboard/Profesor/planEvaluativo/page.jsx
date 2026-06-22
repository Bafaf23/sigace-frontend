"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Selector from "@/components/atom/Selector";
import AccessDenied from "@/components/molecules/AccessDenied";
import ConfirmAtionModal from "@/components/molecules/ConfirmAtionModal";
import FormCargaPV from "@/components/molecules/FormCargaPV";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { deleteEvaluation } from "@/services/evaluation/deleteEvaluation";
import { getEvaluation } from "@/services/evaluation/getEvaluation";
import { getLapses } from "@/services/lapse/getLapse";
import { getLoadAcademic } from "@/services/teachers/getLoadAcademic";
import {
  faCalendar,
  faBook,
  faPlus,
  faFile,
  faListCheck,
  faWrench,
  faPercentage,
  faClock,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PlanEvaluativo() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] =
    useState(false);
  const [evaluation, setEvaluation] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lapses, setLapses] = useState([]);

  // Calcular el lapso activo de forma memorizada en cada renderizado
  const activeLapse = lapses.find(
    (lapse) => lapse.is_active === true || lapse.is_active === 1,
  );

  // 1. Cargar carga académica inicial
  useEffect(() => {
    if (!user?.user?.id) return;

    const fetchLoadAcademic = async () => {
      const data = await getLoadAcademic();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubject(data[0]);
      }
    };

    fetchLoadAcademic();
  }, [user?.user?.id]); // Modificado para depender de la ID segura del usuario

  // 2. Cargar lapsos académicos
  useEffect(() => {
    if (!user?.user?.id) return;

    const fetchLapses = async () => {
      const data = await getLapses();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLapses(Array.isArray(data) ? data : []);
    };

    fetchLapses();
  }, [user?.user?.id]);

  // 3. Cargar evaluaciones (Sincronizado de forma segura con la materia Y el lapso)
  useEffect(() => {
    const idLoadAcademic = selectedSubject?.id_load_academic;
    const idLapse = activeLapse?.id;

    if (!idLoadAcademic || !idLapse) {
      setEvaluations([]);
      return;
    }

    const fetchEvaluations = async () => {
      const data = await getEvaluation(idLoadAcademic, idLapse);
      if (data.error) {
        toast.error(data.error);
        return;
      }

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.evaluations)
            ? data.evaluations
            : [];
      setEvaluations(list.filter(Boolean));
    };

    fetchEvaluations();
  }, [selectedSubject?.id_load_academic, activeLapse?.id]);

  const handleDeleteEvaluation = async () => {
    if (!evaluation?.id) return;
    const response = await deleteEvaluation(evaluation.id);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.message || "Evaluación eliminada correctamente.");
    setEvaluations((prev) => prev.filter((eva) => eva?.id !== evaluation?.id));
  };

  if (loading) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    return <AccessDenied />;
  }

  const porcentajeTotal = evaluations
    .filter(Boolean)
    .reduce(
      (acc, curr) => acc + (Number(curr.porcentage ?? curr.percentage) || 0),
      0,
    );

  const handleEvaluationCreated = (newEvaluation) => {
    if (!newEvaluation) return;
    setEvaluations((prev) => [...prev.filter(Boolean), newEvaluation]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row">
        <HeaderDashbord titelPage={"Plan Evaluativo"} />
        <div className="p-3">
          {porcentajeTotal < 100 && (
            <Button
              classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
              icon={faPlus}
              onClick={() => {
                setEvaluation({});
                setIsModalOpen(true);
              }}
            >
              {"Añadir Evaluación"}
            </Button>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Plan Evaluativo"
            maxWidth="max-w-2xl"
          >
            <FormCargaPV
              idLoadAcademic={selectedSubject?.id_load_academic}
              idLapseActive={activeLapse?.id}
              onSuccess={handleEvaluationCreated}
            />
          </Modal>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 p-3 font-bold text-gray-500/60">
        <div className="flex flex-col justify-between md:flex-row md:items-center lg:flex-row">
          {subjects.length > 1 && (
            <div className="max-w-xs">
              <Selector
                options={subjects.map((subject) => ({
                  value: subject.code_subject,
                  label: `${subject.subject_name} - ${subject.year_name}`,
                }))}
                name="materia"
                label="Materia"
                value={selectedSubject?.code_subject ?? ""}
                onChange={(e) => {
                  const subject = subjects.find(
                    (s) => s.code_subject === e.target.value,
                  );
                  if (subject) setSelectedSubject(subject);
                }}
              />
            </div>
          )}
        </div>

        <div className="px-3 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Tarjeta: Materia */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-lg text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon icon={faBook} className="text-base" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Materia
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate italic">
                {selectedSubject
                  ? `${selectedSubject.subject_name} - ${selectedSubject.year_name} ${selectedSubject.section_name ?? ""}`.trim()
                  : "Sin materia asignada"}
              </span>
            </div>
          </div>

          {/* Tarjeta: Periodo */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-lg text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon icon={faClock} className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Periodo
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {user?.user?.period || "N/A"}
                {activeLapse ? ` — ${activeLapse.name}` : ""}
              </span>
            </div>
          </div>

          {/* Tarjeta: Porcentaje Total */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all col-span-2 lg:col-span-1">
            <div
              className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                porcentajeTotal === 100
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
              }`}
            >
              <Icon icon={faCalendar} className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Porcentaje Total
              </span>
              <span
                className={`text-base font-bold ${
                  porcentajeTotal === 100
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-500"
                }`}
              >
                {porcentajeTotal}%
              </span>
            </div>
          </div>
        </div>

        <TableInsti
          data={evaluations}
          titelTable={[
            { name: "Fecha", icon: faCalendar },
            { name: "Referente Teórico", icon: faBook },
            { name: "Estrategia / Actividad", icon: faListCheck },
            { name: "Técnica", icon: faWrench },
            { name: "Instrumento", icon: faFile },
            { name: "Porcentaje", icon: faPercentage },
            { name: "Acciones", icon: faEllipsis },
          ]}
          renderTableRows={(row) => (
            // 🌟 CORREGIDO: Usar row.id como key única de la fila de evaluación
            <tr
              key={row.id || row.id_evaluation}
              className="transition-colors text-slate-500 hover:bg-slate-50/50"
            >
              <td className="px-4 py-4 text-center font-medium text-cyan-600">
                {row.date ? new Date(row.date).toLocaleDateString() : ""}
              </td>
              <td className="px-4 py-4">{row.referent_teorical}</td>
              <td className="px-4 py-4">{row.activity}</td>
              <td className="px-4 py-4">{row.technical}</td>
              <td className="px-4 py-4">{row.instrument}</td>
              <td className="px-4 py-4 text-orange-600 font-bold text-center">
                {row.porcentage ?? row.percentage}%
              </td>
              <td className="px-4 py-4 text-center flex gap-1 justify-center">
                <Button
                  classNameBtn="p-2 rounded-md text-slate-500 font-bold cursor-pointer flex items-center gap-1 hover:text-red-600 w-8 h-8"
                  icon={faTrash}
                  onClick={() => {
                    setEvaluation(row);
                    setIsConfirmActionModalOpen(true);
                  }}
                />
              </td>
            </tr>
          )}
        />
      </div>

      <ConfirmAtionModal
        isOpen={isConfirmActionModalOpen}
        onCancel={() => setIsConfirmActionModalOpen(false)}
        onConfirm={() => {
          setIsConfirmActionModalOpen(false);
          handleDeleteEvaluation();
          setEvaluation({});
        }}
        title="Eliminar Evaluación"
        message="¿Estás seguro de querer eliminar esta evaluación?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />
    </>
  );
}
