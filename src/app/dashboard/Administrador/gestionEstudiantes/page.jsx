"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
// 🌟 SUGERENCIA: Si corriges el nombre del archivo a Search, recuerda cambiarlo aquí
import Serch from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import PlanillaInscripsion from "@/docs/PlanillaInscripsion";
import { getStudents } from "@/services/student/getStudents";
import {
  faAdd,
  faBook,
  faIdCard,
  faEdit,
  faTrash,
  faUser,
  faClipboardList,
  faCalendar,
  faUserTie,
  faAward,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading } = useAuth();
  const [isOpent, setIsOpent] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  const SIG = user?.user?.SIG;
  const id_period = user?.user?.id_period;

  useEffect(() => {
    if (!SIG ) return;

    const fetchStudents = async () => {
      try {
        const data = await getStudents(SIG, id_period);
        setStudents(data);
      } catch (error) {
        console.error("Error al traer los estudiantes:", error);
      }
    };

    fetchStudents();
  }, [SIG]);

  // Restablecer el filtro si el usuario limpia por completo el input
  useEffect(() => {
    if (search.trim() === "") {
      setAppliedFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setAppliedFilter(search);
  };

  // Filtrado optimizado evaluando múltiples campos (Cédula o Nombre)
  const filteredStudents = students.filter((student) => {
    const cedulaStr = String(student?.document || "");
    const nameStr = String(student?.name || "");
    const lastNameStr = String(student?.last_name || "");
    const completeTerm = `${cedulaStr} ${nameStr} ${lastNameStr}`.toLowerCase();

    return completeTerm.includes(appliedFilter.toLowerCase().trim());
  });

  if (loading) return <Loading />;

  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Gestión de Estudiantes"} />
        <div className="p-3">
          <Button
            onClick={() => setIsOpent(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-500 p-4 md:p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 w-full"
          >
            Crear Estudiante
          </Button>
        </div>

        {/* Modal para crear estudiante */}
        <Modal
          title="Crear Estudiante"
          isOpen={isOpent}
          onClose={() => setIsOpent(false)}
        >
          <FormInscrip SIG={SIG} id_period={id_period} />
        </Modal>
      </div>

      {/* Modal para ver/editar información del estudiante */}
      <Modal
        title="Información del Estudiante"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <FormInscrip mode="edit" student={selectedStudent} />
      </Modal>

      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* 🌟 CORREGIDO: Se añade el prop setSearch */}
        <Serch
          placeholder="Buscar por cédula..."
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />
        <p className="text-slate-500 font-medium whitespace-nowrap">
          Matrícula mostrada: {filteredStudents.length} de {students.length}
        </p>
      </div>

      {/* Tabla de estudiantes */}
      <TableInsti
        titelTable={[
          { name: "Número de Matrícula", icon: faIdCard },
          { name: "Nombre y Apellido", icon: faUser },
          { name: "Edad", icon: faCalendar },
          { name: "Contacto", icon: faUser },
          { name: "Representante Legal", icon: faUserTie },
          { name: "Grado y Sección", icon: faBook },
          { name: "Acciones", icon: faClipboardList },
        ]}
        data={filteredStudents}
        loading={loading}
        renderTableRows={(student) => (
          <tr
            key={student.id}
            className="transition-colors hover:bg-slate-50/50"
          >
            <td className="px-6 py-4">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/dashboard/Administrador/gestionEstudiantes/${student.id}`}
                  icon={faIdCard}
                  className="font-bold text-cyan-700 text-sm uppercase tracking-wide border border-cyan-700/10 rounded-md px-2 py-1 inline-flex items-center bg-cyan-50 w-fit cursor-pointer hover:bg-cyan-100 transition-all duration-300 hover:underline"
                >
                  {student.tuition_number}
                </Link>
                <span
                  className={`text-xs uppercase tracking-wide font-bold ${student.status === "Activo" ? "text-green-500" : "text-red-500"} w-fit`}
                >
                  {student.status}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 font-medium text-slate-500">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-700">
                  {student.name} {student.last_name}
                </span>
                <span className="text-xs text-slate-500">
                  {student.document}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-500">
              <div className="flex flex-col gap-1">
                <span>
                  {student.birth_date
                    ? new Date(student.birth_date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        timeZone: "UTC",
                      })
                    : "N/A"}
                </span>
                <span className="text-xs text-slate-500">{student.gender}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-500 font-medium">
              <div className="flex flex-col gap-1">
                <span className="text-sm">{student.phone}</span>
                <span className="text-sm truncate max-w-[150px]">
                  {student.email}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-700">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold">
                  {student.representative_name}{" "}
                  {student.representative_last_name}
                </span>
                <span className="text-sm text-slate-500">
                  {student.representative_phone}
                </span>
                <span className="text-xs text-indigo-500 font-semibold">
                  ({student.representative_relationship})
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-700">
              <div className="flex flex-col gap-1">
                {student.id_year ? (
                  <span className="text-sm text-slate-500">{student.year}</span>
                ) : (
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                    Sin año asignado
                  </span>
                )}
                {student.id_section ? (
                  <span className="text-sm font-bold text-cyan-700">
                    Sección {student.section}
                  </span>
                ) : (
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                    Sin sección
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsOpenModal(true);
                  }}
                  className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  title="Editar Estudiante"
                >
                  <Icon icon={faEdit} className="w-4 h-4" />
                </button>

                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/reports/planillaIns/${SIG}/${student.id}/${student.representative_id}`}
                  onClick={(e) => loading && e.preventDefault()}
                  target="_blank" // Recomendado para reportes/PDFs
                >
                  <button
                    type="button"
                    disabled={loading}
                    title="Descargar Planilla de Inscripción"
                    className="flex items-center justify-center p-2 rounded-lg bg-cyan-600 text-white transition-all hover:bg-cyan-700 active:scale-95 disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Icon icon={faClipboardList} className="w-4 h-4" />
                    )}
                  </button>
                </Link>

                <Link
                  href={`#`}
                  onClick={() =>
                    alert(`Este esta opcion no esta disponible por el moneto`)
                  }
                >
                  <button
                    type="button"
                    disabled={loading}
                    title="Descargar las notas Certificadas"
                    className="flex items-center justify-center p-2 rounded-lg bg-orange-500 text-white transition-all hover:bg-orange-700 active:scale-95 disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Icon icon={faAward} className="w-4 h-4" />
                    )}
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        )}
        renderMovilCard={(student) => (
          <div
            className="flex flex-col gap-2 p-5 bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-slate-200 relative overflow-hidden"
            key={`movil-${student.id}`}
          >
            <div className="flex flex-col border-b border-slate-100 pb-2 mb-1">
              <span className="text-xs font-mono font-semibold text-indigo-500 tracking-wider">
                {student.tuition_number || "SIN MATRÍCULA"}
              </span>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-slate-800 capitalize">
                  {student.name?.toLowerCase()}{" "}
                  {student.last_name?.toLowerCase()}
                </h3>
                <PDFDownloadLink
                  document={
                    <PlanillaInscripsion
                      data={student}
                      institution={"U.E.N Juana de Escalona"}
                    />
                  }
                  fileName={`Planilla_${student.tuition_number}_inscripcion.pdf`}
                >
                  {({ loading }) => (
                    <button
                      disabled={loading}
                      className="text-cyan-600 p-1 hover:bg-cyan-50 rounded"
                    >
                      <Icon
                        icon={loading ? faAdd : faClipboardList}
                        className="w-4 h-4"
                      />
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <p>
                <span className="font-medium text-slate-400">Nacimiento:</span>{" "}
                {student.birth_date
                  ? new Date(student.birth_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "UTC",
                    })
                  : "No registrada"}
              </p>
              <p className="truncate">
                <span className="font-medium text-slate-400">Email:</span>{" "}
                {student.email || "N/A"}
              </p>
              <p>
                <span className="font-medium text-slate-400">Telf:</span>{" "}
                {student.phone || "N/A"}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-50 bg-slate-50/50 p-2 rounded-lg text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-1">
                Representante:
              </p>
              <p className="capitalize font-medium text-slate-800">
                {student.representative_name?.toLowerCase()}{" "}
                {student.representative_last_name?.toLowerCase()}
                <span className="text-slate-400 font-normal lowercase">
                  {" "}
                  ({student.representative_relationship || "tutor"})
                </span>
              </p>
              <p className="text-slate-500 mt-0.5">
                {student.representative_phone}
              </p>
            </div>

            <div className="mt-auto pt-3 flex items-center justify-between gap-2">
              {student.id_year && student.id_section ? (
                <div className="flex gap-1.5 w-full">
                  <span className="px-2 py-1 text-[11px] font-bold bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
                    {student.year_name || `${student.id_year}° Año`}
                  </span>
                  <span className="px-2 py-1 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                    Sección {student.section_name || student.id_section}
                  </span>
                </div>
              ) : (
                <span className="w-full text-center px-2 py-1 text-[11px] font-bold bg-amber-50 text-amber-700 rounded-md border border-amber-200">
                  Pendiente por Asignar Aula
                </span>
              )}
            </div>
          </div>
        )}
      />
    </>
  );
}
