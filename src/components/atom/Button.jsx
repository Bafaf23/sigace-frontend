"use client";
import Icon from "./Icon";

/**
 * Componente de botón multipropósito con soporte para iconos y estados colapsables.
 * @param {Object} props
 * @param {string} [props.classNameBtn] - Clases de Tailwind para el contenedor del botón.
 * @param {React.ReactNode} [props.children] - Texto o elementos internos del botón.
 * @param {string} [props.classNameIcon] - Clases de Tailwind específicas para el icono.
 * @param {Object} [props.icon] - Icono de FontAwesome a renderizar.
 * @param {Function} [props.onClick] - Manejador del evento click.
 * @param {boolean} [props.disabled=false] - Estado deshabilitado del botón.
 * @param {string} [props.type="button"] - Tipo de botón (button, submit, reset).
 * @param {string} [props.titel] - Tooltip o accesibilidad HTML.
 * @param {boolean} [props.isCollapsed=false] - Si es true, oculta el texto y solo muestra el icono.
 * @returns {JSX.Element}
 */

export default function Button({
  classNameBtn = "",
  children,
  classNameIcon,
  icon,
  onClick,
  disabled = false,
  type = "button",
  titel,
  isCollapsed = false,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`${classNameBtn} transition-all px-4 py-2.5 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-1 ${
        disabled ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
      titel={titel}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {!isCollapsed && children && (
        <span className="font-bold whitespace-nowrap">{children}</span>
      )}
    </button>
  );
}
