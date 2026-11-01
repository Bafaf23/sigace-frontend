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

  const isCurrent = lapse.is_active === true;
  const isPast = !isCurrent && new Date(lapse.end_date) < new Date();
  const isFuture = !isCurrent && new Date(lapse.start_date) > new Date();

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
          ? "bg-white border-orange-500/50 shadow-xl shadow-orange-500/5 dark:from-orange-500/10 dark:border-orange-500/40 dark:bg-zinc-900"
          : isPast
            ? "bg-slate-50/50 border-slate-200 dark:bg-zinc-900/40 dark:border-zinc-800/80 opacity-75"
            : "bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800"
      }`}
    >
      {/* BADGE DE ESTADO */}
      <div className="absolute top-6 right-6">
        {isCurrent && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full dark:bg-emerald-950/50 dark:text-emerald-400 dark:border dark:border-emerald-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            En Curso
          </span>
        )}
        {isPast && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full dark:bg-zinc-800 dark:text-zinc-400">
            Concluido de forma exitosa
          </span>
        )}
        {isFuture && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full dark:bg-amber-950/40 dark:text-amber-400 dark:border dark:border-amber-800/40">
            <Icon icon={faClock} className="w-3.5 h-3.5" />
            En Espera
          </span>
        )}
      </div>

      {/* DETALLES DEL LAPSO */}
      <div className="space-y-4">
        <div>
          <p className="text-xs font-black text-slate-400 dark:text-zinc-400 uppercase tracking-widest">
            Planificación Académica
          </p>
          <h4 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-0.5">
            {lapse.name}
          </h4>
        </div>

        {/* CONTENEDOR DE FECHAS */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50/60 dark:bg-zinc-950 p-3 rounded-2xl border border-slate-100 dark:border-zinc-800/80 shadow-inner">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 uppercase block">
              Apertura
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 flex items-center gap-1.5 mt-0.5">
              <Icon
                icon={faCalendarAlt}
                className="text-orange-500 dark:text-orange-400 text-xs"
              />
              {formatFecha(lapse.start_date)}
            </span>
          </div>
          <div className="border-l border-slate-200 dark:border-zinc-800 pl-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 uppercase block">
              Cierre
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 flex items-center gap-1.5 mt-0.5">
              <Icon
                icon={faCalendarAlt}
                className="text-rose-500 dark:text-rose-400 text-xs"
              />
              {formatFecha(lapse.end_date)}
            </span>
          </div>
        </div>

        {/* ACCIONES DINÁMICAS */}
        <div className="pt-2 flex justify-end">
          {isFuture && (
            <>
              <Button
                icon={faPlay}
                disabled={isLoading}
                onClick={() => setIsConfirmOpen(true)}
                classNameBtn="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/10 transition-all cursor-pointer dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                Iniciar Lapso Escolar
              </Button>
              <ConfirmAtionModal
                isOpen={isConfirmOpen}
                onCancel={() => setIsConfirmOpen(false)}
                titel="Abrir lapso"
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
                classNameBtn="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/10 transition-all cursor-pointer dark:bg-rose-600 dark:hover:bg-rose-700"
              >
                Cerrar Lapso
              </Button>
              <ConfirmAtionModal
                isOpen={isConfirmClose}
                onCancel={() => setIsConfirmClose(false)}
                titel="Cerrar lapso"
                message={`¿Estás seguro de querer cerrar este lapso? Este proceso es irreversible y cerrará ${lapse.name}.`}
                onConfirm={() => {
                  setIsConfirmClose(false);
                  onFinalizar(lapse.id);
                }}
                variant="danger"
              />
            </>
          )}

          {isPast && (
            <p className="text-xs font-semibold text-slate-400 dark:text-zinc-400 italic">
              Las calificaciones de este lapso han sido archivadas en el
              historial.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
