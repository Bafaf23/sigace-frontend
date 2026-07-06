"use client";

import Loading from "@/app/loading";
import Icon from "@/components/atom/Icon";
import Button from "@/components/atom/Button";
import SkeletonCard from "@/components/atom/SkeletonCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Search from "@/components/molecules/Serch";
import Banner from "@/components/atom/Banner";
import TableInsti from "@/components/molecules/TableInsti";
import FormRegister from "@/components/organism/FormRegister";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import {
  faAdd,
  faIdCard,
  faUser,
  faPhone,
  faInfoCircle,
  faBuilding,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, startTransition } from "react";

export default function GestionDocentesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { user, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);

  // Carga de catálogo de docentes
  const loadTeachers = useCallback((silent = false) => {
    if (!silent) setDataLoading(true);

    getTeachersAll()
      .then((res) => {
        // Axios + Interceptor: extrae la colección directa o aplica fallback defensivo
        const teachersList = res?.data ?? res ?? [];

        startTransition(() => {
          setTeachers(teachersList);
        });
      })
      .catch((err) =>
        console.error(
          "❌ [SIGACE UI]: Error al procesar nómina de docentes:",
          err,
        ),
      )
      .finally(() => setDataLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadTeachers();
  }, [user, loadTeachers]);

  // Limpieza controlada del input de búsqueda si se vacía el campo
  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setFilter(search);
  };

  // Filtrado optimizado sobre el estado local
  const filteredTeachers = teachers.filter((teacher) => {
    const cedulaStr = String(teacher?.document || "");
    const nameStr = String(teacher?.name || "");
    const lastNameStr = String(teacher?.last_name || "");
    const completeTerm = `${cedulaStr} ${nameStr} ${lastNameStr}`.toLowerCase();

    return completeTerm.includes(filter.toLowerCase().trim());
  });

  if (authLoading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Sección Superior: Header y Botón Desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-1">
        <HeaderDashbord titelPage="Gestión de Docentes" />
        <div className="hidden md:block">
          <Button
            onClick={() => setIsOpen(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-600 hover:bg-indigo-700 transition-all p-2.5 rounded-xl text-slate-50 font-semibold cursor-pointer flex items-center gap-2 text-sm shadow-md shadow-indigo-500/10"
          >
            Registrar Docente
          </Button>
        </div>
      </div>

      {/* Modal de Registro */}
      <Modal
        title="Registrar Nuevo Docente"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormRegister
          mode="create"
          onSuccess={() => {
            setIsOpen(false);
            loadTeachers(true);
          }}
        />
      </Modal>
      <section className="p-4">
        <Banner
          icon={faInfo}
          titel="¿Necesitas actualizar el estatus de un docente?"
          message="Para modificar la disponibilidad o el estado activo/inactivo de la nómina, por favor contacta a soporte técnico"
        />
      </section>
      {/* Botón de Acción para Entornos Móviles */}
      <div className="md:hidden p-3 w-full">
        <Button
          onClick={() => setIsOpen(true)}
          icon={faAdd}
          classNameBtn="bg-indigo-600 active:scale-95 transition-transform p-4 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full shadow-lg shadow-indigo-500/20"
        >
          Registrar Docente
        </Button>
      </div>

      {/* Barra de Filtros y Búsquedas */}
      <div className="p-3">
        <div className="max-w-md">
          <Search
            placeholder="Buscar por cédula o nombre..."
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Área de Datos: Tabla e Historial Reactivo */}
      {dataLoading ? (
        <div className="p-3">
          <SkeletonCard />
        </div>
      ) : (
        <div className="p-1">
          <TableInsti
            titelTable={[
              { name: "Cédula", icon: faIdCard },
              { name: "Docente", icon: faUser },
              { name: "Carga Académica (Materias)", icon: faBuilding },
              { name: "Contacto", icon: faPhone },
              { name: "Estatus", icon: faInfoCircle },
            ]}
            data={filteredTeachers}
            // 🖥️ Vista de Escritorio (Estructura de Filas)
            renderTableRows={(teacher) => (
              <tr
                key={teacher.id_teacher}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30 group border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300 text-sm">
                  {teacher.document}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                      {teacher.name} {teacher.last_name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono mt-0.5">
                      {teacher.SIG}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5 max-w-xs">
                    {teacher.academic_load &&
                    teacher.academic_load.length > 0 ? (
                      teacher.academic_load.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-lg bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                        >
                          {subject.subject_name} ({subject.code_subject})
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg font-medium italic">
                        Sin carga asignada
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {teacher.phone || "Sin Teléfono"}
                    </span>
                    <span>{teacher.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      teacher.is_active
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {teacher.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            )}
            // 📱 Vista Móvil (Tarjetas Flexibles)
            renderMovilCard={(teacher) => (
              <div
                key={`card-teacher-${teacher.id_teacher}`}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm mb-3 border-dashed"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block tracking-wider">
                      C.I. {teacher.document}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {teacher.name} {teacher.last_name}
                    </h3>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono px-2 py-0.5 rounded-lg border border-indigo-500/10">
                    {teacher.SIG}
                  </span>
                </div>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <strong className="text-slate-400 dark:text-slate-500 block mb-1 font-medium">
                      Materias Asignadas:
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.academic_load &&
                      teacher.academic_load.length > 0 ? (
                        teacher.academic_load.map((subject, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-medium border border-slate-200 dark:border-slate-700/60"
                          >
                            {subject.subject_name} ({subject.code_subject})
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          Ninguna carga activa
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-[11px] border-t border-slate-100 dark:border-slate-800/60">
                    <p>
                      <strong className="text-slate-400 dark:text-slate-500">
                        Tlf:
                      </strong>{" "}
                      {teacher.phone || "No registrado"}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        teacher.is_active
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-rose-500/10 text-rose-600"
                      }`}
                    >
                      {teacher.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
