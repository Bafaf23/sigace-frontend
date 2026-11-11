"use client";

import Button from "../atom/Button";
import SigaceLogo from "../atom/Logo";
import NavLink from "../molecules/NavLink";
import { useAuth } from "@/context/AuthContext";
import {
  faHome,
  faSignOutAlt,
  faListCheck,
  faPenToSquare,
  faSitemap,
  faCalendarCheck,
  faBowlRice,
  faClipboardList,
  faUserPlus,
  faUserGraduate,
  faBuilding,
  faUsers,
  faGraduationCap,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export const menuLink = {
  profesor: [
    {
      icon: faHome,
      label: "Inicio",

      href: `/dashboard/profesor`,
    },
    {
      icon: faListCheck,
      label: "Plan Evaluativo",
      href: `/dashboard/profesor/planEvaluativo`,
    },
    {
      icon: faPenToSquare,
      label: "Cargas de Notas",
      href: `/dashboard/profesor/cargarNotas`,
    },
    /* {
      icon: faUserCheck,
      label: "Asistencias",
      href: `/dashboard/Profesor/asistencia`,
    }, */
  ],
  estudiante: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/estudiante",
    },
    {
      icon: faListCheck,
      label: "Mis Calificaciones",
      href: "/dashboard/estudiante/notas",
    },
    /* {
      icon: faGraduationCap,
      label: "Mi record Academico",
      href: "/dashboard/estudiante/record",
    }, */
  ],
  administrador: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/administrador",
    },
    {
      icon: faSitemap,
      label: "Control de Secciones",
      href: "/dashboard/administrador/controlSecciones",
    },
    {
      icon: faBowlRice,
      label: "Asignaturas",
      href: "/dashboard/administrador/gestionAsignaturas",
    },
    {
      icon: faClipboardList,
      label: "Carga Academica",
      href: "/dashboard/administrador/cargaAcademica",
    },
    /* {
      icon: faUserMinus,
      label: "Retiros y Traslados",
      href: "/dashboard/administrators/materias",
    }, */

    {
      icon: faUserPlus,
      label: "Gestion de Personal",
      href: "/dashboard/administrador/gestionPersonal",
    },
    {
      icon: faUserGraduate,
      label: "Gestion de Estudiantes",
      href: "/dashboard/administrador/gestionEstudiantes",
    },
    {
      icon: faCalendarCheck,
      label: "Configuración Momentos",
      href: "/dashboard/administrador/lapsos",
    },
    {
      icon: faGraduationCap,
      label: "Promociones",
      href: "/dashboard/administrador/promociones",
    },
  ],
  sudo: [
    {
      icon: faHome,
      label: "Mi Inicio",
      href: "/dashboard/sudo",
    },
    {
      icon: faUsers,
      label: "Gestión de Usuarios",
      href: "/dashboard/sudo/gestionUsuarios",
    },
    {
      icon: faBuilding,
      label: "Instituciones",
      href: "/dashboard/sudo/instituciones",
    },
    {
      icon: faStar,
      label: "Sercivicios",
      href: "/dashboard/sudo/servicios",
    },
  ],
};

export default function NavbarSidebar() {
  const { user, loading, handleLogout } = useAuth();
  const pathname = usePathname();
  if (loading) return;
  if (!user) return;

  const role =
    user?.user.role == "director" ? "administrador" : user.user?.role;

  const currentLinks = menuLink[role];

  return (
    <aside
      className={`hidden p-3 transition-all duration-300 md:hidden md:flex-col lg:flex w-1/5 dark:bg-zinc-900 rounded-r-2xl`}
    >
      <div
        className={`mb-8 flex items-center border-b border-gray-300/30 pb-3 dark:border-zinc-800`}
      >
        <SigaceLogo className={"text-slate-900 dark:text-slate-400"} />
      </div>

      <nav className={`flex grow flex-col space-y-2`}>
        {currentLinks.map((link, index) => (
          <NavLink
            key={index}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={pathname === link.href}
          />
        ))}
      </nav>

      {/* Cerrar sesion */}

      <div className="mt-auto border-t border-slate-300/30 pt-4 dark:border-zinc-800">
        <Button
          icon={faSignOutAlt}
          onClick={() => handleLogout()}
          classNameBtn={`flex items-center gap-3 w-full text-gray-600/70 p-2 hover:bg-red-500/50 hover:text-red-900 rounded-lg transition-all text-md dark:text-zinc-500 dark:hover:bg-red-600/20 dark:hover:text-red-500`}
        >
          {"Cerrar Sesion"}
        </Button>
      </div>
    </aside>
  );
}
