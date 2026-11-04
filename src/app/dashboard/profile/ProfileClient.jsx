"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import Input from "@/components/atom/Input";
import ThemeToggle from "@/components/atom/ThemeToggle";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getInfoProfile } from "@/services/user/getInfoProfile";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import {
  faAlignCenter,
  faArrowLeftRotate,
  faBible,
  faBlind,
  faBlog,
  faBridgeLock,
  faDownLong,
  faEdit,
  faRightFromBracket,
  faSchool,
  faTrash,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function displayOrUnset(value) {
  if (value == null || value === "") return "No asignado";
  return String(value);
}

export default function ProfileClient() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const { handleLogout } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const data = await getInfoProfile();
      setUser(data.data);
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* HEADER PRINCIPAL - ADAPTADO A ZINC / ORANGE */}
      <header className="flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-slate-300/80 dark:border-zinc-800">
        <div className="border-b border-slate-200 pb-4 dark:border-zinc-800/80 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
            <Icon icon={faUser} className="text-orange-500 text-base" />
            Información del Perfil
          </h2>
          <div className="flex items-center gap-2">
            <Button
              icon={faEdit}
              classNameBtn="bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 font-bold rounded-2xl p-4 flex items-center justify-center gap-2.5 border border-cyan-200/60 dark:border-cyan-900/30 transition-all shadow-xs"
              onClick={() => setOpen(true)}
            ></Button>
            <ThemeToggle />
          </div>
        </div>

        <Modal
          title="Estamos trabajando para mejorar tu experiencia"
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <p className="text-slate-600 dark:text-zinc-400">
            Pronto podrás editar tu perfil.
          </p>
        </Modal>

        <div>
          <div className="flex md:items-center  flex-col md:flex-row md:justify-between gap-4 w-full ">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cyan-500 dark:bg-orange-500">
                <span className="text-3xl font-bold text-white uppercase">
                  {user?.name ? user.name.charAt(0) : ""}
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-zinc-100 capitalize">
                  {user?.name} {user?.last_name}
                </h1>
                <p className="font-medium text-cyan-600 dark:text-cyan-400 mt-0.5 flex items-center gap-2">
                  <span className="bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-0.5 rounded-full capitalize text-xs border border-cyan-200/60 dark:border-cyan-800/40">
                    {user?.role || "Usuario"}
                  </span>
                  <span className="text-xs dark:text-zinc-300 text-zinc-500">
                    {user?.id_card || "Usuario"}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full xl:w-auto">
              <Input
                id="email"
                label="Correo Electrónico"
                value={user?.email || ""}
                readOnly
              />
              <Input
                id="phone"
                label="Número de Teléfono"
                value={user?.phone || "Sin teléfono registrado"}
                readOnly
              />
            </div>
          </div>
        </div>
      </header>

      {/* PANEL DERECHO: DATOS INSTITUCIONALES */}
      <section className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-6">
          {/* Encabezado del Panel */}
          <div className="border-b border-slate-100 pb-4 dark:border-zinc-800/80">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-zinc-100">
              <Icon icon={faSchool} className="text-base text-orange-500" />
              Plantel Educativo
            </h2>
          </div>

          {/* Contenido Principal: Adaptable de 1 columna a 2 en pantallas medianas */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Datos del Plantel y Rol */}
            <div className="flex flex-wrap items-center gap-4">
              {user?.role !== "Estudiante" && (
                <div className="min-w-[140px] rounded-2xl border border-orange-200/60 bg-orange-50/50 p-4 dark:border-zinc-700/60 dark:bg-zinc-800/50">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Código SIG
                  </span>
                  <span className="block font-mono text-xl font-black tracking-tight text-orange-600 dark:text-orange-400">
                    {displayOrUnset(user?.school?.SIG)}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <div className="space-y-0.5 px-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Nombre
                  </span>
                  <p className="text-sm font-medium text-slate-700 dark:text-zinc-200">
                    {displayOrUnset(user?.school?.school_name).toUpperCase()}
                  </p>
                </div>

                <div className="space-y-0.5 px-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Rol
                  </span>
                  <p className="text-sm font-medium text-slate-700 dark:text-zinc-200 uppercase">
                    {displayOrUnset(user?.role)}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de Descarga de Archivos */}
            {user.role === "administrador" && (
              <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 dark:border-zinc-800 lg:items-end lg:border-t-0 lg:pt-0">
                <p className="text-slate-400 dark:text-zinc-400">
                  Descarga la información asociada
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    icon={faUser}
                    aria-label="Descargar listado de usuarios"
                    classNameBtn="bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold"
                  >
                    Usuarios
                  </Button>
                  <Button
                    icon={faBridgeLock}
                    aria-label="Descargar de calificaciones"
                    classNameBtn="bg-green-50 dark:bg-green-950/80 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/60 font-bold"
                  >
                    Calificaciones
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {user.role !== "Estudiante" && (
        <section className="flex flex-1 flex-col space-y-1">
          <div>
            <h2 className="text-lg font-bold text-red-500 flex items-center gap-2">
              <Icon icon={faTriangleExclamation} />
              Danger zone
            </h2>
          </div>
          <div>
            <div className="space-y-2">
              <div>
                <h5 className="dark:text-zinc-300 text-zinc-600 font-semibold text-sm">
                  Desactivar cuenta
                </h5>
                <p className="text-sm text-slate-500 dark:text-zinc-300">
                  Al desactivar tu cuenta, cuantas con 30 días para reactivarla.
                  Pasado este tiempo, tu cuenta será eliminada
                </p>
              </div>
              <Button
                icon={faTrash}
                classNameBtn="bg-red-200 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold"
              >
                Desactivar cuenta
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="mt-6 lg:hidden">
        <Button
          icon={faRightFromBracket}
          classNameBtn="w-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold rounded-2xl p-4 flex items-center justify-center gap-2.5 border border-red-200/60 dark:border-red-900/30 transition-all shadow-xs"
          onClick={handleLogout}
        >
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );
}
