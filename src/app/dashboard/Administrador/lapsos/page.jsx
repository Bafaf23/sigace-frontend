"use client";

import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import CardLapse from "@/components/molecules/CardLapse";
import ConfirmAtionModal from "@/components/molecules/ConfirmAtionModal";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormAcademicPeriod from "@/components/organism/FormAcademicPeriod";
import FormCreateLapse from "@/components/organism/FromCreateLapse";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { createPeriod } from "@/services/academicPeriod/createPeriod";
import { endAcademicPeriod } from "@/services/academicPeriod/endAcademicPeriod";
import { getPeriod } from "@/services/academicPeriod/getPeriod";
import { createLapse } from "@/services/lapse/createLapse";
import { endLapse } from "@/services/lapse/endLapse";
import { getLapses } from "@/services/lapse/getLapse";
import { startLapse } from "@/services/lapse/stardLapse";
import { faCalendar, faCheck, faBook } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";

export default function LapsoPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState(null);
  const [lapses, setLapses] = useState([]);

  // Estados independientes de modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmPeriodOpen, setIsModalConfirmPeriodOpen] =
    useState(false);
  const [isModalCreateLapseOpen, setIsModalCreateLapseOpen] = useState(false);
  const [isModalCreateLapseOpenConfir, setIsModalCreateLapseOpenConfir] =
    useState(false);
  const [isModalEndPeriodOpen, setIsModalEndPeriodOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Períodos académicos
  const [formData, setFormData] = useState({
    dateStard: "",
    dateEnd: "",
    namePeriod: "",
  });

  // Momentos / Lapsos
  const [formDataLapse, setFormDataLapse] = useState({
    dateStart: "",
    dateEnd: "",
    nameLapse: "",
  });

  const fetchPeriod = useCallback(async () => {
    try {
      const res = await getPeriod();
      const activePeriod = res?.data?.active;

      setPeriod(activePeriod);
    } catch (error) {
      toast.error("Error al cargar el periodo activo");
      console.error(error);
    }
  }, []);

  // Consultar historial de lapsos
  const fetchLapses = useCallback(async () => {
    try {
      const res = await getLapses();
      const lapsesList = res?.data ?? res ?? [];
      startTransition(() => {
        setLapses(Array.isArray(lapsesList) ? lapsesList : []);
      });
    } catch (error) {
      console.error("❌ [SIGACE UI]: Error recuperando lapsos:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPeriod();
    fetchLapses();
  }, [user, fetchPeriod, fetchLapses]);

  // 🔥 TODO RESUELTO: Validación estricta para evitar la creación de un 4to momento educativo
  const validLapsesCount = Array.isArray(lapses) ? lapses.length : 0;
  const canCreateMoreLapses = validLapsesCount < 3;
  console.log(period);
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Encabezado e Interfaz Centralizada */}
      <section className="flex flex-col gap-3 sm:flex-row sm:justify-between items-center mb-4 p-1">
        <HeaderDashbord titelPage="Configuración de Lapsos" />
      </section>

      {/* Panel Superior Informativo y Controles Operativos */}
      <section className="p-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-slate-500/5 backdrop-blur-md border border-slate-500/10 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Año Escolar:
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-2 px-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{period?.name || "Sin Periodo Activo"}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Control de ciclo de vida del Período Académico */}
            {period?.is_active ? (
              <Button
                icon={faCheck}
                classNameBtn="bg-rose-600 hover:bg-rose-700 text-slate-50 text-xs font-semibold p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-rose-500/10"
                onClick={() => setIsModalEndPeriodOpen(true)}
              >
                Finalizar periodo
              </Button>
            ) : (
              <Button
                icon={faCalendar}
                classNameBtn="bg-indigo-600 hover:bg-indigo-700 text-slate-50 text-xs font-semibold p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                onClick={() => setIsModalOpen(true)}
              >
                Iniciar periodo
              </Button>
            )}

            {/* Inyección de Botón Crear Lapso amarrado al validador de tope de 3 */}
            {period?.is_active && canCreateMoreLapses && (
              <Button
                icon={faCalendar}
                classNameBtn="bg-indigo-600 hover:bg-indigo-700 text-slate-50 text-xs font-semibold p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                onClick={() => setIsModalCreateLapseOpen(true)}
              >
                Crear Lapso
              </Button>
            )}
          </div>

          {/* Formulario Modal: Registro de Nuevo Lapso */}
          <Modal
            title="Crear Nuevo Lapso / Momento"
            isOpen={isModalCreateLapseOpen}
            onClose={() => setIsModalCreateLapseOpen(false)}
          >
            <FormCreateLapse
              formDataLapse={formDataLapse}
              setFormDataLapse={setFormDataLapse}
              onSubmit={() => {
                setIsModalCreateLapseOpen(false);
                setIsModalCreateLapseOpenConfir(true);
              }}
            />
          </Modal>

          {/* Confirmación Transicional de Guardado de Lapso */}
          <ConfirmAtionModal
            isOpen={isModalCreateLapseOpenConfir}
            onCancel={() => setIsModalCreateLapseOpenConfir(false)}
            title="Confirmar Registro de Lapso"
            message={`¿Estás seguro de querer aperturar el lapso "${formDataLapse.nameLapse}"? Este cambio habilitará la planificación docente.`}
            onConfirm={async () => {
              try {
                await createLapse(formDataLapse);
                toast.success("Lapso registrado correctamente");
                setFormDataLapse({ nameLapse: "", dateStart: "", dateEnd: "" });
                await fetchLapses();
              } catch (err) {
                toast.error(
                  err.response?.data?.message ||
                    "No se pudo registrar el lapso",
                );
              } finally {
                setIsModalCreateLapseOpenConfir(false);
              }
            }}
            variant="warning"
          />

          {/* Formulario Modal: Configuración inicial de Año Escolar */}
          <Modal
            isOpen={isModalOpen}
            title="Iniciar un Periodo Académico"
            onClose={() => setIsModalOpen(false)}
          >
            <FormAcademicPeriod
              formData={formData}
              setformData={setFormData}
              onSubmit={() => {
                setIsModalOpen(false);
                setIsModalConfirmPeriodOpen(true);
              }}
            />
          </Modal>

          {/* Confirmación Transicional: Inicio de Período */}
          <ConfirmAtionModal
            isOpen={isModalConfirmPeriodOpen}
            onCancel={() => setIsModalConfirmPeriodOpen(false)}
            title="Iniciar período institucional"
            message="¿Estás seguro de querer iniciar este año escolar? El proceso creará la matriz base de matrícula y es irreversible."
            onConfirm={async () => {
              try {
                await createPeriod(formData);
                toast.success("Periodo académico iniciado correctamente");
                await fetchPeriod();
              } catch (err) {
                toast.error(
                  err.response?.data?.message || "Error al iniciar año escolar",
                );
              } finally {
                setIsModalConfirmPeriodOpen(false);
              }
            }}
            variant="info"
          />

          {/* Confirmación Transicional: Cierre de Período */}
          <ConfirmAtionModal
            isOpen={isModalEndPeriodOpen}
            onCancel={() => setIsModalEndPeriodOpen(false)}
            title="Finalizar periodo lectivo"
            message="¿Estás seguro de querer clausurar este año escolar? Este proceso consolidará las actas definitivas y no se podrán alterar notas."
            onConfirm={async () => {
              try {
                await endAcademicPeriod();
                toast.success(
                  "Periodo escolar finalizado y bloqueado con éxito",
                );
                await fetchPeriod();
                await fetchLapses();
              } catch (err) {
                toast.error(
                  err.response?.data?.message ||
                    "Error al clausurar el período",
                );
              } finally {
                setIsModalEndPeriodOpen(false);
              }
            }}
            variant="danger"
          />
        </div>
      </section>

      {/* Grilla Central de Visualización de Estados */}
      <section className="p-3">
        {validLapsesCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lapses.map((lapso) => (
              <CardLapse
                key={lapso.id}
                lapse={lapso}
                onIniciar={async (id) => {
                  setIsLoading(true);
                  try {
                    await startLapse(id);
                    toast.success(
                      "Lapso iniciado. Sistema abierto para recepción de calificaciones.",
                    );
                    await fetchLapses();
                  } catch (err) {
                    toast.error(
                      err.response?.data?.message ||
                        "No se pudo aperturar el lapso",
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
                onFinalizar={async (id) => {
                  setIsLoading(true);
                  try {
                    await endLapse(id);
                    toast.success(
                      "Lapso finalizado y clausurado de forma exitosa.",
                    );
                    await fetchLapses();
                  } catch (err) {
                    toast.error(
                      err.response?.data?.message || "Error al cerrar el lapso",
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          /* Estado Vacío Estilizado Minimalista */
          <div className="flex flex-col items-center justify-center min-h-[300px] border border-dashed border-slate-200 dark:border-slate-800 bg-slate-500/5 backdrop-blur-md rounded-2xl p-8 text-center animate-pulse">
            <Icon
              icon={faBook}
              className="text-3xl text-slate-400 dark:text-slate-500 mb-3"
            />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              No hay lapsos configurados en este periodo. Si ya iniciaste el año
              escolar, genera los lapsos para dar apertura al registro de notas
              de los docentes.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
