"use client";

import { useState } from "react";
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
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function CardSection({
  id,
  grade,
  identifier,
  teacher,
  current,
  max,
  availableStudents = [],
  period,
  preinscriptionStudent = [],
  id_section,
  students,
  sectionStudents,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPre, setIsOpenPre] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // 'lista' | 'consolidado' | null

  const isFull = current >= max;
  const listaEstudiantes = students || sectionStudents || [];

  // Mapeamos internamente la función para controlar los estados de carga individuales
  const handleDownload = async (url, type) => {
    setLoadingType(type);
    try {
      const respose = await axios.get(url, {
        withCredentials: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const blob = respose.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;

      // Nombre personalizado según el tipo de reporte
      a.download = `${type}_${grade}_${identifier}_${new Date().getTime()}.pdf`;

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
        } catch (parseError) {
          toast.error("Error en el servidor al procesar el archivo");
        }
      } else {
        toast.error(
          "Hubo un fallo de conexión al intentar descargar el reporte",
        );
      }
    } finally {
      setLoadingType(null); // Apaga el estado de carga siempre (éxito o error)
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* Encabezado */}
      <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
        <h3 className="text-lg font-bold">
          {grade} <span className="opacity-80">&quot;{identifier}&quot;</span>
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${isFull ? "bg-red-500" : "bg-emerald-500"}`}
        >
          {isFull ? "LLENO" : "DISPONIBLE"}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center gap-3 text-slate-600">
          <Icon icon={faChalkboardUser} className="text-indigo-500" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Docente Guía
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {teacher || "No asignado"}
            </p>
          </div>
        </div>

        {/* Progreso de Capacidad */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>
              {current} de {max} estudiantes
            </span>
            <span>{max > 0 ? Math.round((current / max) * 100) : 0}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${isFull ? "bg-red-500" : "bg-indigo-500"}`}
              style={{ width: `${max > 0 ? (current / max) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer de Acciones */}
      <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/30">
        <div className="grid grid-cols-2 gap-2">
          {/* BOTÓN DE LISTA */}
          <button
            type="button"
            disabled={listaEstudiantes.length === 0 || loadingType !== null}
            onClick={() =>
              handleDownload(
                `${process.env.NEXT_PUBLIC_API_URL}/reports/sectionList/${id}`,
                "lista",
              )
            }
            className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 transition-colors"
          >
            {loadingType === "lista" ? (
              <span className="animate-pulse">Cargando...</span>
            ) : (
              <>
                <Icon icon={faPrint} /> Lista
              </>
            )}
          </button>

          {/* BOTÓN DE ACTA */}
          <button
            type="button"
            disabled={listaEstudiantes.length === 0 || loadingType !== null}
            onClick={() =>
              handleDownload(
                `${process.env.NEXT_PUBLIC_API_URL}/reports/noteSheet/${id}`,
                "consolidado",
              )
            }
            className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {loadingType === "consolidado" ? (
              <span className="animate-pulse">Cargando...</span>
            ) : (
              <>
                <Icon icon={faFilePdf} /> Acta
              </>
            )}
          </button>
        </div>

        {availableStudents.length > 0 && (
          <Button
            onClick={() => setIsOpen(true)}
            classNameBtn="w-full text-xs font-medium text-slate-500 hover:text-green-600 py-1"
          >
            <Icon icon={faUserPlus} className="mr-2" /> Inscribir Estudiante
          </Button>
        )}
        {preinscriptionStudent.length > 0 && (
          <Button
            onClick={() => setIsOpenPre(true)}
            classNameBtn="w-full text-xs font-medium text-slate-500 hover:text-green-600 py-1"
          >
            <Icon icon={faUserPlus} className="mr-2" /> Añadir a esta Seccion
          </Button>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Inscribir Estudiante"
      >
        <FormAssignStudent
          students={availableStudents}
          period={period}
          id_section={id_section}
        />
      </Modal>

      {/* Modal de preinscripcion */}
      <Modal
        isOpen={isOpenPre}
        onClose={() => setIsOpenPre(false)}
        title="Inscribir Estudiante"
      >
        <FormAssignStudent
          students={preinscriptionStudent}
          period={period}
          id_section={id_section}
          mode="preInscrip"
        />
      </Modal>
    </div>
  );
}
