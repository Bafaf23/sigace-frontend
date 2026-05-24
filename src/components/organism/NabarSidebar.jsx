"use client";

import Button from "../atom/Button";
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
  faBuilding,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import ItemProfile from "../atom/ItemProfile";

export default function NavbarSidebar() {
  const patthename = usePathname();
  const { user, loading, handleLogout } = useAuth();

  if (loading) return;
  if (!user) return;

  const menuLink = {
    teacher: [
      {
        icon: faHome,
        label: "Inicio",
        active: patthename === `/dashboard/teacher`,
        direccion: `/dashboard/teacher`,
      },
      {
        icon: faListCheck,
        label: "Plan Evaluativo",
        active: patthename === `/dashboard/teacher/planEvaluativo`,
        direccion: `/dashboard/teacher/planEvaluativo`,
      },
      {
        icon: faPenToSquare,
        label: "Cargas de Notas",
        active: patthename === `/dashboard/teacher/cargarNotas`,
        direccion: `/dashboard/teacher/cargarNotas`,
      },
      {
        icon: faUserCheck,
        label: "Asistencias",
        active: patthename === `/dashboard/teacher/asistencia`,
        direccion: `/dashboard/teacher/asistencia`,
      },
    ],
    student: [
      {
        icon: faHome,
        label: "Mi Inicio",
        direccion: "/dashboard/student",
        active: patthename === `/dashboard/student`,
      },
      {
        icon: faListCheck,
        label: "Mis Notas",
        active: patthename === `/dashboard/student/notas`,
        direccion: "/dashboard/student/notas",
      },
      {
        icon: faUserCheck,
        label: "Mi Asistencia",
        active: patthename === `/dashboard/student/asistencia`,
        direccion: "/dashboard/student/asistencia",
      },
    ],
    administrator: [
      {
        icon: faHome,
        label: "Mi Inicio",
        direccion: "/dashboard/administrator",
        active: patthename === `/dashboard/administrator`,
      },
      {
        icon: faSitemap,
        label: "Controle de Secciones",
        active: patthename === `/dashboard/administrator/controleSecciones`,
        direccion: "/dashboard/administrator/controleSecciones",
      },
      {
        icon: faBowlRice,
        label: "Asignaturas",
        active: patthename === `/dashboard/administrator/gestionAsignaturas`,
        direccion: "/dashboard/administrator/gestionAsignaturas",
      },
      {
        icon: faClipboardList,
        label: "Carga Academica",
        active: patthename === `/dashboard/administrator/cargaAcademica`,
        direccion: "/dashboard/administrator/cargaAcademica",
      },
      /* {
        icon: faUserMinus,
        label: "Retiros y Traslados",
        active: patthename === `/dashboard/administrators/materias`,
        direccion: "/dashboard/administrators/materias",
      }, */

      /*  {
        icon: faBook,
        label: "Gestión de Materias",
        active: patthename === `/dashboard/administrators/materias`,
        direccion: "/dashboard/administrators/materias",
      }, */
      {
        icon: faCalendarCheck,
        label: "Configuración de Lapsos",
        active: patthename === `/dashboard/administrators/lapsos`,
        direccion: "/dashboard/administrators/lapsos",
      },
    ],
    SuperAdmin: [
      {
        icon: faHome,
        label: "Mi Inicio",
        direccion: "/dashboard/SuperAdmin",
        active: patthename === `/dashboard/SuperAdmin`,
      },
      {
        icon: faUsers,
        label: "Gestión de Usuarios",
        direccion: "/dashboard/SuperAdmin/gestionUsuarios",
        active: patthename === `/dashboard/SuperAdmin/gestionUsuarios`,
      },
      {
        icon: faBuilding,
        label: "Instituciones",
        direccion: "/dashboard/SuperAdmin/instituciones",
        active: patthename === `/dashboard/SuperAdmin/instituciones`,
      },
    ],
  };

  const currentLinks = menuLink[user?.user?.role || "student"] || [];

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
            label={link.label}
            icon={link.icon}
            direcction={link.direccion}
            active={link.active}
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
