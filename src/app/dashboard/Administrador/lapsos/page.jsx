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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


/**
 * TODO: Realizar comprobaciones de lapsos: no se puede crear mas de tres lapos en un periodo academico.
 * @returns 
 */
export default function LapsoPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState(null);
  const [lapses, setLapses] = useState([]);

  // Estados para controlar los modales de manera independiente
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmPeriodOpen, setIsModalConfirmPeriodOpen] =
    useState(false);
  const [isModalCreateLapseOpen, setIsModalCreateLapseOpen] = useState(false);
  const [isModalCreateLapseOpenConfir, setIsModalCreateLapseOpenConfir] =
    useState(false);
  const [isModalEndPeriodOpen, setIsModalEndPeriodOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setformData] = useState({
    dateStard: "",
    dateEnd: "",
    namePeriod: "",
  });

  //Momentos academicos
  const [formDataLapse, setFormDataLapse] = useState({
    dateStart: "",
    dateEnd: "",
    nameLapse: "",
  });

  const fetchPeriod = async () => {
    const result = await getPeriod();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setPeriod(result.periodActive);
  };

  const fetchLapses = async () => {
    const result = await getLapses();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setLapses(result);
  };

  useEffect(() => {
    fetchPeriod();
    fetchLapses();
  }, [user]);

  return (
    <main className="animate-in fade-in duration-500">
      <section className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage="Configuración de Lapsos" />
      </section>

      <section className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-500">
              Periodo actual:
            </h2>
            <div className="text-xl font-bold text-indigo-500 bg-indigo-500/10 rounded-md p-2 px-4 border border-indigo-500/20">
              {period?.name || "No hay periodo actual"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {period?.is_active ? (
                <Button
                  icon={faCheck}
                  classNameBtn="bg-red-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
                  onClick={() => setIsModalEndPeriodOpen(true)}
                >
                  Finalizar periodo
                </Button>
              ) : (
                <Button
                  icon={faCalendar}
                  classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
                  onClick={() => setIsModalOpen(true)}
                >
                  Iniciar periodo
                </Button>
              )}

              {/* Botón modificado: Eliminada la restricción de lapses.length === 0 para permitir añadir lapsos uno por uno */}
              {period?.is_active ? (
                <Button
                  icon={faCalendar}
                  classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
                  onClick={() => setIsModalCreateLapseOpen(true)}
                >
                  Crear Lapso
                </Button>
              ) : null}
            </div>

            {/* MODAL 1: Formulario para ingresar datos del Lapso Unitario */}
            <Modal
              title={"Crear Nuevo Lapso / Momento"}
              isOpen={isModalCreateLapseOpen}
              onClose={() => setIsModalCreateLapseOpen(false)}
            >
              <FormCreateLapse
                formDataLapse={formDataLapse}
                setFormDataLapse={setFormDataLapse} // 👈 CORRECCIÓN CRUCIAL: Mismo nombre de Prop que espera el componente hijo
                onSubmit={() => {
                  setIsModalCreateLapseOpen(false);
                  setIsModalCreateLapseOpenConfir(true);
                }}
              />
            </Modal>

            {/* MODAL 1.5: Confirmación de guardado del lapso */}
            <ConfirmAtionModal
              isOpen={isModalCreateLapseOpenConfir}
              onCancel={() => {
                setIsModalCreateLapseOpenConfir(false);
              }}
              title="Confirmar Registro de Lapso"
              // CORRECCIÓN: Texto adaptado a la creación uno por uno
              message={`¿Estás seguro de querer registrar el lapso "${formDataLapse.nameLapse}" para este año escolar?`}
              onConfirm={async () => {
                const data = await createLapse(formDataLapse);
                if (data.error) {
                  toast.error(data.error);
                  return;
                }
                setIsModalCreateLapseOpenConfir(false);
                toast.success(`Lapso registrado correctamente`);

                // Limpieza del estado para que el formulario quede vacío la próxima vez
                setFormDataLapse({ nameLapse: "", dateStart: "", dateEnd: "" });
                await fetchLapses();
              }}
              variant="warning"
            />

            {/* MODAL 2: Formulario para ingresar datos del periodo */}
            <Modal
              isOpen={isModalOpen}
              title="Iniciar un Periodo académico"
              onClose={() => setIsModalOpen(false)}
            >
              <FormAcademicPeriod
                formData={formData}
                setformData={setformData}
                onSubmit={() => {
                  setIsModalOpen(false);
                  setIsModalConfirmPeriodOpen(true);
                }}
              />
            </Modal>

            {/* MODAL 3: Confirmación de inicio de periodo */}
            <ConfirmAtionModal
              isOpen={isModalConfirmPeriodOpen}
              onCancel={() => setIsModalConfirmPeriodOpen(false)}
              title="Iniciar periodo"
              message="¿Estás seguro de querer iniciar este año escolar?, toma en cuenta que este proceso es irreversible."
              onConfirm={async () => {
                const data = await createPeriod(formData);
                if (data.error) {
                  toast.error(data.error);
                  return;
                }
                toast.success("Periodo iniciado correctamente");
                setIsModalConfirmPeriodOpen(false);
                await fetchPeriod();
              }}
              variant="info"
            />

            {/* MODAL 4: Confirmación para finalizar el periodo */}
            <ConfirmAtionModal
              isOpen={isModalEndPeriodOpen}
              onCancel={() => setIsModalEndPeriodOpen(false)}
              title="Finalizar periodo"
              message="¿Estás seguro de querer finalizar este año escolar? Este proceso es irreversible y cerrará el periodo académico actual."
              onConfirm={async () => {
                const data = await endAcademicPeriod();
                if (data.error) {
                  toast.error(data.error);
                  return;
                }
                toast.success("Periodo finalizado correctamente");
                setIsModalEndPeriodOpen(false);
                await fetchPeriod();
                await fetchLapses();
              }}
              variant="danger"
            />
          </div>
        </div>
      </section>

      <section className="p-3">
        {lapses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lapses?.map((lapso) => (
              <CardLapse
                key={lapso.id}
                lapse={lapso}
                onIniciar={async (id) => {
                  setIsLoading(true);
                  try {
                    const data = await startLapse(id);
                    if (data.error) {
                      toast.error(data.error);
                      return;
                    }
                    toast.success(
                      data.message ?? "Lapso iniciado correctamente",
                    );
                    await fetchLapses();
                  } finally {
                    setIsLoading(false);
                  }
                }}
                onFinalizar={async (id) => {
                  setIsLoading(true);
                  try {
                    const data = await endLapse(id);
                    if (data.error) {
                      toast.error(data.error);
                      return;
                    }
                    toast.success(
                      data.message ?? "Lapso finalizado correctamente",
                    );
                    await fetchLapses();
                  } finally {
                    setIsLoading(false);
                  }
                }}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full border border-dashed border-slate-200 bg-slate-100/50 rounded-xl p-6 text-center">
            <Icon icon={faBook} className="text-4xl text-slate-500 mb-2" />
            <p className="text-lg font-bold text-slate-500 max-w-md">
              Parece que no hay lapsos creados. Si ya iniciaste el periodo, crea
              los lapsos correspondientes para empezar a administrar las notas
              de los estudiantes.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
