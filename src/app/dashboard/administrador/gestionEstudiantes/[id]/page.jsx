"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import AcademicRecord from "@/components/organism/AcademicRecord";
import FormInscrip from "@/components/organism/FromInscrip";
import Modal from "@/components/organism/Modal";
import { getPeriodStudent } from "@/services/enrollment/getPeriodStudent";
import { getRecordStudent } from "@/services/student/getRecordStudent";
import { getStudentByI } from "@/services/student/getStudentById";
import { getSubjectPending } from "@/services/student/getSubjectPending";
import {
  faArrowLeft,
  faFileClipboard,
  faFileLines,
  faGraduationCap,
  faInfoCircle,
  faShirt,
  faShoePrints,
  faEdit,
  faTag,
  faWeightHanging,
  faRulerVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StudentRecords() {
  const { id } = useParams();

  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [periodStudent, setPeriodStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const allStudentData = async () => {
      try {
        setLoading(true);

        const studentPromise = getStudentByI(id);
        const recordPromise = getRecordStudent(id);
        const periodStudentPromise = getPeriodStudent(id);
        const pendingSubjectsPromise = getSubjectPending(id);

        const [resStudent, dataPeriodStudent, dataSubjectPending, dataRecord] =
          await Promise.all([
            studentPromise,
            periodStudentPromise,
            pendingSubjectsPromise,
            recordPromise,
          ]);

        if (resStudent?.data) {
          setStudent(resStudent.data);
        } else if (dataRecord?.data) {
          setStudent(dataRecord.data);
        }

        // CORRECCIÓN 2: Guardar el array completo de inscripciones/períodos
        if (dataPeriodStudent?.data) {
          setPeriodStudent(
            Array.isArray(dataPeriodStudent.data)
              ? dataPeriodStudent.data
              : [dataPeriodStudent.data],
          );
        }

        // Si el servicio getSubjectPending retorna un array directo o un objeto con .pending
        const pendingData =
          dataSubjectPending?.data?.pending ||
          dataSubjectPending?.data ||
          dataSubjectPending;
        if (Array.isArray(pendingData)) {
          setPendingSubjects(pendingData);
        } else {
          setPendingSubjects([]);
        }
      } catch (error) {
        console.error("❌ Error al cargar expediente del estudiante:", error);
      } finally {
        setLoading(false);
      }
    };

    allStudentData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return (
      <section className="text-center p-20 max-w-md mx-auto">
        <div className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-900/50 mb-4">
          <p className="font-bold">Error de Carga</p>
          <p className="text-xs mt-1">
            No se pudo recuperar la información del estudiante en la base de
            datos de SIGACE.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          classNameBtn="text-md font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          Volver atrás
        </Button>
      </section>
    );
  }

  const profile = student?.physicalProfile || {};
  const sizes = profile.sizes || {};

  const shirtSize = sizes.shirt || "-";
  const pantsSize = sizes.pants || "-";
  const shoesSize = sizes.shoes || "-";
  const weight = profile.weight ? `${profile.weight} kg` : "-";
  const height = profile.height ? `${profile.height} cm` : "-";

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-6">
      <Button
        onClick={() => router.back()}
        icon={faArrowLeft}
        classNameBtn="font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex gap-1 items-center"
      >
        Volver atrás
      </Button>

      {/* Modal Edit */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titel="Editar Información del Estudiante"
      >
        <FormInscrip mode="edit" student={student} />
      </Modal>

      {/* HEADER DEL ESTUDIANTE */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/60 rounded-2xl p-6 shadow-sm gap-4 transition-colors">
        <div className="flex items-start w-full md:w-auto gap-3">
          <div>
            <h3 className="text-[12px] font-bold text-slate-400 dark:text-zinc-400 uppercase tracking-widest">
              Expediente Escolar
            </h3>
            <div className="flex gap-3 items-center">
              <h1 className="text-2xl font-black text-slate-800 dark:text-zinc-100 uppercase mt-1">
                {student.studentInfo?.firstName} {student.studentInfo?.lastName}
              </h1>
              <Button
                onClick={() => setIsOpen(true)}
                icon={faEdit}
                classNameBtn="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-lg transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <p className="text-slate-500 dark:text-zinc-400 font-mono text-sm">
                {student.studentInfo?.idCard || "Sin Cédula"}
              </p>
              <p className="text-slate-500 dark:text-zinc-300 font-medium text-sm truncate">
                {student.studentInfo?.email || "Sin correo"}
                <span className="text-slate-300 dark:text-zinc-600 mx-1.5">
                  /
                </span>
                {student.studentInfo?.phone || "Sin teléfono"}
              </p>
              {/* Tallas de uniforme y perfil físico */}
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 dark:border-zinc-700/60 bg-slate-50/80 dark:bg-zinc-800/80 px-3 py-1.5">
                <div
                  className="flex items-center gap-1.5"
                  titel="Talla de Camisa"
                >
                  <Icon
                    icon={faShirt}
                    className="text-xs text-amber-500 dark:text-amber-400"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                    {shirtSize}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  titel="Talla de Pantalón"
                >
                  <Icon
                    icon={faTag}
                    className="text-xs text-indigo-500 dark:text-indigo-400"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                    {pantsSize}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  titel="Talla de Calzado"
                >
                  <Icon
                    icon={faShoePrints}
                    className="text-xs text-emerald-500 dark:text-emerald-400"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                    {shoesSize}
                  </span>
                </div>
                <div className="h-3 w-px bg-slate-200 dark:bg-zinc-700" />
                <div className="flex items-center gap-1.5" titel="Peso">
                  <Icon
                    icon={faWeightHanging}
                    className="text-xs text-cyan-500 dark:text-cyan-400"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                    {weight}
                  </span>
                </div>
                <div className="flex items-center gap-1.5" titel="Estatura">
                  <Icon
                    icon={faRulerVertical}
                    className="text-xs text-rose-500 dark:text-rose-400"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                    {height}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONDICIÓN DEL ESTUDIANTE */}
        <div className="flex md:flex-col gap-2 items-start md:items-end justify-end w-full md:w-fit border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-zinc-800">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Estatus del Estudiante
          </span>
          {student.condition === "repitiente" ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 uppercase tracking-wide">
              Repitiente (Mismo Año)
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 uppercase tracking-wide">
              {student.condition || "Regular"} / Activo
            </span>
          )}
        </div>
      </section>

      {/* SECCIÓN DE DETALLES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUMNA IZQUIERDA: DATOS BÁSICOS */}
        <div className="md:col-span-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <Icon
              icon={faGraduationCap}
              className="text-amber-500 dark:text-amber-400"
            />
            Datos de la Inscripción
          </h2>

          <div className="grid grid-cols-2 place-items-center bg-amber-500 dark:bg-amber-600 p-3 rounded-xl shadow-inner text-center">
            <div>
              <label className="text-[11px] font-bold text-amber-100 block uppercase">
                Año
              </label>
              <span className="text-sm font-bold text-white uppercase block mt-0.5">
                {student.enrollment?.year || "Sin Asignar"}
              </span>
            </div>
            <div>
              <label className="text-[11px] font-bold text-amber-100 block uppercase">
                Sección
              </label>
              <span className="text-sm font-bold text-white uppercase block mt-0.5">
                {student.enrollment?.section || "Sin Asignar"}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/50 p-3 rounded-xl grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 block uppercase">
                Matrícula Escolar
              </label>
              <span className="text-md font-bold text-slate-700 dark:text-zinc-200 block mt-0.5">
                {student.tuitionNumber || "No asignado"}
              </span>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 block uppercase">
                SIG del Plantel
              </label>
              <span className="text-md font-bold text-cyan-600 dark:text-cyan-400 block mt-0.5">
                {student.school?.SIG || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: MATERIAS PENDIENTES */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/60 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-2">
            <h2 className="text-sm font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Icon
                icon={faFileClipboard}
                className="text-cyan-500 dark:text-cyan-400"
              />
              Materias Pendientes (Arrastre)
            </h2>
            <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/50">
              {pendingSubjects.length} Registradas
            </span>
          </div>

          {pendingSubjects.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-zinc-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 uppercase text-[9px] font-bold tracking-wider border-b border-slate-200 dark:border-zinc-800">
                    <th className="p-3">Asignatura</th>
                    <th className="p-3 text-center">Oport. 1</th>
                    <th className="p-3 text-center">Oport. 2</th>
                    <th className="p-3 text-center">Oport. 3</th>
                    <th className="p-3 text-center">Definitiva</th>
                    <th className="p-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                  {pendingSubjects.map((subject, index) => {
                    const finalGrade = parseFloat(subject.final_grade || 0);
                    const isPassed = finalGrade >= 10;
                    return (
                      <tr
                        key={subject.id || index}
                        className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        <td className="p-3">
                          <p className="text-xs font-bold text-slate-700 dark:text-zinc-200 uppercase">
                            {subject.name}
                          </p>
                          <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium">
                            Asignatura del año anterior
                          </p>
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600 dark:text-zinc-300">
                          {subject.opp_1_grade ?? "—"}
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600 dark:text-zinc-300">
                          {subject.opp_2_grade ?? "—"}
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600 dark:text-zinc-300">
                          {subject.opp_3_grade ?? "—"}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`font-mono text-xs font-black px-1.5 py-0.5 rounded ${
                              isPassed
                                ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60"
                                : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60"
                            }`}
                          >
                            {subject.final_grade ?? "—"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              subject.status === "APROBADA"
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50"
                                : subject.status === "REPROBADA"
                                  ? "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/50"
                                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/50"
                            }`}
                          >
                            {subject.status || "CURSANDO"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-zinc-800/40 border border-dashed border-slate-200 dark:border-zinc-700/60 rounded-xl">
              <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                Este Estudiante no posee asignaturas pendientes del año
                anterior.
              </p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-400 mt-0.5">
                Su estatus administrativo actual es regular sin deudas
                académicas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RÉCORD ACADÉMICO */}
      <section>
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/60 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 dark:border-zinc-800 pb-4 gap-2">
            <h2 className="text-sm font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Icon
                icon={faFileLines}
                className="text-orange-500 dark:text-orange-400"
              />
              Récord Académico Histórico
            </h2>
            <div className="border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/40 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Icon
                icon={faInfoCircle}
                className="text-amber-600 dark:text-amber-400 text-sm"
              />
              <p className="text-amber-700 dark:text-amber-300 text-xs font-semibold">
                Las notas se cargarán por periodo académico.
              </p>
            </div>
          </div>
          {periodStudent && (
            <AcademicRecord periodStudent={periodStudent} idStudent={id} />
          )}
        </div>
      </section>
    </div>
  );
}
