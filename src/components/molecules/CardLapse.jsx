"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import ConfirmAtionModal from "@/components/molecules/ConfirmAtionModal";
import {
  faPlay,
  faCheckCircle,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CardLapse({
  lapse,
  onIniciar,
  onFinalizar,
  isLoading,
}) {
  const [isConfirmClose, setIsConfirmClose] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  // 1. Determinar el estado visual del lapso
  const isCurrent = lapse.is_active === true || lapse.is_active === 1;
  const isPast = !isCurrent && new Date(lapse.end_date) < new Date();
  const isFuture = !isCurrent && new Date(lapse.start_date) > new Date();

  // 2. Formatear fechas de forma amigable (Ej: 15 de Sep, 2026)
  const formatFecha = (fechaStr) => {
    return new Date(fechaStr).toLocaleDateString("es-VE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
        isCurrent
          ? "bg-linear-to-br from-indigo-50/40 to-transparent border-indigo-500 shadow-xl shadow-indigo-500/5 dark:from-indigo-950/20 dark:border-indigo-500"
          : isPast
            ? "bg-slate-50/50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 opacity-75"
            : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800"
      }`}
    >
      {/* BADGE DE ESTADO (Esquina Superior Derecha) */}
      <div className="absolute top-6 right-6">
        {isCurrent && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-green-700 bg-green-50 rounded-full dark:bg-green-950/40 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            En Curso Actualmente
          </span>
        )}
        {isPast && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full dark:bg-slate-800 dark:text-slate-400">
            Concluido de forma exitosa
          </span>
        )}
        {isFuture && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full dark:bg-amber-950/30 dark:text-amber-400">
            <Icon icon={faClock} className="w-4 h-4" />
            En Espera
          </span>
        )}
      </div>

      {/* DETALLES DEL LAPSO */}
      <div className="space-y-4">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Planificación Académica
          </p>
          <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-0.5">
            {lapse.name}
          </h4>
        </div>

        {/* CONTENEDOR DE FECHAS */}
        <div className="grid grid-cols-2 gap-4 bg-white dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Apertura
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
              <Icon icon={faCalendarAlt} className="text-indigo-500 text-xs" />
              {formatFecha(lapse.start_date)}
            </span>
          </div>
          <div className="border-l border-slate-100 dark:border-slate-800 pl-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Cierre
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
              <Icon icon={faCalendarAlt} className="text-rose-500 text-xs" />
              {formatFecha(lapse.end_date)}
            </span>
          </div>
        </div>

        {/* ACCIONES DINÁMICAS (Botones de Control de UX) */}
        <div className="pt-2 flex justify-end">
          {isFuture && (
            <>
              <Button
                icon={faPlay}
                disabled={isLoading}
                onClick={() => setIsConfirmOpen(true)}
                classNameBtn="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 transition-all cursor-pointer"
              >
                Iniciar Lapso Escolar
              </Button>
              <ConfirmAtionModal
                isOpen={isConfirmOpen}
                onCancel={() => setIsConfirmOpen(false)}
                title="Abrir lapso"
                message={`¿Estás seguro de querer abrir este lapso? Este proceso es irreversible y abrirá el lapso académico ${lapse.name}.`}
                onConfirm={() => {
                  setIsConfirmOpen(false);
                  onIniciar(lapse.id);
                }}
                variant="info"
              />
            </>
          )}

          {isCurrent && (
            <>
              <Button
                icon={faCheckCircle}
                disabled={isLoading}
                onClick={() => setIsConfirmClose(true)}
                classNameBtn="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/10 transition-all cursor-pointer"
              >
                Cerrar Lapso
              </Button>
              <ConfirmAtionModal
                isOpen={isConfirmClose}
                onCancel={() => setIsConfirmClose(false)}
                title="Cerrar lapso"
                message={`¿Estás seguro de querer cerrar este lapso? Este proceso es irreversible y cerrará  ${lapse.name}.`}
                onConfirm={() => {
                  setIsConfirmClose(false);
                  onFinalizar(lapse.id);
                }}
                variant="danger"
              />
            </>
          )}

          {isPast && (
            <p className="text-xs font-semibold text-slate-400 italic">
              Las calificaciones de este lapso han sido archivadas en el
              historial.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
