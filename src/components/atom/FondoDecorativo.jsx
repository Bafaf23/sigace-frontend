/**
 * Fondo decorativo animado para módulos en fase de desarrolelo o construcción.
 * Utiliza SVGs livianos y elementos CSS posicionados absolutamente para crear
 * una estética de "plano técnico" o taller.
 * @component
 * @returns {JSX.Element} Un contenedor absoluto que ocupa todo el espacio del padre con opacidad reducida.
 */

export default function FondoDecurativo() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      {/* GRÚA DIBUJADA (Líneas finas) */}
      <svg
        className="absolute -top-10 right-20 h-96 w-40 text-slate-300"
        viewBox="0 0 100 250"
      >
        <path
          d="M50,0 L50,250 M20,50 L80,50 M20,50 L50,20 L80,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M50,100 L10,150 L90,150 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* CAJAS APILADAS (Bordes irregulares) */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center">
        {/* Caja Superior */}
        <div className="h-12 w-12 rotate-3 rounded-sm border-2 border-slate-400 bg-white shadow-[4px_4px_0px_0px_rgba(148,163,184,1)]"></div>
        {/* Caja Base */}
        <div className="mt-1 flex h-16 w-20 -rotate-2 items-center justify-center rounded-sm border-2 border-slate-400 bg-white shadow-[6px_6px_0px_0px_rgba(148,163,184,1)]">
          <div className="h-px w-full bg-slate-200"></div>
        </div>
      </div>

      {/* ENGRANAJE (Engrane garabateado) */}
      <div className="absolute top-1/4 left-1/4 animate-[spin_10s_linear_infinite]">
        <svg className="h-20 w-20 text-indigo-200" viewBox="0 0 100 100">
          <path
            d="M50,30 L55,10 L45,10 L50,30 M70,35 L90,25 L85,15 L70,35 M80,55 L100,60 L100,50 L80,55 M65,75 L80,95 L70,100 L65,75 M45,80 L50,100 L60,100 L55,80 M30,70 L10,90 L5,85 L30,70 M20,45 L0,40 L0,50 L20,45 M35,25 L15,5 L25,0 L35,25"
            fill="currentColor"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* ASTERISCOS DISPERSOS (Como chispas) */}
      <div className="absolute top-1/2 right-1/3 animate-pulse text-2xl font-bold text-orange-300 italic">
        *
      </div>
      <div className="absolute bottom-1/3 left-1/2 text-3xl font-bold text-indigo-300 italic opacity-30">
        ✱
      </div>
    </div>
  );
}
