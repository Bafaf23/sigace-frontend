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
      colorClass: "text-[#EDAB1F] border-[#EDAB1F]/30 group-hover:bg-[#EDAB1F]/10",
    },
    {
      icono: faSchoolCircleExclamation,
      titulo: "Carga de notas",
      desc: "Un sistema multiplataforma donde los profesores cargan el plan de evaluación de cada materia junto con las notas de cada estudiante.",
      colorClass: "text-[#1FED92] border-[#1FED92]/30 group-hover:bg-[#1FED92]/10",
    },
    {
      icono: faGraduationCap,
      titulo: "Publicación de notas",
      desc: "Permite que los estudiantes ingresen al sistema y consulten sus calificaciones por asignatura en tiempo real.",
      colorClass: "text-[#529199] border-[#529199]/30 group-hover:bg-[#529199]/10",
    },
  ];

  return (
    <section id="nosotros" className="px-5 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Lado Derecho: Contenido */}
          <div className="flex-1">
            <Label className="bg-[#EDAB1F]/70 dark:text-orange-300 text-orange-600">
              Sobre el Proyecto
            </Label>
            <h3 className="mb-6 text-3xl font-black text-[#ED781F] md:text-4xl">
              Un sueño, las bases del mañana.
            </h3>
            <p className="mb-9 text-lg text-zinc-400">
              Todo empezo como una hoja de calculo de un archivo{" "}
              <span className="font-bold">.xls</span> y ahora se transformo un
              software completo para la adminstracion de un colegio. Más que un
              software o cualquier otra cosa es una solcion al proceso manual de
              llevar la administracion de un colegio. Dando soluciones como el
              acceso a los <span className="font-bold">profesores</span> y{" "}
              <span className="font-bold">estudiantes</span>, con roles acordes,
              donde prodran participar en el sistema.
            </p>
            <p className="mb-8 text-lg text-zinc-400">
              Y lo mejor es que esta hecho con el talento{" "}
              <span className="font-bold text-amber-400">100% Venezolano</span>,{" "}
              <span className="text-sky-600 font-bold">
                tecnologías modernas
              </span>{" "}
              y las <span className="text-red-500 font-bold">ganas</span> de
              seguir innovando todo los días.
            </p>
            <p className="mb-10 text-lg text-zinc-400">
              Deja a tras el llevar a mano el proceso y da el paso al futuro.
            </p>

              <p className="font-bold italic text-orange-600 dark:text-amber-300">
                ¿Sabes cuál es?
              </p>

              <p>
                Gestionar correctamente las calificaciones sin perder datos en el proceso, permitir que el estudiante acceda en tiempo real a sus notas y <strong className="font-semibold text-zinc-800 dark:text-zinc-200">prescindir del papel</strong>.
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
                  <h4 className={`mb-1 text-lg font-bold ${val.colorClass.split(" ")[0]}`}>
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