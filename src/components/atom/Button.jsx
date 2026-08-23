"use client";
import Icon from "./Icon";

/**
 * Componente de botón multipropósito con soporte para iconos y estados colapsables.
 * @param {Object} props
 * @param {string} [props.classNameBtn] - Clases de Tailwind para el contenedor del botón.
 * @param {React.ReactNode} props.children - Texto o elementos internos del botón.
 * @param {string} [props.classNameIcon] - Clases de Tailwind específicas para el icono.
 * @param {Object} props.icon - Icono de FontAwesome a renderizar.
 * @param {Function} [props.onClick] - Manejador del evento click.
 * @param {boolean} [props.disabled=false] - Estado deshabilitado del botón.
 * @param {string} [props.type="button"] - Tipo de botón (button, submit, reset).
 * @param {boolean} [props.isCollapsed=false] - Si es true, oculta el texto y solo muestra el icono.
 * @returns {JSX.Element}
 */

export default function Button({
  classNameBtn,
  children,
  classNameIcon,
  icon,
  onClick,
  disabled,
  type = "button",
  isCollapsed,
}) {
  /* group flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-500 */
  return (
    <button
      className={`${classNameBtn} `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <Icon icon={icon} className={classNameIcon}></Icon>
      {!isCollapsed && <span className="whitespace-nowrap">{children}</span>}
    </button>
  );
}
