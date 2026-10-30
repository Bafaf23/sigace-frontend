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
import { createGrade } from "@/services/grades/createGrade";
import { getGradeAcrivity } from "@/services/grades/getGradeActivity";
import { getLapses } from "@/services/lapse/getLapse";
import { getStudentSection } from "@/services/section/getStudentSection";
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
  const [EstudiantesDisponibles, setEstudiantesDisponibles] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [activities, setActivities] = useState([]);
  const [refreshNotas, setRefreshNotas] = useState(false);

  const activeLapse = lapses.find((lapse) => lapse.is_active === true);

  // 1. Carga inicial: Materias del Profesor
  useEffect(() => {
    const userId = user?.user?.id ?? user?.id;
    if (!userId) return;

    const loadPantallaInicial = async () => {
      try {
        setLoadingPantalla(true);
        const cargaResponse = await getLoadAcademic();

        const rawLoads =
          cargaResponse?.data?.load_academics ??
          cargaResponse?.data ??
          (Array.isArray(cargaResponse) ? cargaResponse : []);

        setSubjects(Array.isArray(rawLoads) ? rawLoads : []);
      } catch (error) {
        console.error("Error al cargar los datos de la pantalla:", error);
      } finally {
        setLoadingPantalla(false);
      }
    };

    loadPantallaInicial();
  }, [user?.user?.id, user?.id]);

  // 2. Carga de Lapsos de la escuela
  useEffect(() => {
    const fetchLapses = async () => {
      const response = await getLapses();
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      const rawLapses = response?.data ?? response;
      setLapses(Array.isArray(rawLapses) ? rawLapses : []);
    };

    fetchLapses();
  }, []);

  // 3. Sincronización de datos de la materia en paralelo
  useEffect(() => {
    const idLoadAcademic = selectedSubject?.id;
    const idSection = selectedSubject?.section?.id;

    if (!idLoadAcademic) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotesData([]);
      setEstudiantesDisponibles([]);
      setActivities([]);
      return;
    }

    let isMounted = true;

    const fetchMateriaData = async () => {
      setLoadingNotes(true);
      try {
        const currentLapses = Array.isArray(lapses) ? lapses : [];

        // Ejecutar estudiantes, evaluaciones y notas en paralelo
        const [studentsRes, activitiesRes, gradesRes] = await Promise.all([
          idSection ? getStudentSection(idSection) : Promise.resolve([]),
          currentLapses.length > 0
            ? Promise.all(
                currentLapses.map(async (lapso) => {
                  const res = await getEvaluation(idLoadAcademic, lapso.id);
                  const rawList = Array.isArray(res)
                    ? res
                    : Array.isArray(res?.data)
                      ? res.data
                      : [];

                  const uniqueList = rawList.filter(
                    (item, index, self) =>
                      item &&
                      item.id &&
                      self.findIndex((t) => t?.id === item.id) === index,
                  );

                  return {
                    id_lapse: lapso.id,
                    list: uniqueList,
                  };
                }),
              )
            : Promise.resolve([]),

          getGradeAcrivity(idLoadAcademic),
        ]);

        if (!isMounted) return;

        // Procesar notas
        const emptyGradesByLapse = currentLapses.map((lapso) => ({
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
          setNotesData(gradesRes.data);
        }

        // Procesar Estudiantes
        if (studentsRes?.error) {
          toast.error(studentsRes.error);
          setEstudiantesDisponibles([]);
        } else {
          const studentList = Array.isArray(studentsRes)
            ? studentsRes
            : Array.isArray(studentsRes?.data?.students)
              ? studentsRes.data.students
              : [];

          setEstudiantesDisponibles(studentList);
        }

        // Guardar Evaluaciones
        setActivities(Array.isArray(activitiesRes) ? activitiesRes : []);
      } catch (error) {
        console.error("Error cargando datos de la sección:", error);
        if (isMounted)
          toast.error("Hubo un problema al sincronizar la información");
      } finally {
        if (isMounted) setLoadingNotes(false);
      }
    };

    fetchMateriaData();

    return () => {
      isMounted = false;
    };
  }, [
    selectedSubject?.id,
    selectedSubject?.section?.id,
    refreshNotas,
    lapses.length,
    lapses,
  ]);

  // Handler para guardar o actualizar una nota individual desde la tabla
  const handleSaveGrade = async ({ id_student, id_evaluation, grade }) => {
    try {
      const response = await createGrade({
        id_student,
        id_evaluation,
        grade,
      });

      if (response?.error) {
        toast.error(response.error);
        throw new Error(response.error);
      }

      toast.success("Nota actualizada correctamente");
      setRefreshNotas((prev) => !prev);
    } catch (error) {
      console.error("Error guardando calificación:", error);
      throw error;
    }
  };

  if (loading || loadingPantalla) return <Loading />;

  const role = user?.user?.role ?? user?.role;
  if (!user || role !== "profesor") {
    return <AccessDenied />;
  }

  return (
    <div className="flex flex-col gap-5 font-bold">
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Calificaciones
      </h2>
      <div className="flex flex-col justify-between md:flex-row md:items-center lg:flex-row gap-4 w-full">
        {subjects.length > 0 && (
          <div className="max-w-xs">
            <Selector
              options={subjects.map((item) => ({
                value: item.id.toString(),
                label: `${item.subject?.name ?? ""} - ${item.section?.year?.name ?? ""} "${item.section?.name ?? ""}"`,
              }))}
              name="materia"
              label="Asignatura"
              value={selectedSubject?.id?.toString() ?? ""}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const subject = subjects.find((s) => s.id === selectedId);
                if (subject) setSelectedSubject(subject);
              }}
            />
          </div>
        )}

        {activeLapse && selectedSubject && (
          <div>
            <Button
              classNameBtn={
                "bg-orange-500 px-5 py-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center gap-1 w-full"
              }
              icon={faPlus}
              disabled={!activeLapse || !selectedSubject}
              onClick={() => setIsModalOpen(true)}
            >
              Carga individual
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Cargar Calificaciones"
            >
              <FormCargaNotas
                listaEstudiantesSinNotas={EstudiantesDisponibles}
                activities={
                  activities.find((a) => a.id_lapse === activeLapse?.id)
                    ?.list ?? []
                }
                onSave={() => {
                  setRefreshNotas((prev) => !prev);
                  setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            </Modal>
          </div>
        )}
      </div>

      {loadingNotes ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 border-dashed bg-slate-100/50 p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
          <Icon
            icon={faInfoCircle}
            className="text-2xl text-slate-500 animate-pulse"
          />
          Cargando notas...
        </div>
      ) : (
        lapses.map((lapso) => {
          return (
            <TablaNotas
              key={lapso.id}
              data={lapso}
              students={EstudiantesDisponibles}
              activities={
                activities.find((a) => a.id_lapse === lapso.id)?.list ?? []
              }
              notes={notesData}
              onSaveGrade={handleSaveGrade}
            />
          );
        })
      )}
    </div>
  );
}
