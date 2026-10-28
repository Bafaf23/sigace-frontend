import Image from "next/image";

/**
 * Logo de SIGACE que recibe una clase para adaptar el color dependiendo del fondo.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.className - Clase para ajustar el color del texto del logo.
 * @returns {JSX.Element}
 */
export default function Logo({ className = "text-slate-500" }) {
  return (
    <div className="group flex cursor-pointer items-center gap-2">
      <div className="flex items-center justify-center">
        <Image
          src="/favicon.ico"
          alt="Logo SIGACE"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <h1
          className={`${className} text-xl lg:text-2xl leading-none font-bold tracking-tight`}
        >
          SIGA<span className="text-cyan-500">CE</span>
        </h1>
        <p className="lg:text-[10px] text-[8px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
          a un click
        </p>
      </div>
    </div>
  );
}
