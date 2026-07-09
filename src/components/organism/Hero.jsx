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
      className="relative scroll-mt-24 overflow-hidden px-4 py-20 "
    >
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/4 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row">
        <div className="z-10 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Label
              label={"Gestión Inteligente"}
              className="bg-cyan-500/10 text-cyan-400"
            ></Label>
            <Label
              label={"Un ecosistema completo para tu institución"}
              className="bg-amber-500/10 text-amber-400"
            ></Label>
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-black text-indigo-600 md:text-6xl">
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
              className="group flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-500"
            >
              <Icon icon={faUserPlus} className="text-xl" />
              Registra tu institución
            </a>
            <Link
              href="#planes"
              className="relative z-50 flex items-center gap-2 rounded-xl border border-indigo-700 bg-indigo-800 px-8 py-3 font-bold text-slate-200 transition-all hover:bg-indigo-700"
            >
              <Icon icon={faCoins} className="text-xl" />
              Ver planes
            </Link>
          </div>
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <CardState
            icon={faUser}
            info={"5,240"}
            title={"Usuarios Activos"}
          ></CardState>

          <CardState
            title={"Instituciones Registradas"}
            info={"10"}
            icon={faStore}
          ></CardState>
        </div>
      </div>
    </section>
  );
}
