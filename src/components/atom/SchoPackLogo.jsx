import Image from "next/image";
/**
 * Logo de SchoPack que recibe una clase para adaptar el color dependiendo del fondo.
 *
 * @componet
 * @param {string} className - Clase para ajustar el color de SIGACE
 * @returns {JSX.Element}
 */
export default function SchoPackLogo({ className = "text-slate-500" }) {
  return (
    <div className="group flex cursor-pointer items-center gap-2">
      <div className="flex items-center justify-center">
        <Image src="/favicon.ico" alt="Logo SchoPack" width={50} height={50} />
      </div>
      <div className="flex flex-col">
        <h1
          className={`${className} text-3xl leading-none font-bold tracking-tight`}
        >
          Scho<span className={`text-cyan-600`}>Pack</span>
        </h1>
        <p className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
          El Pack para tu escuela
        </p>
      </div>
    </div>
  );
}
