"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import SkeletonCard from "@/components/atom/SkeletonCard";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getStudents } from "@/services/student/getStudents";
import {
  faAdd,
  faBook,
  faIdCard,
  faUser,
  faClipboardList,
  faCalendar,
  faUserTie,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect, useCallback, startTransition } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading: authLoading } = useAuth();

  const [isOpent, setIsOpent] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  // Carga de catálogo de alumnos
  const loadStudents = useCallback((silent = false) => {
    if (!silent) setDataLoading(true);

    getStudents()
      .then((res) => {
        const studentsList = res?.data ?? res ?? [];
        startTransition(() => {
          setStudents(studentsList);
        });
      })
      .catch((error) => {
        console.error(
          "❌ [SIGACE UI]: Error crítico al recuperar matrícula escolar:",
          error,
        );
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadStudents();
  }, [user, loadStudents]);

  // Limpieza del input de búsqueda
  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setAppliedFilter(search);
  };

  // Filtrado reactivo
  const filteredStudents = students.filter((student) => {
    const cedulaStr = String(student?.document || "");
    const nameStr = String(student?.name || "");
    const lastNameStr = String(student?.last_name || "");
    const completeTerm = `${cedulaStr} ${nameStr} ${lastNameStr}`.toLowerCase();

    return completeTerm.includes(appliedFilter.toLowerCase().trim());
  });

  if (authLoading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Sección Superior: Header y Botón Crear */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-1">
        <HeaderDashbord titelPage="Gestión de Estudiantes" />
        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setIsOpent(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-600 hover:bg-indigo-700 transition-all p-2.5 rounded-xl text-slate-50 font-semibold cursor-pointer flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-500/10 w-full"
          >
            Crear Estudiante
          </Button>
        </div>
      </div>

      {/* Modales */}
      <Modal
        title="Crear Estudiante"
        isOpen={isOpent}
        onClose={() => setIsOpent(false)}
      >
        <FormInscrip
          onSuccess={() => {
            loadStudents(true);
            setIsOpent(false);
          }}
        />
      </Modal>

      <Modal
        title="Información del Estudiante"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <FormInscrip
          mode="edit"
          student={selectedStudent}
          onSuccess={() => {
            loadStudents(true);
            setIsOpenModal(false);
          }}
        />
      </Modal>

      {/* Filtros y Métricas Rápidas */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-500/5 backdrop-blur-md border border-slate-500/10 rounded-2xl mb-4">
        <div className="w-full sm:max-w-md">
          <Search
            placeholder="Buscar por cédula o nombre..."
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
          />
        </div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-500/10 px-3 py-1.5 rounded-xl border border-slate-500/10 whitespace-nowrap">
          Matrícula: {filteredStudents.length} de {students.length}
        </p>
      </div>

      {/* Renderizado de Estructura de Datos */}
      {dataLoading ? (
        <div className="p-3">
          <SkeletonCard />
        </div>
      ) : (
        <TableInsti
          titelTable={[
            { name: "Número de Matrícula", icon: faIdCard },
            { name: "Nombre y Apellido", icon: faUser },
            { name: "Edad / Género", icon: faCalendar },
            { name: "Contacto Alumno", icon: faUser },
            { name: "Representante Legal", icon: faUserTie },
            { name: "Grado y Sección", icon: faBook },
            { name: "Acciones", icon: faClipboardList },
          ]}
          data={filteredStudents}
          renderTableRows={(student) => (
            <tr
              key={student.id}
              className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30 group border-b border-slate-100 dark:border-slate-800"
            >
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                  <Link
                    href={`/dashboard/Administrador/gestionEstudiantes/${student.id}`}
                    className="font-bold text-cyan-700 dark:text-cyan-400 text-xs uppercase tracking-wide border border-cyan-500/20 rounded-lg px-2.5 py-1 inline-flex items-center bg-cyan-500/10 w-fit hover:bg-cyan-500/20 transition-colors"
                  >
                    {student.tuition_number}
                  </Link>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full w-fit ${student.status === "Activo" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                  >
                    {student.condition}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {student.name} {student.last_name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono mt-0.5">
                    {student.document}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                <div className="flex flex-col">
                  <span>
                    {student.birth_date
                      ? new Date(student.birth_date).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            timeZone: "UTC",
                          },
                        )
                      : "N/A"}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {student.gender || "No registrado"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {student.phone || "Sin tlf"}
                  </span>
                  <span className="text-xs text-slate-400 max-w-[140px] truncate">
                    {student.email}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {student.representative_name}{" "}
                    {student.representative_last_name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {student.representative_phone}
                  </span>
                  <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold mt-0.5">
                    ({student.representative_relationship || "Tutor"})
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  {student.id_year ? (
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 w-fit">
                      {student.year}
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md font-medium border border-amber-500/10 w-fit">
                      Sin año
                    </span>
                  )}
                  {student.id_section ? (
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      Sección {student.section}
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md font-medium border border-amber-500/10 w-fit">
                      Sin sección
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {/* Comprobante de inscripción directo a la API del Back */}
                  {!student.year_name && !student.section_name && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_API_URL}/reports/planillaIns/${student.id}/${student.representative_id}`}
                      target="_blank"
                    >
                      <Button
                        title="Descargar Planilla"
                        classNameBtn="p-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                      >
                        <Icon icon={faClipboardList} className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                  {/* Notas Certificadas */}
                  <Button
                    onClick={() =>
                      alert("Esta opción no está disponible por el momento")
                    }
                    title="Descargar Notas Certificadas"
                    classNameBtn="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                  >
                    <Icon icon={faAward} className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          )}
          // 📱 Vista Móvil (Limpiada de lógicas pesadas de PDF)
          renderMovilCard={(student) => (
            <div
              key={`movil-${student.id}`}
              className="flex flex-col gap-3 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-3 border-dashed"
            >
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-500 tracking-wider block">
                    {student.tuition_number || "SIN MATRÍCULA"}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize mt-0.5">
                    {student.name?.toLowerCase()}{" "}
                    {student.last_name?.toLowerCase()}
                  </h3>
                </div>

                {/* En mobile ahora también dispara la descarga limpia directo de tu Back endpoint */}
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/reports/planillaIns/${student.id}/${student.representative_id}`}
                  target="_blank"
                >
                  <button className="text-cyan-600 p-1.5 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/10">
                    <Icon icon={faClipboardList} className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <p>
                  <span className="text-slate-400">C.I:</span>{" "}
                  {student.document}
                </p>
                <p>
                  <span className="text-slate-400">Género:</span>{" "}
                  {student.gender || "N/A"}
                </p>
                <p className="col-span-2 truncate">
                  <span className="text-slate-400">Email:</span>{" "}
                  {student.email || "N/A"}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-500/5 p-2 rounded-xl text-xs">
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                  Representante Legal:
                </p>
                <p className="capitalize font-medium text-slate-800 dark:text-slate-200">
                  {student.representative_name?.toLowerCase()}{" "}
                  {student.representative_last_name?.toLowerCase()}{" "}
                  <span className="text-slate-400 font-normal">
                    ({student.representative_relationship || "Tutor"})
                  </span>
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {student.representative_phone}
                </p>
              </div>

              <div className="pt-1 flex justify-between items-center text-[11px]">
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 font-bold bg-indigo-500/10 text-indigo-600 rounded-md border border-indigo-500/10">
                    {student.year_name || `${student.id_year || "?"}° Año`}
                  </span>
                  <span className="px-2 py-0.5 font-bold bg-slate-500/10 text-slate-700 dark:text-slate-300 rounded-md">
                    Sección {student.section_name || student.id_section || "?"}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${student.status === "Activo" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                >
                  {student.status}
                </span>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}
