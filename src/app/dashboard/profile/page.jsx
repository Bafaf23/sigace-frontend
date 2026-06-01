"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import QuickActions from "@/components/molecules/QuickActions";
import { useAuth } from "@/context/AuthContext";
import {
  faEdit,
  faInfoCircle,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function displayOrUnset(value) {
  if (value == null || value === "") return "No asignado";
  return String(value);
}

export default function ProfilePage() {
  const { user, loading, handleLogout } = useAuth();

  if (loading || !user?.user) {
    return <Loading />;
  }

  const u = user.user;
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  const subtitleParts = [
    u.rol ? (
      <span key="rol" className="capitalize">
        {u.rol}
      </span>
    ) : null,
    u.schoolName ? (
      <span key="school" className="text-slate-600">
        {u.schoolName}
      </span>
    ) : null,
    u.email ? (
      <span key="email" className="break-all text-slate-600">
        {u.email}
      </span>
    ) : null,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-5xl p-3">
      <header className="mb-6 px-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-indigo-600">
            <span className="text-3xl font-bold tracking-tighter text-white uppercase">
              {u.name.charAt(0)}
              {u.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold capitalize text-slate-600">
              {u.name} {u.lastName}
            </h1>
            {subtitleParts.length > 0 && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                {subtitleParts.map((part, i) => (
                  <span
                    key={part.key ?? i}
                    className="inline-flex items-center gap-x-2"
                  >
                    {i > 0 && (
                      <span className="select-none text-slate-300" aria-hidden>
                        ·
                      </span>
                    )}
                    {part}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
        <div>
          <Icon icon={faBell} className="text-slate-500 text-2xl" />
        </div>
      </header>
      <QuickActions />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-6">
        {/* Datos personales */}
        <section
          className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          aria-labelledby="personal-heading"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <h2
              id="personal-heading"
              className="text-2xl font-bold text-indigo-600"
            >
              Datos personales
            </h2>
            <button
              type="button"
              disabled
              title="Próximamente podrás editar tu perfil desde aquí."
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-transparent px-2 py-1 text-sm font-medium text-slate-400"
            >
              <Icon icon={faEdit} className="text-base text-slate-400" />
              Editar
            </button>
          </div>

          <dl className="space-y-3 text-sm sm:text-base grid grid-cols-2  md:grid-cols-none gap-4">
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Cédula</dt>
              <dd className="text-slate-800">{displayOrUnset(u.dni)}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Nombre</dt>
              <dd className="capitalize text-slate-800">
                {displayOrUnset(u.name)}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Apellido</dt>
              <dd className="text-slate-800">{displayOrUnset(u.lastName)}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Email</dt>
              <dd className="break-all text-slate-800">
                {displayOrUnset(u.email)}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Teléfono</dt>
              <dd className="text-slate-800">
                {u.phone ? u.phone : "Sin teléfono registrado"}
              </dd>
            </div>
          </dl>

          <div
            className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950"
            rol="note"
          >
            <span className="mt-0.5 shrink-0 text-amber-700" aria-hidden>
              <Icon icon={faInfoCircle} className="text-amber-700" />
            </span>
            <p>
              Si hay un error en tu cédula u otros datos oficiales,{" "}
              {supportEmail ? (
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-medium text-amber-900 underline decoration-amber-700/60 underline-offset-2 hover:text-amber-950"
                >
                  escribe a soporte
                </a>
              ) : (
                <span className="font-medium">
                  contacta al administrador de tu plantel
                </span>
              )}
              .
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs text-slate-500">
              ID de usuario (útil para soporte):{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">
                {u.id}
              </code>
            </p>
          </div>
        </section>
        {/* Datos del plantel */}
        <section
          className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between"
          aria-labelledby="school-heading"
        >
          <div className="border-b border-slate-100 pb-3">
            <h2
              id="school-heading"
              className="text-2xl font-bold text-cyan-600"
            >
              Datos del plantel
            </h2>
          </div>

          <dl className="space-y-3 text-sm sm:text-base">
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Código SIG</dt>
              <dd className="text-slate-800 font-bold">
                {displayOrUnset(u.SIG)}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Plantel</dt>
              <dd className="text-slate-800">{displayOrUnset(u.schoolName)}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(7.5rem,auto)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-slate-600">Cargo</dt>
              <dd className="capitalize text-slate-800">
                {displayOrUnset(u.rol)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs leading-relaxed text-slate-500">
              El código SIG identifica a tu institución en el sistema. Los
              cambios de plantel o cargo los gestiona la administración central.
            </p>
            <hr className="border-slate-100 my-2" />
            <p className="text-xs text-slate-500">
              Recuerda, no compartas el código SIG con terceros.
            </p>
          </div>
        </section>
      </div>
      <div className="mt-6 lg:hidden">
        <Button
          icon={faRightFromBracket}
          classNameBtn="w-full bg-red-500 text-white hover:bg-red-600 rounded-2xl p-3 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-red-700/50"
          onClick={() => handleLogout()}
        >
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );
}
