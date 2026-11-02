"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import FormAssignStudent from "../organism/FormAssignStudent";
import Modal from "../organism/Modal";
import {
  faChalkboardUser,
  faUserPlus,
  faPrint,
  faFilePdf,
  faUsers,
  faList,
  faDashboard,
  faSubtract,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CardSection({
  id,
  grade,
  identifier,
  teacher,
  current = 0,
  max = 0,
  availableStudents = [],
  idTeacher,
  period,
  preinscriptionStudent = [],
  id_section,
  idYearSection,
  students,
  sectionStudents,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPre, setIsOpenPre] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

  const safeStudents = Array.isArray(students)
    ? students
    : Array.isArray(sectionStudents)
      ? sectionStudents
      : [];

  const safeAvailable = Array.isArray(availableStudents)
    ? availableStudents
    : [];

  const safePreinscription = Array.isArray(preinscriptionStudent)
    ? preinscriptionStudent
    : [];

  const studentCount = safeStudents.length;
  const currentStudents = typeof current === "number" ? current : studentCount;
  const maxCapacity = typeof max === "number" && max > 0 ? max : 1;
  const isFull = currentStudents >= maxCapacity;
  const percentage = Math.min(
    100,
    Math.round((currentStudents / maxCapacity) * 100),
  );

  const handleDownload = async (url, type) => {
    setLoadingType(type);
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${type}_${grade}_${identifier}_${Date.now()}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Reporte descargado con éxito");
    } catch (error) {
      console.error("Error al descargar reporte:", error);

      if (error.response && error.response.data) {
        try {
          const textoError = await error.response.data.text();
          const dataError = JSON.parse(textoError);
          toast.error(dataError.message || "Error al generar el reporte");
        } catch {
          toast.error("Error en el servidor al procesar el archivo");
        }
      } else {
        toast.error("Fallo de conexión al descargar el reporte");
      }
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <>
      {/* Modales */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titel="Inscribir Estudiante"
      >
        <FormAssignStudent
          students={safeAvailable}
          idYear={idYearSection}
          period={period}
          id_section={id_section}
          onSuccess={() => setIsOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isOpenPre}
        onClose={() => setIsOpenPre(false)}
        titel="Añadir a esta Sección (Preinscripción)"
      >
        <FormAssignStudent
          students={safePreinscription}
          period={period}
          id_section={id_section}
          idYear={idYearSection}
          mode="preInscrip"
          onSuccess={() => setIsOpenPre(false)}
        />
      </Modal>
      <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-800">
        {/* Encabezado */}
        <div>
          <div className="flex items-center justify-between bg-linear-to-r from-cyan-600 to-cyan-600/50 via-cyan-500/80 p-4 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                <Icon icon={faUsers} className="text-white text-sm" />
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight">
                  {grade || "Año / Año"}
                </h3>
                <p className="text-xs font-semibold text-cyan-100">
                  Sección &quot;{identifier || "-"}&quot;
                </p>
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                isFull
                  ? "bg-rose-500/20 text-rose-200 border border-rose-400/30"
                  : "bg-emerald-500/20 text-white border border-emerald-400/30"
              }`}
            >
              {isFull ? "Cupo Lleno" : "Cupo disponible"}
            </span>
          </div>

          {/* Cuerpo con Información */}
          <div className="space-y-4 p-4">
            {/* Docente Guía */}
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-zinc-600/50">
              <div className="mt-0.5 rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950/50">
                <Icon
                  icon={faChalkboardUser}
                  className="text-cyan-600 dark:text-cyan-400 text-sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-300">
                  Docente Guía
                </p>
                <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {teacher || "No asignado"}
                </p>
                {idTeacher && (
                  <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                    C.I: {idTeacher}
                  </p>
                )}
              </div>
            </div>

            {/* Barra de Capacidad */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-zinc-400">
                <span>Capacidad de la Sección</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {currentStudents} / {maxCapacity} ({percentage}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    isFull
                      ? "bg-rose-500"
                      : percentage > 80
                        ? "bg-amber-500"
                        : "bg-cyan-600"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer y Acciones */}
        <div className="space-y-2.5 border-t border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
          {/* Descargas en Grid */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              icon={faList}
              type="button"
              disabled={studentCount === 0 || loadingType !== null}
              onClick={() =>
                handleDownload(
                  `${process.env.NEXT_PUBLIC_API_URL}/reports/${id}/list-section`,
                  "lista",
                )
              }
              classNameBtn="bg-cyan-600 px-3 text-md  text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingType === "lista" ? (
                <span>Cargando...</span>
              ) : (
                <span>Lista</span>
              )}
            </Button>

            {/*  <Button
              icon={faDashboard}
              type="button"
              disabled={studentCount === 0 || loadingType !== null}
              onClick={() =>
                handleDownload(
                  `${process.env.NEXT_PUBLIC_API_URL}/reports/${id}/noteSheet`,
                  "consolidado",
                )
              }
              classNameBtn="flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-3 py-2 text-md font-semibold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingType === "consolidado" ? (
                <span>Cargando...</span>
              ) : (
                <span>Rendimiento</span>
              )}
            </Button> */}

            <Button
              icon={faGraduationCap}
              type="button"
              disabled={studentCount === 0 || loadingType !== null}
              onClick={() =>
                handleDownload(
                  `${process.env.NEXT_PUBLIC_API_URL}/reports/${id}/rfre`,
                  "RFRE",
                )
              }
              classNameBtn="bg-green-600 text-md font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingType === "RFRE" ? (
                <span>Cargando...</span>
              ) : (
                <span>Resumen EMG (MPPE)</span>
              )}
            </Button>
          </div>

          {/* Acciones de Inscripción */}
          <div className="flex flex-col gap-1.5 pt-1">
            {safeAvailable.length > 0 && (
              <Button
                onClick={() => setIsOpen(true)}
                classNameBtn="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-1.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-100 hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
              >
                <Icon icon={faUserPlus} /> Inscribir Estudiante
              </Button>
            )}

            {safePreinscription.length > 0 && (
              <Button
                onClick={() => setIsOpenPre(true)}
                classNameBtn="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 py-1.5 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-300 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-400"
              >
                <Icon icon={faUserPlus} /> Añadir a esta Sección
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
