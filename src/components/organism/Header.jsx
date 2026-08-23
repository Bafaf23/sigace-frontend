import Icon from "@/components/atom/Icon";
import SchoPackLogo from "@/components/atom/SchoPackLogo";
import NavLink from "@/components/molecules/NavLink";
import {
  faHouseUser,
  faUsers,
  faRocket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative sticky top-0 z-50 flex w-full flex-col items-center gap-5 bg-zinc-100/80 backdrop-blur-md px-5 py-3 md:px-10 shadow">
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-l from-cyan-500 via-amber-500 to-orange-500" />
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <SchoPackLogo className="text-slate-700" />

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink icon={faHouseUser} label="Inicio" href="#hero" />
          <NavLink icon={faUsers} label="Sobre el proyecto" href="#nosotros" />
          <NavLink icon={faRocket} label="Planes" href="#planes" />
        </nav>

        {/* Acción Principal */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:bg-cyan-500 active:scale-95"
          >
            <Icon icon={faRightToBracket} />
            <span className="whitespace-nowrap">Ir al sistema</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
