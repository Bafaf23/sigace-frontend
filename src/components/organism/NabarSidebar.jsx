"use client";

import Button from "../atom/Button";
import ItemProfile from "../atom/ItemProfile";
import SigaceLogo from "../atom/SigaceLogo";
import VersionTag from "../atom/VersionTag";
import NavLink from "../molecules/NavLink";
import { useAuth } from "@/context/AuthContext";
import {
  faHome,
  faSignOutAlt,
  faListCheck,
  faPenToSquare,
  faUserCheck,
  faSitemap,
  faCalendarCheck,
  faBowlRice,
  faClipboardList,
  faUserPlus,
  faUserGraduate,
  faBuilding,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export const menuLink = {
  Profesor: [
    {
      icon: faHome,
      label: "Inicio",

      href: `/dashboard/Profesor`,
    },
    {
      icon: faListCheck,
      label: "Plan Evaluativo",
      href: `/dashboard/Profesor/planEvaluativo`,
    },
    {
      icon: faPenToSquare,
      label: "Cargas de Notas",
      href: `/dashboard/Profesor/cargarNotas`,
    },
    {
      icon: faUserCheck,
      label: "Asistencias",
      href: `/dashboard/Profesor/asistencia`,
    },
  ],
  Estudiante: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/Estudiante",
    },
    {
      icon: faListCheck,
      label: "Mis Notas",
      href: "/dashboard/Estudiante/notas",
    },
  ],
  Administrador: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/Administrador",
    },
    {
      icon: faSitemap,
      label: "control de Secciones",
      href: "/dashboard/Administrador/controlSecciones",
    },
    {
      icon: faBowlRice,
      label: "Asignaturas",
      href: "/dashboard/Administrador/gestionAsignaturas",
    },
    {
      icon: faClipboardList,
      label: "Carga Academica",
      href: "/dashboard/Administrador/cargaAcademica",
    },
    /* {
      icon: faUserMinus,
      label: "Retiros y Traslados",
      href: "/dashboard/administrators/materias",
    }, */

    {
      icon: faUserPlus,
      label: "Gestion de Docentes",
      href: "/dashboard/Administrador/gestionDocentes",
    },
    {
      icon: faUserGraduate,
      label: "Gestion de Estudiantes",
      href: "/dashboard/Administrador/gestionEstudiantes",
    },
    {
      icon: faCalendarCheck,
      label: "Configuración de Lapsos",
      href: "/dashboard/Administrador/lapsos",
    },
  ],
  SuperAdmin: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/SuperAdmin",
    },
    {
      icon: faUsers,
      label: "Gestión de Usuarios",
      href: "/dashboard/SuperAdmin/gestionUsuarios",
    },
    {
      icon: faBuilding,
      label: "Instituciones",
      href: "/dashboard/SuperAdmin/instituciones",
    },
  ],
};

export default function NavbarSidebar() {
  const { user, loading, handleLogout } = useAuth();
  const pathname = usePathname();
  if (loading) return;
  if (!user) return;

  const currentLinks = menuLink[user?.user?.role || "Estudiante"] || [];

  return (
    <aside
      className={`hidden p-3 transition-all duration-300 md:hidden md:flex-col lg:flex`}
    >
      <div
        className={`mb-8 flex items-center border-b border-gray-200 pb-3 dark:border-slate-700`}
      >
        <div className="truncate">
          <SigaceLogo className={"text-indigo-500"} />
        </div>
      </div>

      <nav className={`flex grow flex-col space-y-2`}>
        {currentLinks.map((link, index) => (
          <NavLink
            key={index}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={pathname === link.href}
            classNameIcon={link.active ? "text-cyan-600" : ""}
          />
        ))}
      </nav>

      {/* Cerrar sesion */}
      <div className="flex items-center justify-between">
        <ItemProfile user={user} />
      </div>
      <div className="mt-auto border-t border-slate-400/30 pt-4 dark:border-slate-700">
        <Button
          icon={faSignOutAlt}
          onClick={() => handleLogout()}
          classNameBtn={`flex items-center gap-3 w-full text-gray-600/70 p-2 hover:bg-red-500/50 hover:text-red-900 rounded-lg transition-all text-md dark:text-slate-500 dark:hover:bg-red-300/50 dark:hover:text-red-600`}
          children={"Cerrar Sesion"}
        ></Button>
      </div>
    </aside>
  );
}
