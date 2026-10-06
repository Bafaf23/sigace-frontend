import Icon from "@/components/atom/Icon";
import SchoPackLogo from "@/components/atom/Logo";
import {
  faHouseUser,
  faUsers,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const options = [
  {
    label: "Inicio",
    icon: faHouseUser,
    href: "#hero",
    iconClass: "text-[#1ED4ED]",
  },
  {
    label: "Nosotros",
    icon: faUsers,
    href: "#nosotros",
    iconClass: "text-[#1FED92]",
  },
  {
    label: "Servicios",
    icon: faStar,
    href: "#planes",
    iconClass: "text-[#EDAB1F]",
  },
];

export default function Header() {
  return (
    <header className="absolute top-4 left-0 w-full px-5 md:translate-x-10 z-50 md:w-[48%]">
      <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 px-5 py-2.5 rounded-full dark:bg-zinc-800 dark:border-zinc-700 shadow-sm">
        {/* Logo */}
        <SchoPackLogo className="text-slate-600 dark:text-zinc-100" />

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {options.map((option) => (
            <Link
              key={option.label}
              href={option.href}
              className="flex items-center gap-1.5 font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white text-sm transition-colors"
            >
              <Icon icon={option.icon} className={option.iconClass} />
              <span>{option.label}</span>
            </Link>
          ))}
        </nav>

        {/* Acción Principal */}
        <div className="flex items-center gap-2">
          <Link
            href="consult"
            className="bg-emerald-500 rounded-full px-5 py-3 font-semibold text-white text-sm hover:bg-emerald-600 active:scale-95 transition-all shadow-sm"
          >
            Consulta
          </Link>
          <Link
            href="/login"
            className="bg-orange-500 rounded-full px-5 py-3 font-semibold text-white text-sm hover:bg-orange-600 active:scale-95 transition-all shadow-sm"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
