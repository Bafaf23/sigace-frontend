import Icon from "@/components/atom/Icon";
import Label from "@/components/atom/Label";
import {
  faGraduationCap,
  faTable,
  faSchoolCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const valores = [
    {
      icono: faTable,
      titulo: "Inscripción",
      desc: "Abre y cierra el proceso de inscripción desde la plataforma y deja que el registro se guarde automáticamente en la base de datos.",
      colorClass:
        "text-[#EDAB1F] border-[#EDAB1F]/30 group-hover:bg-[#EDAB1F]/10",
    },
    {
      icono: faSchoolCircleExclamation,
      titulo: "Carga de notas",
      desc: "Un sistema multiplataforma donde los profesores cargan el plan de evaluación de cada materia junto con las notas de cada estudiante.",
      colorClass:
        "text-[#1FED92] border-[#1FED92]/30 group-hover:bg-[#1FED92]/10",
    },
    {
      icono: faGraduationCap,
      titulo: "Publicación de notas",
      desc: "Permite que los estudiantes ingresen al sistema y consulten sus calificaciones por asignatura en tiempo real.",
      colorClass:
        "text-[#529199] border-[#529199]/30 group-hover:bg-[#529199]/10",
    },
  ];

  return (
    <section id="nosotros" className="px-5 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Columna Izquierda: Historia y Problema */}
          <div className="lg:col-span-6">
            <div className="mb-6 space-y-2">
              <Label className="bg-[#EDAB1F]/20 text-orange-600 dark:text-orange-300">
                Sobre el Proyecto
              </Label>
              <h3 className="text-3xl font-black tracking-tight text-[#ED781F] md:text-4xl">
                Un sueño, las bases del mañana
              </h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Una hoja de cálculo (<span className="font-bold text-zinc-700 dark:text-zinc-200">.xls</span>) fue el punto de partida para crear el software más completo para la administración de un liceo.
              </p>
            </div>

            <article className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
              <p>
                Durante años, gestionar un liceo se ha reducido a hojas de Excel y montañas de impresiones archivadas. Los sistemas actuales tienen más de 20 años o son demasiado costosos, obligando a las administraciones a hacer de tripas corazón.
              </p>

              <p>
                Soluciones hay muchas, pero pocas son confiables, eficaces y resuelven el verdadero problema dentro de la institución.
              </p>

              <p className="font-bold italic text-orange-600 dark:text-amber-300">
                ¿Sabes cuál es?
              </p>

              <p>
                Gestionar correctamente las calificaciones sin perder datos en
                el proceso, permitir que el estudiante acceda en tiempo real a
                sus notas y{" "}
                <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                  prescindir del papel
                </strong>
                .
              </p>
            </article>
          </div>

          {/* Columna Derecha: Tarjetas de Valores */}
          <div className="space-y-4 lg:col-span-6">
            {valores.map((val) => (
              <div
                key={val.titulo}
                className="group flex gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-zinc-50 transition-colors dark:bg-zinc-900 ${val.colorClass}`}
                >
                  <Icon icon={val.icono} />
                </div>
                <div>
                  <h4
                    className={`mb-1 text-lg font-bold ${val.colorClass.split(" ")[0]}`}
                  >
                    {val.titulo}
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
