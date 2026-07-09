import Icon from "@/components/atom/Icon";
import SigaceLogo from "@/components/atom/SigaceLogo";
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
    <div className="sticky top-0 z-50 flex flex-col items-center gap-5 border-b border-gray-100 bg-white/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex w-full justify-between">
        <SigaceLogo className="text-slate-500" />
        <div className="flex items-center gap-3">
          <nav className="hidden gap-1 md:flex lg:flex">
            <NavLink icon={faHouseUser} label="Inicio" href="#hero" />
            <NavLink
              icon={faUsers}
              label="Sobre el proyecto"
              href="#nosotros"
            />
            <NavLink icon={faRocket} label="Planes" href="#planes" />
          </nav>
          <Link
            href="/login"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-xl font-bold text-white transition-all hover:bg-cyan-500 md:flex lg:flex"
          >
            <Icon icon={faRightToBracket} />
            <span className="whitespace-nowrap">Ir al sistema</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
