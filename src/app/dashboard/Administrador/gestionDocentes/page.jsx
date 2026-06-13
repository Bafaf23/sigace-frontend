"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import SkeletonCard from "@/components/atom/SkeletonCard";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
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
  faEllipsisV,
  faInfoCircle,
  faBuilding,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function GestionDocentesPage() {
  const [isOpent, setIsOpent] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.user?.SIG) {
      getTeachersAll(user.user.SIG, user.user.token)
        .then((data) => {
          setTeachers(data);
        })
        .catch((err) => console.error("Error al cargar docentes:", err));
    }
  }, [user, loading]);
  console.log(teachers);

  if (loading) return <Loading />;
  if (!user || user.user.role !== "Administrador") return <AccessDenied />;

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage={"Gestion de Docentes"} />
        <div className="p-3 hidden md:block lg:block">
          <Button
            onClick={() => setIsOpent(true)}
            icon={faAdd}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 hover:bg-indigo-600 transition-colors"
          >
            Crear Docente
          </Button>
        </div>
      </div>

      <Modal
        title="Crear Docente"
        isOpen={isOpent}
        onClose={() => setIsOpent(false)}
      >
        <FormRegister mode="create" />
      </Modal>

      <div className="md:hidden lg:hidden p-3 w-full">
        <Button
          onClick={() => setIsOpent(true)}
          icon={faAdd}
          classNameBtn="bg-indigo-500 p-4 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 hover:bg-indigo-600 transition-colors w-full"
        >
          Crear Docente
        </Button>
      </div>

      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          <TableInsti
            titelTable={[
              { name: "Cédula", icon: faIdCard },
              { name: "Docente", icon: faUser },
              { name: "Carga Académica (Materias)", icon: faBuilding },
              { name: "Contacto", icon: faPhone },
              { name: "Estatus", icon: faInfoCircle },
              { name: "Acciones", icon: faEllipsisV },
            ]}
            data={teachers}
            renderTableRows={(teacher) => (
              <tr
                key={teacher.id_teacher}
                className="transition-colors hover:bg-slate-50/50 group border-b border-slate-100"
              >
                <td className="px-6 py-4 font-medium text-slate-700 text-sm">
                  {teacher.document}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-indigo-950 group-hover:text-cyan-600 transition-colors text-sm">
                      {teacher.name} {teacher.last_name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {teacher.SIG}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {teacher.academic_load &&
                    teacher.academic_load.length > 0 ? (
                      teacher.academic_load.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                        >
                          {subject.subject_name} ({subject.code_subject})
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md font-medium italic">
                        Sin carga asignada
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-700">
                      {teacher.phone || "Sin Teléfono"}
                    </span>
                    <span>{teacher.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      teacher.is_active
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10"
                    }`}
                  >
                    {teacher.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 cursor-pointer flex gap-2">
                  {/* Aquí podrías abrir un menú desplegable o un modal de edición */}
                  <Button
                    icon={faEdit}
                    classNameBtn="p-1 text-slate-400 transition-colors hover:text-indigo-600"
                    onClick={() => console.log("Opciones", teacher.id)}
                  />
                  <Button
                    icon={faTrash}
                    classNameBtn="p-1 text-slate-400 transition-colors hover:text-red-600"
                    onClick={() => console.log("Opciones", teacher.id)}
                  />
                </td>
              </tr>
            )}
            // 📱 Vista Móvil (Responsive)
            renderMovilCard={(teacher) => (
              <div
                key={`card-teacher-${teacher.id_teacher}`}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm mb-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">
                      {teacher.document}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      {teacher.name} {teacher.last_name}
                    </h3>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-mono px-2 py-0.5 rounded">
                    {teacher.SIG}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div>
                    <strong className="text-slate-400 block mb-0.5">
                      Materias:
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects && teacher.subjects.length > 0
                        ? teacher.subjects.map((subject, i) => (
                            <span
                              key={i}
                              className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px]"
                            >
                              {subject.code} ({subject.section})
                            </span>
                          ))
                        : "Ninguna"}
                    </div>
                  </div>
                  <p>
                    <strong className="text-slate-400">Tlf:</strong>{" "}
                    {teacher.phone || "No registrado"}
                  </p>
                </div>
              </div>
            )}
          />
        </>
      )}
    </>
  );
}
