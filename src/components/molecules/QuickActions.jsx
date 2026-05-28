"use client";
import Icon from "../atom/Icon";
import { menuLink } from "../organism/NabarSidebar";
import { useAuth } from "@/context/AuthContext";
import {
  faEdit,
  faChartLine,
  faHome,
  faBook,
  faChalkboardTeacher,
  faSitemap,
  faCalendarCheck,
  faUser,
  faUsers,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Acciones rapidas para el usuario, en vista moviles, con soprte al component Icon
 * Con opciones dependiendo al role del Usuario [TEACHER, STUDENT, ADMIN]
 *
 * @component
 * @returns {JSX.Element}
 */
export default function QuickActions() {
  const { user } = useAuth();
  const pathname = usePathname();

  const acciones = menuLink[user?.user?.role || "Estudiante"] || [];

  return (
    <section className="p-3 lg:hidden animate-in fade-in duration-500 w-full">
      <h1 className="font-bold text-gray-400 uppercase w-full">
        Acciones rápidas
      </h1>
      <nav className="mt-4 flex justify-evenly rounded-2xl bg-gray-400/30 p-3 w-full flex-wrap">
        {acciones.map((accion, index) => (
          <Link
            key={index}
            href={accion.href}
            className={`group flex flex-col items-center gap-2 transition-all ${pathname === accion.href ? "active" : ""}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm transition-all group-hover:scale-110 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:shadow-md dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-slate-400">
              <Icon icon={accion.icon} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold whitespace-nowrap text-slate-600 transition-colors group-hover:text-indigo-700 dark:text-slate-300 dark:group-hover:text-indigo-400 truncate w-20 text-center">
                {accion.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
