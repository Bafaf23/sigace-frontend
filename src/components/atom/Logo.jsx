import Image from "next/image";

/**
 * Logo de SchoPack que recibe una clase para adaptar el color dependiendo del fondo.
 *
 * @componet
 * @param {string} className - Clase para ajustar el color de SIGACE
 * @returns {JSX.Element}
 */
export default function Logo({ className = "text-slate-500" }) {
  return (
    <div className="group flex cursor-pointer items-center gap-2">
      <div className="flex items-center justify-center">
        <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
      </div>
      <div className="flex flex-col">
        <h1
          className={`${className} text-3xl leading-none font-bold tracking-tight`}
        >
          SIGA<span className={`text-cyan-500`}>CE</span>
        </h1>
        <p className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
          a un click
        </p>
      </div>
    </div>
  );
}
