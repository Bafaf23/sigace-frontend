import FondoDecorativo from "@/components/atom/FondoDecorativo";
import Icon from "@/components/atom/Icon";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function AsistenciaPage() {
  return (
    <>
      <div className="relative flex h-full min-h-[60vh] items-center justify-center">
        <FondoDecorativo />
        <div className="relative z-10 w-full max-w-sm">
          {/* LA CAJA PRINCIPAL */}
          <div className="rounded-xl border-4 border-slate-800 bg-white p-8 shadow-[12px_12px_0px_0px_#4f46e5]">
            <div className="mb-6 flex justify-center">
              {/* Icono de caja de herramientas o engranaje */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-400 bg-orange-100">
                <span className="text-3xl text-orange-400">
                  <Icon icon={faGear} />
                </span>
              </div>
            </div>

            <h1 className="text-center text-2xl font-black tracking-tighter text-slate-800 uppercase italic">
              Módulo en <br /> Empaque
            </h1>

            <div className="my-6 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full ${i < 4 ? "bg-indigo-500" : "bg-slate-200"}`}
                />
              ))}
            </div>

            <p className="text-center text-sm font-medium text-slate-500">
              Estamos ensamblando las herramientas para que gestiones tus listas
              de estudiantes.
            </p>

            <div className="mt-8 flex flex-col items-center">
              <div className="font-mono text-[10px] text-slate-400">
                STATUS: ASSEMBLING_0.4.2
              </div>
              {/* Un pequeño trazo de línea curva debajo */}
              <svg
                width="60"
                height="8"
                viewBox="0 0 60 8"
                className="mt-1 text-indigo-200"
              >
                <path
                  d="M0 5 Q 30 0, 60 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
