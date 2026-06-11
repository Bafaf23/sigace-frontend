"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Selector from "@/components/atom/Selector";
import AccessDenied from "@/components/molecules/AccessDenied";
import FormCargaNotas from "@/components/molecules/FromCargaNotas";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Modal from "@/components/organism/Modal";
import TablaNotas from "@/components/organism/TablaNotas";
import { useAuth } from "@/context/AuthContext";
import { getEvaluation } from "@/services/evaluation/getEvaluation";
import { getGrades } from "@/services/grades/getGrades";
import { getLapses } from "@/services/lapse/getLapse";
import { getStudentSection } from "@/services/student/getStudentSection";
import { getLoadAcademic } from "@/services/teachers/getLoadAcademic";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CargarNotas() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPantalla, setLoadingPantalla] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lapses, setLapses] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [alumnosDisponibles, setAlumnosDisponibles] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [activities, setActivities] = useState([]);

  // Interruptor para volver a pedir las notas a la BD cuando se registre una nueva
  const [refreshNotas, setRefreshNotas] = useState(false);

  const SIG = user?.user?.SIG;

  const activeLapse = lapses.find(
    (lapse) =>
      lapse.is_active === true ||
      lapse.is_active === 1 ||
      lapse.is_active === "1",
  );

  // Carga inicial: Materias del Profesor
  useEffect(() => {
    if (!user?.user?.id) return;

    const loadPantallaInicial = async () => {
      try {
        setLoadingPantalla(true);
        const cargaResponse = await getLoadAcademic(user.user.id_user);
        setSubjects(Array.isArray(cargaResponse) ? cargaResponse : []);
      } catch (error) {
        console.error("Error al cargar los datos de la pantalla:", error);
      } finally {
        setLoadingPantalla(false);
      }
    };
    loadPantallaInicial();
  }, [user?.user?.id]);

  // Carga de Lapsos de la escuela
  useEffect(() => {
    if (!SIG) return;

    const fetchLapses = async () => {
      const data = await getLapses(SIG);
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLapses(Array.isArray(data) ? data : []);
    };

    fetchLapses();
  }, [SIG]);

  // Sincronización de datos de la materia en paralelo
  useEffect(() => {
    const idLoadAcademic = selectedSubject?.id_load_academic;
    if (!idLoadAcademic || !SIG) {
      setNotesData([]);
      setAlumnosDisponibles([]);
      setActivities([]);
      return;
    }

    const fetchMateriaData = async () => {
      setLoadingNotes(true);
      try {
        const idSection = selectedSubject?.id_section;
        const [gradesRes, studentsRes, activitiesRes] = await Promise.all([
          getGrades(idLoadAcademic),
          idSection ? getStudentSection(idSection, SIG) : Promise.resolve([]),
          lapses.length > 0
            ? Promise.all(
                lapses.map(async (lapso) => {
                  const res = await getEvaluation(idLoadAcademic, lapso.id);
                  const rawList = Array.isArray(res) ? res : (res?.data ?? []);

                  // 🛡️ FILTRO ANTIDUPLICADOS: Filtramos por el ID único de la actividad
                  const uniqueList = rawList.filter(
                    (item, index, self) =>
                      self.findIndex((t) => t.id === item.id) === index,
                  );

                  return {
                    id_lapse: lapso.id,
                    list: uniqueList,
                  };
                }),
              )
            : Promise.resolve([]),
        ]);

        // 1. Procesar notas: la API devuelve un array plano de calificaciones
        const emptyGradesByLapse = lapses.map((lapso) => ({
          id: lapso.id,
          id_lapse: lapso.id,
          name: lapso.name,
          is_active: lapso.is_active,
          students: [],
        }));

        if (gradesRes?.error) {
          if (!gradesRes.error.includes("No hay notas")) {
            toast.error(gradesRes.error);
          }
          setNotesData(emptyGradesByLapse);
        } else {
          const flatGrades = Array.isArray(gradesRes?.data)
            ? gradesRes.data
            : Array.isArray(gradesRes)
              ? gradesRes
              : [];

          setNotesData(
            lapses.map((lapso) => ({
              id: lapso.id,
              id_lapse: lapso.id,
              name: lapso.name,
              is_active: lapso.is_active,
              students: flatGrades.filter((g) => g.lapse_name === lapso.name),
            })),
          );
        }

        // 2. Procesar Alumnos de la Sección
        if (studentsRes?.error) {
          toast.error(studentsRes.error);
        } else {
          setAlumnosDisponibles(
            Array.isArray(studentsRes)
              ? studentsRes
              : (studentsRes?.data ?? []),
          );
        }

        // 3. Guardar Evaluaciones ya limpias y sin duplicados
        setActivities(activitiesRes);
      } catch (error) {
        console.error("Error cargando datos de la sección:", error);
        toast.error("Hubo un problema al sincronizar la información");
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchMateriaData();
  }, [selectedSubject?.id_load_academic, SIG, lapses, refreshNotas]);

  if (loading || loadingPantalla) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "Profesor") {
    return <AccessDenied />;
  }
  console.log(notesData);
  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row">
        <HeaderDashbord titelPage={"Cargar notas"} />
      </div>

      <div className="mt-6 flex flex-col gap-5 p-3 font-bold text-gray-500/60">
        <div className="flex flex-col justify-between md:flex-row md:items-center lg:flex-row">
          {subjects.length > 0 && (
            <div className="max-w-xs">
              <Selector
                options={subjects.map((subject) => ({
                  value: subject.code_subject,
                  label: `${subject.name} - ${subject.year_name}`,
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
          {activeLapse && selectedSubject && (
            <div>
              <Button
                classNameBtn={
                  "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
                }
                icon={faPlus}
                disabled={!activeLapse || !selectedSubject}
                onClick={() => setIsModalOpen(true)}
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
                  activities={
                    activities.find((a) => a.id_lapse === activeLapse?.id)
                      ?.list ?? []
                  }
                  onSave={() => setRefreshNotas((prev) => !prev)}
                  onCancel={() => setIsModalOpen(false)}
                />
              </Modal>
            </div>
          )}
        </div>

        {loadingNotes ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 border-dashed bg-slate-100/50 p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
            <Icon icon={faInfoCircle} className="text-2xl text-slate-500" />
            Cargando notas...
          </div>
        ) : (
          lapses.map((lapso) => (
            <TablaNotas
              data={lapso}
              students={alumnosDisponibles}
              activities={
                activities.find((a) => a.id_lapse === lapso.id)?.list ?? []
              }
              notes={
                notesData.find(
                  (n) => n.id === lapso.id || n.id_lapse === lapso.id,
                )?.students ?? []
              }
              key={lapso.id}
            />
          ))
        )}
      </div>
    </>
  );
}
