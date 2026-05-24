"use client";
import Icon from "../atom/Icon";
import { useAuth } from "@/context/AuthContext";
import {
  faEdit,
  faChartLine,
  faHome,
  faBook,
  faChalkboardTeacher,
  faUserMinus,
  faUserCheck,
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
  const pathname = usePathname();
  const { user } = useAuth();
  const menuConfig = {
    teacher: [
      {
        name: "Inicio",
        src: "/dashboard/teacher",
        icon: faHome,
        active: pathname === "/dashboard/teacher" ? "hidden" : "",
      },
      {
        name: "Mi Perfil",
        src: "/dashboard/profile",
        icon: faUser,
        active: pathname === "/dashboard/profile" ? "hidden" : "",
      },
      {
        name: "Cargar Notas",
        src: "/dashboard/teacher/cargarNotas",
        icon: faEdit,
        active: pathname === "/dashboard/teacher/cargarNotas" ? "hidden" : "",
      },
      {
        name: "Plan Evaluativo",
        src: "/dashboard/teacher/planEvaluativo",
        icon: faChartLine,
        active:
          pathname === "/dashboard/teacher/planEvaluativo" ? "hidden" : "",
      },
    ],
    student: [
      {
        name: "Inicio",
        src: "/dashboard/student",
        icon: faHome,
        active: pathname === "/dashboard/student" ? "hidden" : "",
      },
      {
        name: "Notas",
        src: "/dashboard/student/notas",
        icon: faEdit,
        active: pathname === "/dashboard/student/notas" ? "hidden" : "",
      },
    ],
    administrator: [
      {
        icon: faHome,
        name: "Mi Inicio",
        src: "/dashboard/administrator",
        active: pathname === `/dashboard/administrator` ? "hidden" : "",
      },
      {
        icon: faSitemap,
        name: "Controle de Secciones",
        active: pathname === `/dashboard/administrator/controleSecciones`,
        src: "/dashboard/administrator/controleSecciones",
      },
      {
        icon: faUserCheck,
        name: "Inscripciones",
        active: pathname === `/dashboard/administrator/inscripciones`,
        src: "/dashboard/administrator/inscripciones",
      },
      {
        icon: faUserMinus,
        name: "Retiros y Traslados",
        active: pathname === `/dashboard/administrator/retirosYTraslados`,
        src: "/dashboard/administrator/retirosYTraslados",
      },
      {
        icon: faChalkboardTeacher,
        name: "Carga Académica",
        active: pathname === `/dashboard/administrator/cargaAcademica`,
        src: "/dashboard/administrator/cargaAcademica",
      },
      {
        icon: faBook,
        name: "Gestión de Materias",
        active: pathname === `/dashboard/administrator/gestionAsignaturas`,
        src: "/dashboard/administrator/gestionAsignaturas",
      },
      {
        icon: faCalendarCheck,
        name: "Configuración de Lapsos",
        active: pathname === `/dashboard/administrator/configuracionLapsos`,
        src: "/dashboard/administrator/configuracionLapsos",
      },
    ],
    SuperAdmin: [
      {
        icon: faHome,
        name: "Mi Inicio",
        src: "/dashboard/SuperAdmin",
        active: pathname === `/dashboard/SuperAdmin` ? "hidden" : "",
      },
      {
        icon: faUsers,
        name: "Gestión de Usuarios",
        src: "/dashboard/SuperAdmin/gestionUsuarios",
        active:
          pathname === `/dashboard/SuperAdmin/gestionUsuarios` ? "hidden" : "",
      },
      {
        icon: faBuilding,
        name: "Instituciones",
        src: "/dashboard/SuperAdmin/instituciones",
        active:
          pathname === `/dashboard/SuperAdmin/instituciones` ? "hidden" : "",
      },
      {
        icon: faUser,
        name: "Mi Perfil",
        src: "/dashboard/profile",
        active: pathname === `/dashboard/profile` ? "hidden" : "",
      },
    ],
  };

  const acciones = menuConfig[user?.user?.role || "student"] || [];

  return (
    <section className="p-3 lg:hidden">
      <h1 className="font-bold text-gray-400 uppercase">Acciones rápidas</h1>
      <nav className="mt-4 flex justify-evenly rounded-2xl bg-gray-400/30 p-3">
        {acciones.map((accion, index) => (
          <Link
            key={index}
            href={accion.src}
            className={`group flex flex-col items-center gap-2 transition-all ${accion.active}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm transition-all group-hover:scale-110 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:shadow-md dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-slate-400">
              <Icon icon={accion.icon} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold whitespace-nowrap text-slate-600 transition-colors group-hover:text-indigo-700 dark:text-slate-300 dark:group-hover:text-indigo-400">
                {accion.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
