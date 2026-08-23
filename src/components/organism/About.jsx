import Icon from "@/components/atom/Icon";
import {
  faShieldHalved,
  faUsers,
  faBolt,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const valores = [
    {
      icono: faShieldHalved,
      titulo: "Seguridad Integral",
      desc: "Protegemos la data académica de cada estudiante con respaldos seguros y acceso controlado por roles.",
    },
    {
      icono: faUsers,
      titulo: "Comunidad Educativa",
      desc: "Unimos a directivos, docentes y representantes en una sola plataforma de comunicación eficiente.",
    },
    {
      icono: faBolt,
      titulo: "Agilidad Administrativa",
      desc: "Digitalizamos procesos manuales para reducir el tiempo de inscripción y carga de calificaciones.",
    },
  ];

  return (
    <section id="nosotros" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Lado Izquierdo: Imagen o Composición Visual */}
          <div className="relative flex-1">
            <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-orange-500/20 shadow-2xl w-full">
              <div className="flex flex-col gap-4 bg-white/20 p-8">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                  <div className="flex h-24 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                    <Icon
                      icon={faGraduationCap}
                      className="text-4xl text-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Elemento Decorativo */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-orange-600/20 blur-2xl"></div>
          </div>

          {/* Lado Derecho: Contenido */}
          <div className="flex-1">
            <h2 className="mb-4 text-sm font-bold tracking-widest text-orange-500 uppercase">
              Sobre el Proyecto
            </h2>
            <h3 className="mb-6 text-3xl font-black text-cyan-500 md:text-4xl">
              Transformando la Gestión Escolar a una nueva experiencia digital
            </h3>
            <p className="mb-10 text-lg text-gray-400">
              SchoPack nace como una solución moderna para superar las barreras
              del registro manual de notas y matricula estudiantil. Nuestra
              misión es empoderar a la institución con herramientas digitales
              que garanticen la transparencia y la rapidez en el manejo de
              expedientes académicos.
            </p>

            {/* Listado de Valores (Moléculas) */}
            <div className="space-y-6">
              {valores.map((val, index) => (
                <div key={index} className="group flex gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-cyan-500 transition-colors group-hover:border-cyan-500/50">
                    <Icon icon={val.icono} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-cyan-500">
                      {val.titulo}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500">
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
