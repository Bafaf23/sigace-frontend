"use client";

import Loading from "@/app/loading";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import ConfirmActionModal from "@/components/molecules/ConfirmAtionModal";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Pagination from "@/components/molecules/Pagination";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { getStudents } from "@/services/student/getStudents";
import {
  faAdd,
  faBook,
  faIdCard,
  faUser,
  faClipboardList,
  faInfo,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading: authLoading } = useAuth();

  const [isOpent, setIsOpent] = useState(false);
  const [isOpentC, setIsOpentC] = useState(false);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // Definición centralizada y memorizada para cargar estudiantes
  const fetchStudentsData = useCallback(
    async (targetPage = page) => {},
    [page],
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setDataLoading(true);
        const res = await getStudents({ page, serchs: appliedFilter });
        setStudents(res?.data ?? []);
        setPagination(res?.pagination ?? null);
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [user, page, appliedFilter]);

  // Carga inicial y por cambio de página
  useEffect(() => {
    if (user) {
      fetchStudentsData(page);
    }
  }, [user, page, fetchStudentsData]);

  const handlePageChange = (newPage) => {
    if (newPage && newPage !== page) {
      setPage(newPage);
    }
  };

  // Limpieza del filtro al vaciar el input
  if (authLoading) return <Loading />;
  if (
    !user ||
    user.user.role === "estudiante" ||
    user.user.role === "profesor"
  ) {
    return <AccessDenied />;
  }

  const handleSearch = () => {
    setAppliedFilter(search);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out space-y-3">
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Gestion de Estudiantes
      </h2>

      {/* Modales */}
      <Modal
        maxWidth="max-w-3xl"
        title="Crear Estudiante"
        isOpen={isOpent}
        onClose={() => setIsOpent(false)}
      >
        <FormInscrip
          mode="insc"
          onSuccess={() => {
            fetchStudentsData(1);
            setIsOpent(false);
          }}
        />
      </Modal>

      <Modal
        titel="Información del Estudiante"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <FormInscrip
          mode="edit"
          student={selectedStudent}
          onSuccess={() => {
            fetchStudentsData(page);
            setIsOpenModal(false);
          }}
        />
      </Modal>

      <ConfirmActionModal
        isOpen={isOpentC}
        titel={"Desarrollando solucion"}
        message={"Este reporte se encuentra en desarrollo por el momento."}
        variant="info"
        confirmLabel="Cerrar"
        onConfirm={() => setIsOpentC(false)}
        onCancel={() => setIsOpentC(false)}
      />

      <Banner
        icon={faInfo}
        titel="Más información"
        message="Para conocer la ficha detallada del estudiante, haz clic sobre el número de matrícula."
      />

      {/* Filtros y Métricas Rápidas */}
      <section>
        <div className="mb-4 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-center dark:border-zinc-700/50 dark:bg-zinc-900/60">
          <div className="w-full sm:max-w-md">
            <Search
              placeholder="Numero de matrícula"
              search={search}
              setSearch={setSearch}
              onSearch={handleSearch}
            />
          </div>

          <div className="flex w-full flex-col items-stretch justify-end gap-3 sm:w-auto sm:flex-row sm:items-center">
            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                loading={dataLoading}
              />
            )}
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => setIsOpent(true)}
                icon={faAdd}
                classNameBtn="bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-colors p-3 rounded-xl text-white font-semibold cursor-pointer flex items-center justify-center gap-2 text-sm shadow-sm shadow-orange-500/20 w-full whitespace-nowrap"
              >
                Crear Estudiante
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla y Renderizado de Datos */}
      {dataLoading ? (
        <SkeletonCard />
      ) : (
        <div>
          <TableInsti
            titelTable={[
              { name: "Número de Matrícula", icon: faIdCard },
              { name: "Nombre y Apellido", icon: faUser },
              { name: "Grado y Sección", icon: faBook },
              { name: "Acciones", icon: faClipboardList },
            ]}
            data={students}
            renderTableRows={(student) => (
              <tr
                key={student.id}
                className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50 dark:border-zinc-800 dark:hover:bg-zinc-800/30"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href={`/dashboard/administrador/gestionEstudiantes/${student.id}`}
                      className="inline-flex w-fit items-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold tracking-wide text-cyan-700 uppercase transition-colors hover:bg-cyan-500/20 dark:text-cyan-400"
                    >
                      {student.tuition_number}
                    </Link>
                    <span
                      className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase ${
                        student.condition === "nuevo_ingreso"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-orange-500/10 text-orange-600"
                      }`}
                    >
                      {student.condition?.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-md font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-orange-400">
                      {student.user?.name} {student.user?.last_name}
                    </span>
                    <span className="mt-0.5 text-sm text-slate-400">
                      {student.user?.id_card}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {student.enrollment ? (
                    <div className="flex flex-col gap-1">
                      <span className="w-fit rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {student.enrollment.year?.name} - Sección &quot;
                        {student.enrollment.section?.name}&quot;
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Sin inscripción
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {student.enrollment && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_API_URL}/reports/${student.id}/enrollment`}
                        target="_blank"
                      >
                        <Button
                          icon={faClipboardList}
                          titel="Descargar Planilla de Inscripción"
                          classNameBtn="p-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                        />
                      </Link>
                    )}
                    <Button
                      icon={faFileCircleCheck}
                      onClick={() => setIsOpentC(true)}
                      titel="Constacia de Estudio"
                      classNameBtn="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                    />
                  </div>
                </td>
              </tr>
            )}
            renderMovilCard={(student) => (
              <div
                key={`movil-${student.id}`}
                className="mb-3 flex flex-col gap-3 rounded-2xl border border-dashed border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <div>
                    <span className="block font-mono text-[10px] font-bold tracking-wider text-indigo-500">
                      {student.tuition_number || "?"}
                    </span>
                    <h3 className="mt-0.5 text-sm font-bold text-slate-800 capitalize dark:text-slate-200">
                      {student.user?.name} {student.user?.last_name}
                    </h3>
                  </div>

                  {student.enrollment && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_API_URL}/reports/${student.id}/enrollment`}
                      target="_blank"
                    >
                      <Button
                        titel="Descargar Planilla de inscripcion"
                        classNameBtn="text-cyan-600 p-1.5 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/10"
                      >
                        <Icon icon={faClipboardList} className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="text-slate-400">C.I:</span>{" "}
                    {student.user?.id_card}
                  </p>

                  <p className="col-span-2 truncate">
                    <span className="text-slate-400">Email:</span>{" "}
                    {student.user?.email || "N/A"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <div className="flex gap-1">
                    <span className="rounded-md border border-indigo-500/10 bg-indigo-500/10 px-2 py-0.5 font-bold text-indigo-600">
                      {student.enrollment?.year?.name || `Sin año`}
                    </span>
                    <span className="rounded-md bg-slate-500/10 px-2 py-0.5 font-bold text-slate-700 dark:text-slate-300">
                      Sección {student.enrollment?.section?.name || "N/A"}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      student.condition === "nuevo_ingreso"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-orange-500/10 text-orange-600"
                    }`}
                  >
                    {student.condition?.replace("_", " ")}
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
