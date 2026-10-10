import Label from "../atom/Label";
import Icon from "@/components/atom/Icon";
import {
  faBlackboard,
  faBook,
  faBuildingColumns,
  faCalendar,
  faFileCircleCheck,
  faUpload,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Plans() {
  const services = [
    {
      type: "SIG",
      name: "Autenticación",
      description: "Accede al sistema según tu rol y permisos.",
      icon: faBuildingColumns,
      class: "text-cyan-500",
      tab: "Base",
      classTab: "bg-cyan-500/30",
    },
    {
      type: "SIG",
      name: "Config. del año escolar",
      icon: faCalendar,
      description:
        "Inicia, cierra y controla el período académico y las inscripciones con mayor organización.",
      class: "text-teal-500 dark:text-teal-400",
      tab: "Base",
      classTab: "bg-teal-500/30",
    },
    {
      type: "SIG",
      name: "Carga de calificaciones",
      icon: faUpload,
      description: "Carga calificaciones en un clic y sin complicaciones.",
      class: "text-rose-500 dark:text-rose-400",
      tab: "Base",
      classTab: "bg-rose-500/30",
    },
    {
      type: "SIG",
      name: "Planes de evaluación",
      icon: faBlackboard,
      description:
        "Diseña y carga la planificación de actividades para cada asignatura y período académico.",
      class: "text-indigo-500 dark:text-indigo-400",
      tab: "Base",
      classTab: "bg-indigo-500/30",
    },
    {
      type: "SIG",
      name: "Planilla de inscripción (clase I)",
      icon: faFileCircleCheck,
      description:
        "Genera, en un solo clic, el comprobante interno de cada inscripción formalizada.",
      class: "text-emerald-500 dark:text-emerald-400",
      tab: "ápice",
      classTab: "bg-emerald-500/30",
    },
    {
      type: "SIG",
      name: "Lista de sección (clase I)",
      icon: faFileCircleCheck,
      description:
        "Entrega la lista de sección a cada profesor de forma rápida y ordenada.",
      class: "text-emerald-500 dark:text-emerald-400",
      tab: "ápice",
      classTab: "bg-emerald-500/30",
    },
    {
      type: "MPPE",
      name: "Reporte final del rendimiento estudiantil (clase E)",
      icon: faFileCircleCheck,
      description: "Envía a la zona educativa el RFRE en tiempo récord.",
      class: "text-emerald-500 dark:text-emerald-400",
    },
    {
      type: "SIG",
      name: "Boletas (clase I)",
      class: "text-emerald-500 dark:text-emerald-400",
      icon: faBook,
      description:
        "Deja que los estudiantes descarguen sus calificaciones en un clic, sin largas filas ni procesos manuales.",
      tab: "ápice",
      classTab: "bg-emerald-500/30",
    },
    {
      type: "SIG",
      name: "Inscripción online",
      class: "text-amber-500 dark:text-amber-400",
      description:
        "Automatiza la carga de nuevos ingresos y acelera la inscripción online con menos esfuerzo y más control.",
      icon: faUserPlus,
      tab: "ápice",
      classTab: "bg-amber-500/30",
    },
    /* {
      name: "Carga de datos",
      icon: faUserPlus,
      description:
        "",
      class: "text-amber-500 dark:text-amber-400",
    }, */
  ];

  return (
    <section id="planes" className="px-6 py-16">
      {/* Encabezado */}
      <div className="mx-auto mb-12 max-w-7xl">
        <h2 className="mb-2 text-sm font-bold tracking-widest text-cyan-500 uppercase">
          Servicios y Módulos
        </h2>
        <h3 className="text-3xl font-black text-cyan-600 sm:text-4xl dark:text-zinc-100">
          Sé tú quien decida qué usar
        </h3>
        <p className="mt-4 max-w-2xl text-slate-500 dark:text-zinc-300">
          Inicias con nuestro módulo base e integras únicamente los servicios
          opcionales que tu institución realmente necesita.
        </p>
      </div>

      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => (
            <div
              key={service.name}
              className={`relative p-6 flex flex-col justify-between rounded-3xl border-2 bg-white transition-all hover:-translate-y-1 overflow-hidden ${service.class}`}
            >
              {service.type === "MPPE" ? (
                <div className="absolute -bottom-6 -right-6 h-45 w-45 pointer-events-none select-none z-0">
                  <Image
                    src="/mppe.png"
                    alt="Sello MPPE Venezuela"
                    fill
                    sizes="160px"
                    className="object-contain opacity-10"
                  />
                </div>
              ) : null}
              <div>
                <div className="flex items-start gap-4 ">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200">
                    <Icon icon={service.icon} className="text-xl" />
                  </div>
                  <div className="w-full">
                    <div className="flex gap-2 justify-between">
                      <h5 className="text-lg font-bold text-slate-800 dark:text-zinc-100">
                        {service.name}
                      </h5>
                      {service.type && (
                        <Label className={service.classTab}>
                          {service.tab}
                        </Label>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
