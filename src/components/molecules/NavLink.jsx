import Icon from "../atom/Icon";
import Link from "next/link";

/**
 * Conjunto de enlaces con soporte visual que indica al usuario en qué página está.
 *
 * @component
 * @param {object} props
 * @param {string} props.href - Ruta de destino del enlace.
 * @param {string} props.label - Texto visible del enlace.
 * @param {string} props.icon - Nombre o identificador del icono.
 * @param {string} [props.classNameIcon] - Clases de Tailwind adicionales para el icono.
 * @param {string} [props.classNameLink] - Clases de Tailwind adicionales para el enlace.
 * @param {boolean} [props.active] - Define si la ruta está activa.
 * @returns {JSX.Element}
 */
export default function NavLink({
  href,
  label,
  icon,
  classNameIcon = "",
  classNameLink = "",
  active = false,
}) {
  const baseStyles =
    "text-md flex w-full items-center gap-3 rounded-lg p-2 transition-all outline-none";

  const activeStyles = active
    ? "dark:bg-orange-500/10 dark:text-orange-400 dark:bg-orange-500/20 dark:text-orange-400 font-bold bg-cyan-500/20 text-cyan-600"
    : "hover:text-gray-900 hover:bg-zinc-200/50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 text-gray-600 dark:text-zinc-300 font-medium";

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${baseStyles} ${activeStyles} ${classNameLink}`.trim()}
    >
      <Icon
        icon={icon}
        className={`shrink-0 transition-colors ${active ? "text-cyan-600 dark:text-orange-400" : ""} ${classNameIcon}`.trim()}
      />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}
