import Icon from "../atom/Icon";
import Link from "next/link";

/**
 * Conjunto de enlaces con suporte visual que indica al usuario en que pagia esta.
 *
 * @componet
 * @param {object} props
 * @param {string} props.derecction
 * @param {string} props.label
 * @param {string} props.classNameIcon
 * @param {string} props.classNameLink
 * @param {boolean} props.active
 * @returns {JSX.Element}
 */

export default function NavLink({
  href,
  label,
  icon,
  classNameIcon,
  classNameLink,
  active,
}) {
  return (
    <Link
      href={href}
      className={`text-md flex w-full items-center gap-3 rounded-lg p-2 text-gray-600/60 transition-all ${classNameLink} ${
        active
          ? "bg-white font-bold text-indigo-700 dark:bg-slate-300"
          : "hover:bg-gray-200 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-slate-300"
      }`}
    >
      <Icon icon={icon} className={classNameIcon}></Icon>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}
