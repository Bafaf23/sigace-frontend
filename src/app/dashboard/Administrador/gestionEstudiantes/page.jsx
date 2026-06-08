"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import PlanillaInscripsion from "@/docs/PlanillaInscripsion";
import { getStudents } from "@/services/student/getStudents";
import {
  faAdd,
  faBook,
  faGenderless,
  faEllipsisV,
  faIdCard,
  faEdit,
  faTrash,
  faUser,
  faCalendar,
  faUserTie,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useEffect } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading } = useAuth();
  const [isOpent, setIsOpent] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const SIG = user?.user?.SIG;
  const authority = user?.user?.token;
  const id_period = user?.user?.id_period;

  useEffect(() => {
    if (!SIG || !authority) return;

    const fetchStudents = async () => {
      try {
        const data = await getStudents(SIG, authority);
        setStudents(data);
      } catch (error) {
        console.error("Error al traer los estudiantes:", error);
      }
    };

    fetchStudents();
  }, [SIG, authority]);

  if (loading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;
  console.log(students);
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Gestion de Estudiantes"} />
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
          {/* Al pasarle las variables aquí, ya estamos 100% seguros de que existen */}
          <FormInscrip SIG={SIG} authority={authority} id_period={id_period} />
        </Modal>
      </div>

      {/* Modal para ver información del estudiante */}
      <Modal
        title="Información del Estudiante"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <FormInscrip mode="edit" student={selectedStudent} />
      </Modal>

      {/* Tabla de estudiantes */}
      <TableInsti
        titelTable={[
          { name: "Número de matrícula", icon: faIdCard },
          { name: "Nombre y Apellido", icon: faUser },
          { name: "Edad", icon: faCalendar },
          { name: "Contacto", icon: faGenderless },
          { name: "Representante Legal", icon: faUserTie },
          { name: "Grado y Sección", icon: faBook },
          { name: "Aciones", icon: faBook },
        ]}
        data={students}
        loading={loading}
        renderTableRows={(student) => (
          <tr
            key={student.id}
            className="transition-colors hover:bg-slate-50/50"
          >
            <td className="px-6 py-4">
              <div className="flex flex-col gap-1">
                <Button
                  icon={faIdCard}
                  classNameBtn="font-bold text-cyan-700 text-sm uppercase tracking-wide border border-cyan-700/10 rounded-md px-2 py-1 inline-flex items-center bg-cyan-50 w-fit cursor-pointer hover:bg-cyan-100 hover:text-cyan-700 transition-all duration-300 hover:underline"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsOpenModal(true);
                  }}
                >
                  {student.tuition_number}
                </Button>
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
            <td className="px-6 py-4 text-center text-slate-500">
              <div className="flex flex-col gap-1">
                <span className=" text-slate-500">
                  {new Date(student.birth_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-slate-500">{student.gender}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-center text-slate-500 font-medium">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">{student.phone}</span>
                <span className="text-sm text-slate-500">{student.email}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-center text-slate-700">
              <div className="flex flex-col gap-1">
                <span className="text-ms text-slate-700 font-bold">
                  {student.representative_name}{" "}
                  {student.representative_last_name}
                </span>
                <span className="text-sm text-slate-500">
                  {student.representative_phone}
                </span>
                <span className="text-sm text-slate-500">
                  ({student.representative_relationship})
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-center text-slate-700">
              <div className="flex flex-col gap-1">
                {student.id_year ? (
                  <span className="text-sm text-slate-500">{student.year}</span>
                ) : (
                  <span className="text-sm text-slate-500">
                    No tiene año asignado
                  </span>
                )}
                {student.id_section ? (
                  <span className="text-sm font-bold text-cyan-700">
                    {student.section}
                  </span>
                ) : (
                  <span className="text-sm text-slate-500">
                    No tiene sección asignada
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <PDFDownloadLink
                key={student.tuition_number}
                // 📄 Pasamos el documento limpio con sus datos
                document={
                  <PlanillaInscripsion
                    data={student}
                    institution={"U.E.N Juna de Escalona"}
                  />
                }
                // 💾 El nombre del archivo se define aquí en el contenedor
                fileName={`Planilla_${student.tuition_number}_inscripcion.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <button
                    type="button"
                    disabled={loading}
                    // ✨ Tus estilos de Tailwind aplicados directamente al botón interactivo
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generando...
                      </>
                    ) : (
                      "Descargar Planilla"
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            </td>
          </tr>
        )}
        renderMovilCard={(student) => (
          <div
            className="flex flex-col gap-2 p-5 bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-slate-200 relative overflow-hidden"
            key={student.id}
          >
            {/* Cabecera: Matrícula y Nombre Principal */}
            <div className="flex flex-col border-b border-slate-100 pb-2 mb-1">
              <span className="text-xs font-mono font-semibold text-indigo-500 tracking-wider">
                {student.tuition_number || "SIN MATRÍCULA"}
              </span>
              <h3 className="text-base font-bold text-slate-800 capitalize">
                {student.name.toLowerCase()} {student.last_name.toLowerCase()}
              </h3>
            </div>

            {/* Información del Estudiante */}
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

            {/* Información del Representante (Bloque visual separado) */}
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

            {/* Pie de Tarjeta: Estatus de la sección (LÓGICA DEL NUEVO FLUJO) */}
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
                // 🟡 Si acaba de ser registrado y está esperando cupo (Badge de Alerta)
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
