import Icon from "./Icon";

/**
 * Tarjeta de estado (KPI) adaptable para visualización de métricas.
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Etiqueta o título de la métrica.
 * @param {string|number} props.info - Dato o valor principal.
 * @param {object} [props.icon] - Icono para el KPI.
 * @param {string} [props.className] - Clases Tailwind adicionales para el contenedor.
 * @param {string} [props.colorTitle] - Clase de color para el título.
 * @param {string} [props.colorInfo] - Clase de color para la métrica (default: "text-cyan-500").
 * @param {string} [props.message] - Mensaje secundario o pie de tarjeta.
 * @param {string} [props.colorIcon]- Clase de color par el icono (defualt: "text-[#529199]")
 * @returns {JSX.Element}
 */
export default function CardState({
  title,
  info,
  icon,
  className = "",
  colorTitle = "text-slate-800 dark:text-zinc-200",
  colorInfo = "text-cyan-500",
  colorIcon = "text-[#529199]",
  message,
}) {
  return (
    <div
      className={`w-full rounded-3xl border border-slate-100 bg-white dark:bg-zinc-800 dark:border-zinc-700 p-6 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      {/* Cabecera: Icono + Título */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className={`text-xl font-bold tracking-tight ${colorTitle}`}>
          {title}
        </h2>
        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorIcon}`}
          >
            <Icon icon={icon} className="text-xl" />
          </div>
        )}
      </div>

      {/* Métrica principal */}
      <div className="w-full text-end my-2">
        <span className={`text-4xl font-extrabold sm:text-5xl ${colorInfo}`}>
          {info}
        </span>
      </div>

      {/* Mensaje secundario */}
      {message && (
        <div className="mt-3 rounded-xl bg-slate-100 dark:bg-zinc-500 px-3 py-1.5">
          <p className="text-xs font-medium text-slate-600 dark:text-zinc-200">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
