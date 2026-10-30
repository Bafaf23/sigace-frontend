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

      const rawAcademics = data.data?.load_academics || [];

      // Normalizamos la estructura para un acceso más sencillo y limpio
      const formattedAcademics = rawAcademics.map((item) => ({
        id_load_academic: item.id,
        code_subject: item.subject?.code_subject,
        name: item.subject?.name,
        section_name: item.section?.name,
        year_name: item.section?.year?.name,
      }));

      setSubjects(formattedAcademics);

      if (formattedAcademics.length > 0) {
        setSelectedSubject(formattedAcademics[0]);
      }
    };

    fetchLoadAcademic();
  }, [user?.user?.id]);

  useEffect(() => {
    if (!user?.user?.id) return;

    const fetchLapses = async () => {
      const data = await getLapses();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLapses(data.data);
    };

    fetchLapses();
  }, [user?.user?.id]);

  useEffect(() => {
    const idLoadAcademic = selectedSubject?.id_load_academic;
    const idLapse = activeLapse?.id;

    if (!idLoadAcademic || !idLapse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEvaluations([]);
      return;
    }

    const fetchEvaluations = async () => {
      const data = await getEvaluation(idLoadAcademic, idLapse);
      if (data.error) {
        toast.error(data.error);
        return;
      }

      const list = data.data;
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
  if (!user || role !== "profesor") {
    return <AccessDenied />;
  }

  console.log(selectedSubject);

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
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Evaluaciones
      </h2>
      <div className="flex flex-col gap-5 font-bold text-gray-500/60">
        <div className="flex flex-col justify-between md:flex-row md:items-center lg:flex-row">
          {subjects.length > 1 && (
            <div className="p-2">
              <Selector
                options={subjects.map((subject) => ({
                  value: `${subject.code_subject}${subject.section_name}`,
                  label: `${subject.name} (${subject.year_name} "${subject.section_name}")`,
                }))}
                name="materia"
                label="Asignatura"
                value={
                  selectedSubject
                    ? `${selectedSubject.code_subject}${selectedSubject.section_name}`
                    : ""
                }
                onChange={(e) => {
                  const subject = subjects.find(
                    (s) =>
                      `${s.code_subject}${s.section_name}` === e.target.value,
                  );
                  if (subject) setSelectedSubject(subject);
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Tarjeta: Materia */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-lg text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon icon={faBook} className="text-base" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Asignatura
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate italic">
                {selectedSubject
                  ? `${selectedSubject.name} — ${selectedSubject.year_name} "${selectedSubject.section_name}"`
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
                {porcentajeTotal}% -{" "}
                <span className="text-gray-300">{100 - porcentajeTotal}%</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          {porcentajeTotal < 100 && (
            <Button
              classNameBtn="bg-cyan-500 py-3 px-4 rounded-xl text-slate-50 font-bold cursor-pointer hover:bg-cyan-700 flex items-center gap-1"
              icon={faPlus}
              onClick={() => {
                setEvaluation({});
                setIsModalOpen(true);
              }}
            >
              Nueva actividad
            </Button>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Añade una nueva actividad"
            maxWidth="max-w-4xl"
          >
            <FormCargaPV
              idLoadAcademic={selectedSubject?.id_load_academic}
              idLapseActive={activeLapse?.id}
              onSuccess={(newEvalu) => {
                handleEvaluationCreated(newEvalu);
                setIsModalOpen(false);
              }}
            />
          </Modal>
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
          renderMovilCard={(rows) => (
            <div
              key={rows.id || rows.id_evaluation}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Cabecera de la Card: Porcentaje y Acciones */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 text-sm font-bold text-orange-600 dark:text-orange-400">
                    {rows.porcentage ?? rows.percentage ?? 0}%
                  </span>
                  <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {rows.date
                      ? new Date(
                          rows.date.includes("T")
                            ? rows.date
                            : `${rows.date}T00:00:00`,
                        ).toLocaleDateString("es-ES")
                      : "Sin fecha"}
                  </span>
                </div>

                {/* Botón de Eliminar */}
                <Button
                  classNameBtn="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-8 h-8 flex items-center justify-center"
                  icon={faTrash}
                  titel="Eliminar evaluación"
                  onClick={() => {
                    setEvaluation(rows);
                    setIsConfirmActionModalOpen(true);
                  }}
                />
              </div>

              {/* Cuerpo de la Card */}
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                    Actividad
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {rows.activity || "—"}
                  </p>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                    Referente Teórico
                  </span>
                  <p>{rows.referent_teorical || "—"}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                  <div>
                    <span className="block font-medium text-slate-400 dark:text-slate-500">
                      Técnica
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {rows.technical || "—"}
                    </span>
                  </div>

                  <div>
                    <span className="block font-medium text-slate-400 dark:text-slate-500">
                      Instrumento
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {rows.instrument || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
        titel="Eliminar Evaluación"
        message="¿Estás seguro de querer eliminar esta evaluación?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />
    </>
  );
}
