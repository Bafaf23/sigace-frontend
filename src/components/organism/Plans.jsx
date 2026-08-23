import Icon from "@/components/atom/Icon";
import { faCheck, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MAIL_LINK = "mailto:ventas@sigace.xyz";

export default function Plans() {
  const planes = [
    {
      nombre: "Empowerment",
      precio: "Popular",
      icono: faBuildingColumns,
      features: [
        "Boletas automatizadas por lapsos",
        "Soporte multi-usuario administrativo",
        "Acceso para estudiantes en tiempo real",
        "Reportes y estadísticas institucionales",
        "Inscripción 100% online (próximamente)",
      ],
      color: "border-cyan-500 shadow-xl shadow-cyan-500/10",
      destacado: true,
      boton: "Contactar Ventas",
      ctaHref: MAIL_LINK,
      ctaExternal: true,
    },
  ];

  return (
    <section id="planes" className="px-6 py-24">
      <div className="mx-auto mb-16 max-w-7xl text-center">
        <h2 className="mb-4 text-sm font-bold tracking-widest text-orange-500 uppercase">
          Membresías
        </h2>
        <h3 className="text-4xl font-black text-slate-800">
          Planes adaptados a tu institución
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Optimiza el control de estudios de tu plantel educativo con nuestro
          plan central de automatización.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        {planes.map((plan) => (
          <div
            key={plan.nombre}
            className={`relative rounded-3xl border-2 bg-white p-8 transition-all hover:-translate-y-1 ${plan.color}`}
          >
            {plan.destacado && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-600 px-4 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-md">
                Recomendado
              </span>
            )}

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <Icon icon={plan.icono} className="text-xl" />
              </div>
              <h4 className="mb-2 text-2xl font-bold text-slate-800">
                {plan.nombre}
              </h4>
              <p className="text-3xl font-black text-cyan-600">{plan.precio}</p>
            </div>

            <ul className="mb-8 space-y-4">
              {plan.features.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <Icon
                    icon={faCheck}
                    className="mt-1 text-xs text-cyan-500 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              {...(plan.ctaExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex w-full justify-center rounded-xl bg-orange-500 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95"
            >
              {plan.boton}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
