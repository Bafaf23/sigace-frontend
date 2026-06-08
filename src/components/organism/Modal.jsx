// components/organism/Modal.jsx
"use client";

import Button from "../atom/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    // 1. Manejo del Scroll del Body
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // 2. Cerrar al presionar la tecla Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Limpieza al desmontar o cerrar
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* CAPA DE FONDO (Backdrop) - Desenfoque sutil y transición suave */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* CONTENEDOR DE LA VENTANA (Modal Shell) */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} transform overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 animate-in fade-in zoom-in-95`}
      >
        {/* CABECERA (Header) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
          <h3
            id="modal-title"
            className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight capitalize"
          >
            {title}
          </h3>
          <Button
            icon={faTimes}
            classNameBtn="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={onClose}
            aria-label="Cerrar modal"
          />
        </div>

        {/* CUERPO DEL CONTENIDO (Children) */}
        <div className="mt-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
