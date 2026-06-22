"use client";

import axios from "axios";
import Button from "../atom/Button";
import Icon from "../atom/Icon";
import FormAssignStudent from "../organism/FormAssignStudent";
import Modal from "../organism/Modal";
import {
  faUsers,
  faChalkboardUser,
  faUserPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CardSecction({
  id,
  grade,
  identifier,
  teacher,
  current,
  max,
  availableStudents = [],
  period,
  id_section,
  students,
  sectionStudents,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // 'lista' | 'consolidado' | null
  const isFull = current >= max;

  const listaEstudiantes = students || sectionStudents || [];

  // Función genérica para descargar archivos usando Axios
  const handleDescargarPdf = async (endpoint, fileName, type) => {
    if (listaEstudiantes.length === 0) return;

    setLoadingType(type);
    try {
      const token = localStorage.getItem("token"); // O de donde extraigas el JWT

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          withCredentials: true,
          responseType: "blob", // 🔥 CRÍTICO: Indica a Axios que procese la respuesta como binaria
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token al backend protegido de SIGACE
            "Content-Type": "application/json",
          },
        },
      );

      // 🔥 CORRECCIÓN: Axios guarda el blob directamente en res.data
      const blob = res.data;
      const url = window.URL.createObjectURL(blob);

      // Creamos un enlace temporal en el DOM y lo cliqueamos por software
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Limpieza del DOM
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error descargando el reporte con Axios:", error);
      alert("No se pudo generar el PDF. Verifica tu conexión o sesión.");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Encabezado: Año y Sección */}
      <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
        <h3 className="text-xl font-bold">
          {grade} "{identifier}"
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${isFull ? "bg-red-500" : "bg-green-500"}`}
        >
          {isFull ? "LLENO" : "DISPONIBLE"}
        </span>
      </div>

      <div className="space-y-4 p-4">
        {/* Info del Docente Guía */}
        <div className="flex items-center gap-3 text-slate-600">
          <Icon icon={faChalkboardUser} className="w-5 text-indigo-500" />
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-200">
              Docente Guía
            </p>
            <p className="text-sm font-medium dark:text-slate-300">
              {teacher || "No asignado"}
            </p>
          </div>
        </div>

        {/* Capacidad y barra de progreso */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Icon icon={faUsers} /> Capacidad: {current}/{max}
            </span>
            <span>{max > 0 ? Math.round((current / max) * 100) : 0}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-indigo-500"}`}
              style={{ width: `${max > 0 ? (current / max) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer de Acciones */}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 p-3 md:justify-around dark:border-slate-800 dark:bg-slate-700">
        {/* Botón 1: Imprimir Lista de la Sección */}
        <button
          onClick={() =>
            handleDescargarPdf(
              `/reports/sectionList/${id_section}`,
              `Lista_${grade}_${identifier}.pdf`,
              "lista",
            )
          }
          disabled={listaEstudiantes.length === 0 || loadingType !== null}
          className={`flex items-center justify-center gap-2 p-2 px-3 rounded-lg text-sm font-medium text-white transition-all active:scale-95 ${
            listaEstudiantes.length === 0
              ? "bg-slate-400 cursor-not-allowed opacity-70"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {loadingType === "lista" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generando...</span>
            </>
          ) : listaEstudiantes.length === 0 ? (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Sección vacía</span>
            </>
          ) : (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Imprimir lista</span>
            </>
          )}
        </button>

        {/* Botón 2: Imprimir Consolidado de Notas (Acta) */}
        <button
          onClick={() =>
            handleDescargarPdf(
              `/reports/noteSheet/${id_section}`,
              `Consolidado_${grade}_${identifier}.pdf`,
              "consolidado",
            )
          }
          disabled={listaEstudiantes.length === 0 || loadingType !== null}
          className={`flex items-center justify-center gap-2 p-2 px-3 rounded-lg text-sm font-medium text-white transition-all active:scale-95 ${
            listaEstudiantes.length === 0
              ? "bg-slate-400 cursor-not-allowed opacity-70"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loadingType === "consolidado" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generando...</span>
            </>
          ) : listaEstudiantes.length === 0 ? (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Sección vacía</span>
            </>
          ) : (
            <>
              <Icon icon={faPrint} className="w-4 h-4" />
              <span>Imprimir Consolidado</span>
            </>
          )}
        </button>

        {/* Botón de inscripción */}
        {availableStudents.length > 0 && (
          <Button
            onClick={() => setIsOpen(true)}
            icon={faUserPlus}
            classNameBtn="text-slate-500 transition-colors hover:text-green-600 text-sm font-medium truncate dark:text-slate-200"
          >
            {"Inscribir Estudiante"}
          </Button>
        )}

        {/* Modal de Inscripción */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={"Inscribir Estudiante en Sección"}
        >
          <FormAssignStudent
            students={availableStudents}
            period={period}
            id_section={id_section}
          />
        </Modal>
      </div>
    </div>
  );
}
