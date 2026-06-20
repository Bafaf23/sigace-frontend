"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import { getInfoProfile } from "@/services/user/getInfoProfile";
import {
  faEdit,
  faInfoCircle,
  faBell,
  faRightFromBracket,
  faIdCard,
  faSchool,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function displayOrUnset(value) {
  if (value == null || value === "") return "No asignado";
  return String(value);
}

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const data = await getInfoProfile();
      setUser(data);
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  console.log(user)
  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6 animate-fade-in">
      {/* HEADER PRINCIPAL - ESTILO DASHBOARD */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-500 to-indigo-700 shadow-md shadow-indigo-500/20">
            <span className="text-2xl font-extrabold tracking-tight text-white uppercase">
              {user?.name ? user.name.charAt(0) : ""}
              {user?.lastName
                ? user.lastName.charAt(0)
                : user?.last_name
                  ? user.last_name.charAt(0)
                  : ""}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 capitalize">
              {user?.name} {user?.last_name}
            </h1>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5 flex items-center gap-2">
              <span className="bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full capitalize text-xs">
                {user?.role || "Usuario"}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 text-xs">{user?.email}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
            <Icon icon={faBell} className="text-xl" />
          </button>
        </div>
      </header>

      {/* CUERPO CENTRAL ASIMÉTRICO */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Icon icon={faIdCard} className="text-indigo-500 text-base" />
              Información Personal
            </h2>
            <button
              type="button"
              disabled
              title="Próximamente podrás editar tu perfil."
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400 dark:bg-slate-800/50"
            >
              <Icon icon={faEdit} />
              Editar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cédula o ID
              </span>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                {displayOrUnset(user?.document)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Correo Electrónico
              </span>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200 break-all">
                {displayOrUnset(user?.email)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Nombres
              </span>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200 capitalize">
                {displayOrUnset(user?.name)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Apellidos
              </span>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200 capitalize">
                {displayOrUnset(user?.last_name)}
              </p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Teléfono de Contacto
              </span>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                {user?.phone ? user?.phone : "Sin teléfono registrado"}
              </p>
            </div>
          </div>

          {/* MENSAJE DE INFORMATIVO ATENUADO */}
          <div className="flex gap-3 rounded-2xl bg-amber-50/60 p-4 text-xs text-amber-900/90 dark:bg-amber-950/20 dark:text-amber-300">
            <Icon
              icon={faInfoCircle}
              className="text-amber-600 shrink-0 text-sm mt-0.5"
            />
            <p className="leading-relaxed">
              Si detectas inconsistencias en tus datos de identidad oficiales,
              por favor{" "}
              {supportEmail ? (
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-bold underline text-amber-800 dark:text-amber-400 hover:text-amber-950"
                >
                  escribe a soporte técnico
                </a>
              ) : (
                <span className="font-bold">
                  contacta a la dirección del plantel
                </span>
              )}
              .
            </p>
          </div>
        </section>

        {/* PANEL DERECHO: DATOS INSTITUCIONALES (TOMA 1 COLUMNA) */}
        <section className="space-y-6 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Icon icon={faSchool} className="text-cyan-500 text-base" />
                Institución
              </h2>
            </div>

            <div className="space-y-4">
              {user?.role !== "Estudiante" && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Código SIG Institucional
                  </span>
                  <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight font-mono block">
                    {displayOrUnset(user?.school?.SIG)}
                  </span>
                </div>
              )}
              <div className="space-y-1 px-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Centro Educativo
                </span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {displayOrUnset(user?.school?.name).toUpperCase()}
                </p>
              </div>

              <div className="space-y-1 px-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Cargo Asignado
                </span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {displayOrUnset(user?.role)}
                </p>
              </div>
            </div>
          </div>

          {/* NOTA DE PRIVACIDAD INTEGRADA AL FINAL */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-2">
            <p className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Icon icon={faShieldAlt} className="text-slate-400" />{" "}
              Confidencialidad SIGACE
            </p>
            <p className="leading-normal">
              El código SIG es un identificador crítico. No lo compartas bajo
              ninguna circunstancia.
            </p>
            <p className="font-mono text-[10px] text-slate-300 dark:text-slate-700 bg-slate-50 dark:bg-slate-950/30 p-1.5 rounded-md text-center break-all">
              ID: {user?.id}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-6 lg:hidden">
        <Button
          icon={faRightFromBracket}
          classNameBtn="w-full bg-slate-100 dark:bg-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold rounded-2xl p-3.5 flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-700/30 transition-all duration-200"
          onClick={() => handleLogout()}
        >
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );
}
