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
      titulo: "Inscripcion",
      desc: "Abre y cierra el proceso de inscripcion desde la plataforma y deja que el registro se guarde automaticamente en la base de datos.",
      class: "text-[#EDAB1F]",
    },
    {
      icono: faSchoolCircleExclamation,
      titulo: "Carga de notas",
      desc: "Un sistema multiplataforma donde los profesores podran cargar el plan de evaluacion de cada carga academica que se les asigne con las notas de cada estudiante.",
      class: "text-[#1FED92]",
    },
    {
      icono: faGraduationCap,
      titulo: "Publicar las notas",
      desc: "Permite que los estudiantes ingresen al sistema y consulten sus notas por asignaturas.",
      class: "text-[#529199]",
    },
  ];

  return (
    <section id="nosotros" className="px-5 py-25 min-h-dvh">
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

            {/* Listado de Valores (Moléculas) */}
            <div className="space-y-6">
              {valores.map((val, index) => (
                <div key={index} className="group flex gap-4">
                  <div
                    className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white dark:bg-transparent ${val.class} transition-colors`}
                  >
                    <Icon icon={val.icono} />
                  </div>
                  <div>
                    <h4 className={`mb-1 text-lg font-bold ${val.class}`}>
                      {val.titulo}
                    </h4>
                    <p className={`text-sm leading-relaxed text-slate-500`}>
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
