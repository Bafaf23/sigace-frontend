import Icon from "./Icon";

/**
 * Tarjeta de estado (KPI) adaptable para visualización de métricas.
 * Soporta integración con el componente Icon y estilos personalizados.
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Etiqueta de la métrica (ej: "Usuarios activos").
 * @param {string|number} props.info - Dato principal (ej: "450").
 * @param {object} props.icon - Icono Font Awesome.
 * @param {string} [props.className] - Clases Tailwind adicionales del contenedor.
 * @returns {JSX.Element}
 */

export default function CardState({ title, info, icon, className }) {
  return (
    <div>
      <div
        className={`${className ?? ""} rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/50`}
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/40 text-cyan-500">
          <Icon icon={icon} className={"text-xl"} />
        </div>
        <h3 className="text-2xl font-bold text-cyan-500">{info}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
}
