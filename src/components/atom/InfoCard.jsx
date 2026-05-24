import Icon from "./Icon";

/**
 * Tarjeta de estado (KPI) adaptable para visualización de métricas.
 * Soporta integración con el componente Icon y estilos personalizados. (Dashbord)
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - Titulo de la tarjeta.
 * @param {string} props.value - Valor de la relevante de la tarjeta.
 * @param {object} props.icon - Componente Icon.
 * @param {string} props.colorClass - Clases de talwindCss para personalisar.
 * @param {string} props.description - Una descripcion breve de alusiva a ka informacion que se esta mostrando.
 * @returns {JSX.Element}
 */

export default function InfoCard({
  label,
  value,
  icon,
  colorClass,
  description = "No hay información que mostrar",
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className={`rounded-lg p-2 ${colorClass} bg-opacity-10`}>
          <Icon
            icon={icon}
            className={`text-xl ${colorClass.replace("bg-", "text-")}`}
          />
        </div>
        <span className="text-2xl font-bold text-slate-500 dark:text-slate-300">
          {value}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
          {label}
        </p>
        <p className="text-xs text-slate-400 italic dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
