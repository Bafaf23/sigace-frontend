import Icon from "@/components/atom/Icon";
import Label from "@/components/atom/Label";
import { faUserPlus, faCoins } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const WA_LINK = "https://wa.link/urfdhq";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh md:min-h-[calc(100dvh-73px)] w-full items-center justify-center overflow-hidden px-4 py-12 flex-col"
    >
      <div className="bg-black absolute w-full h-full z-10 opacity-50 dark:opacity-70" />

      <Image src={"/bg-2.jpg"} fill alt="fondo hero" className="object-cover" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 md:flex-row">
        <div className="z-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Label
              label={"Gestión Inteligente"}
              className="bg-cyan-600/90 text-cyan-300"
            ></Label>
            <Label
              label={"La comodidad de trabajar en equipo"}
              className="bg-[#1FED92]/90 text-[#0f6e43]"
            ></Label>
          </div>
          <h1 className="mb-3 text-3xl leading-tight font-black text-white md:text-4xl">
            Optimiza al maximo la administracion
          </h1>
          <p className="mb-8 max-w-lg text-lg text-zinc-100">
            Inscripción, carga de notas y reportes académicos con una plataforma
            rápida y segura.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-500"
            >
              <Icon icon={faUserPlus} className="text-xl" />
              Contactar con ventas
            </Link>
            <Link
              href="#planes"
              className="flex items-center gap-2 rounded-xl border border-zinc-200  px-8 py-3 font-bold text-zinc-100 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-300/50"
            >
              <Icon icon={faCoins} className="text-xl" />
              Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
