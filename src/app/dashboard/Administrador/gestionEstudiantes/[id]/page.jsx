"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import AcademicRecord from "@/components/organism/AcademicRecord";
import { useAuth } from "@/context/AuthContext";
import { getRecordStudent } from "@/services/student/getRecordStudent";
import { getStudentByI } from "@/services/student/getStudentById";
import Modal from "@/components/organism/Modal";
import FormInscrip from "@/components/organism/FromInscrip";
import {
  faArrowLeft,
  faFileClipboard,
  faFileLines,
  faGraduationCap,
  faInfoCircle,
  faShirt,
  faShoePrints,
  faEdit,
  faSocks,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"; // 👈 IMPORTANTE: Añadido para evitar el ReferenceError

export default function StudentRecords() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recordStudent, setRecordStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const allStudentData = async () => {
      try {
        setLoading(true);

        const studentPromise = getStudentByI(id);
        const recordPromise = getRecordStudent(id);

        const [resStudent, dataRecord] = await Promise.all([
          studentPromise,
          recordPromise,
        ]);

        if (resStudent) {
          setStudent(resStudent.data);
        }

        if (dataRecord) {
          setRecordStudent(dataRecord);
        }

        // Obtener materias pendientes (arrastre) del backend de SIGACE
        try {
          const resPending = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/reports/pending-subjects/${id}`,
          );
          if (resPending.data) {
            setPendingSubjects(resPending.data.subjects || []);
          }
        } catch (pendingError) {
          console.warn(
            "⚠️ No se pudieron obtener materias pendientes:",
            pendingError.message,
          );
          setPendingSubjects([]);
        }
      } catch (error) {
        console.error("❌ Error al cargar expediente del estudiante:", error);
      }
      setLoading(false);
    };

    allStudentData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return (
      <section className="text-center p-20 max-w-md mx-auto">
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 mb-4">
          <p className="font-bold">Error de Carga</p>
          <p className="text-xs mt-1">
            No se pudo recuperar la información del estudiante en la base de
            datos de SIGACE.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          classNameBtn="text-md font-bold text-cyan-600 hover:underline"
        >
          Volver atrás
        </Button>
      </section>
    );
  }
  console.log(student);
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-6">
      <Button
        onClick={() => router.back()}
        icon={faArrowLeft}
        classNameBtn="font-bold text-cyan-600 hover:underline flex gap-1 items-center"
      >
        Volver atrás
      </Button>

      {/* Modal Edit */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        title={"Editar Información del Estudiante"}
      >
        <FormInscrip mode={"edit"} student={student} />
      </Modal>

      {/* HEADER DEL ESTUDIANTE */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm gap-4">
        <div className="flex items-start w-full md:w-auto gap-3">
          <div>
            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              Expediente Escolar
            </h3>
            <div className="flex gap-3 items-center">
              <h1 className="text-2xl font-black text-slate-800 uppercase mt-1">
                {student.name} {student.last_name}
              </h1>
              <Button
                onClick={() => setIsOpen(true)}
                icon={faEdit}
                classNameBtn="p-0.5 hover:bg-slate-100 rounded-lg transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <p className="text-slate-500 font-medium text-sm">
                {student.document || "Sin Cédula"}
              </p>

              {/* Tallas de uniforme */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 flex gap-3">
                <div className="flex gap-1 items-center">
                  <Icon icon={faShirt} className="text-sm text-orange-500" />
                  <span className="text-xs font-bold text-slate-600">
                    {student.shirt_size}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <Icon icon={faSocks} className="text-sm text-blue-500" />
                  <span className="text-xs font-bold text-slate-600">
                    {student.pants_size}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <Icon
                    icon={faShoePrints}
                    className="text-sm text-green-500"
                  />
                  <span className="text-xs font-bold text-slate-600">
                    {student.shoe_size}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONDICIÓN DEL ESTUDIANTE */}
        <div className="flex flex-col items-start md:items-end justify-end w-full md:w-fit border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Estatus del Estudiante
          </span>
          {student.condition === "Repitiente" ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-700 border border-red-200 uppercase tracking-wide">
              Repitiente (Mismo Año)
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
              {student.condition} / Activo
            </span>
          )}
        </div>
      </section>

      {/* SECCIÓN DE DETALLES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUMNA IZQUIERDA: DATOS BÁSICOS */}
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <Icon icon={faGraduationCap} />
            Datos de la Inscripción
          </h2>

          <div className="grid grid-cols-2 place-items-center bg-amber-500 p-3 rounded-xl shadow-inner text-center">
            <div>
              <label className="text-[11px] font-bold text-amber-100 block uppercase">
                Año
              </label>
              <span className="text-sm font-bold text-white uppercase block mt-0.5">
                {student.name_year || "Sin Asignar"}
              </span>
            </div>
            <div>
              <label className="text-[11px] font-bold text-amber-100 block uppercase">
                Sección
              </label>
              <span className="text-sm font-bold text-white uppercase block mt-0.5">
                {student.name_section || "Sin Asignar"}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block uppercase">
                Matrícula Escolar
              </label>
              <span className="text-xs font-bold text-slate-700 block mt-0.5">
                {student.tuition_number || "No asignado"}
              </span>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block uppercase">
                SIG del Plantel
              </label>
              <span className="text-xs font-bold text-cyan-500 block mt-0.5">
                {student.SIG || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: MATERIAS PENDIENTES */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Icon icon={faFileClipboard} className="text-cyan-500" />
              Materias Pendientes (Arrastre)
            </h2>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md border border-blue-100">
              {pendingSubjects.length} Registradas
            </span>
          </div>

          {pendingSubjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[9px] font-bold tracking-wider border-b border-slate-200">
                    <th className="p-3">Asignatura</th>
                    <th className="p-3 text-center">Oport. 1</th>
                    <th className="p-3 text-center">Oport. 2</th>
                    <th className="p-3 text-center">Oport. 3</th>
                    <th className="p-3 text-center">Definitiva</th>
                    <th className="p-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSubjects.map((subject, index) => {
                    const finalGrade = parseFloat(subject.final_grade || 0);
                    const isPassed = finalGrade >= 10;
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-3">
                          <p className="text-xs font-bold text-slate-700 uppercase">
                            {subject.subject_name}
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium">
                            Asignatura del año anterior
                          </p>
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600">
                          {subject.opp_1_grade !== null &&
                          subject.opp_1_grade !== undefined
                            ? String(subject.opp_1_grade).padStart(2, "0")
                            : "—"}
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600">
                          {subject.opp_2_grade !== null &&
                          subject.opp_2_grade !== undefined
                            ? String(subject.opp_2_grade).padStart(2, "0")
                            : "—"}
                        </td>
                        <td className="p-3 font-mono text-xs text-center text-slate-600">
                          {subject.opp_3_grade !== null &&
                          subject.opp_3_grade !== undefined
                            ? String(subject.opp_3_grade).padStart(2, "0")
                            : "—"}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`font-mono text-xs font-black px-1.5 py-0.5 rounded ${
                              isPassed
                                ? "text-blue-700 bg-blue-50"
                                : "text-red-600 bg-red-50"
                            }`}
                          >
                            {subject.final_grade !== null &&
                            subject.final_grade !== undefined
                              ? String(subject.final_grade).padStart(2, "0")
                              : "—"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              subject.status === "APROBADA"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : subject.status === "REPROBADA"
                                  ? "bg-red-50 text-red-700 border border-red-100"
                                  : "bg-amber-50 text-amber-700 border border-amber-100"
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
            <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
              <p className="text-xs font-medium text-slate-500">
                Este Estudiante no posee asignaturas pendientes del año
                anterior.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Su estatus administrativo actual es regular sin deudas
                académicas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RÉCORD ACADÉMICO */}
      <section>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Icon icon={faFileLines} className="text-orange-500" />
              Récord Académico Histórico
            </h2>
            <div className="border border-amber-200 bg-amber-50 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Icon icon={faInfoCircle} className="text-amber-600 text-sm" />
              <p className="text-amber-700 text-xs font-semibold">
                Las notas se cargarán por periodo académico.
              </p>
            </div>
          </div>
          {recordStudent && <AcademicRecord recordData={recordStudent} />}
        </div>
      </section>
    </div>
  );
}
