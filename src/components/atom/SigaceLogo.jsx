/**
 * Logo de SIGACE que recibe una clase para adaptar el color dependiendo del fondo.
 *
 * @componet
 * @param {string} className - Clase para ajustar el color de SIGACE
 * @returns {JSX.Element}
 */
export default function SigaceLogo({ className = "text-slate-100" }) {
  return (
    <div className="group flex cursor-pointer items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 shadow-lg shadow-cyan-500/20 transition-colors group-hover:bg-cyan-500">
        <span className="text-2xl font-black tracking-tighter text-white">
          S
        </span>
      </div>
      <div className="flex flex-col">
        <h1
          className={`${className} text-3xl leading-none font-bold tracking-tight`}
        >
          SIGA<span className={`text-cyan-500`}>CE</span>
        </h1>
        <p className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
          control de Estudios
        </p>
      </div>
    </div>
  );
}
