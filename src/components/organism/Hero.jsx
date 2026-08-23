import CardState from "@/components/atom/CardState";
import Icon from "@/components/atom/Icon";
import Label from "@/components/atom/Label";
import {
  faUserPlus,
  faStore,
  faCoins,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const WA_LINK = "https://wa.link/urfdhq";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-73px)] w-full items-center justify-center overflow-hidden px-4 py-12"
    >
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/4 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 md:flex-row">
        <div className="z-10 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Label
              label={"Gestión Inteligente"}
              className="bg-cyan-600/20 text-cyan-500"
            ></Label>
            <Label
              label={"Un ecosistema completo para tu institución"}
              className="bg-amber-600/20 text-amber-500"
            ></Label>
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-black text-salte-900 md:text-6xl">
            Control de Estudios <br />
            <span className="text-cyan-500 underline decoration-cyan-500/30">
              Inteligente
            </span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-slate-400">
            Optimiza la inscripción, carga de notas y reportes académicos del
            centro de estudio con una plataforma rápida y segura.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-500"
            >
              <Icon icon={faUserPlus} className="text-xl" />
              Registra tu institución
            </a>
            <Link
              href="#planes"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <Icon icon={faCoins} className="text-xl" />
              Ver planes
            </Link>
          </div>
        </div>

        <div className="z-10 grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <CardState
              icon={faUser}
              info="5,240"
              title="Usuarios Activos"
              description="Estudiantes, docentes y administrativos conectados diariamente."
              className="h-full bg-slate-900 text-white"
            />
          </div>

          {/* Tarjeta Secundaria 1 */}
          <div className="sm:col-span-1 lg:col-span-1">
            <CardState
              icon={faStore}
              info="10"
              title="Instituciones"
              className="h-full bg-cyan-50 border-cyan-100 text-cyan-900"
            />
          </div>

          {/* Tarjeta Secundaria 2 */}
          <div className="sm:col-span-1 lg:col-span-3">
            <CardState
              icon={faCoins}
              info="99.9%"
              title="Disponibilidad"
              className="h-full bg-amber-50 border-amber-100 text-amber-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
