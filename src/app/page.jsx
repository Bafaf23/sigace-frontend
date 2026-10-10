import CardState from "@/components/atom/CardState";
import Icon from "@/components/atom/Icon";
import About from "@/components/organism/About";
import Footer from "@/components/organism/Footer";
import Header from "@/components/organism/Header";
import Hero from "@/components/organism/Hero";
import Plans from "@/components/organism/Plans";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import {
  faAmericanSignLanguageInterpreting,
  faArrowRightArrowLeft,
  faTrainSubway,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const WA_LINK = "https://wa.link/urfdhq";
const STATS_DATA = [
  {
    id: "clients",
    title: "Ellos confían",
    info: "40+",
    colorTitle: "text-[#1FED92]",
    colorInfo: "text-[#ED781F]",
    message: "Ellos confían en nosotros",
  },
  {
    id: "uptime",
    title: "Disponibilidad",
    info: "99%",
    colorTitle: "text-[#529199]",
    colorInfo: "text-indigo-600",
    message: "El mejor respaldo y responsabilidad",
  },
  {
    id: "local",
    title: "Hecho en Venezuela",
    info: "100%",
    colorTitle: "text-amber-400",
    colorInfo: "text-blue-500",
    message: "Impulsando el talento nacional",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="absolute z-50 bottom-3 hidden md:flex gap-4 justify-evenly md:px-10 w-full">
        {STATS_DATA.map((item) => (
          <CardState
            key={item.id}
            title={item.title}
            info={item.info}
            colorInfo={item.colorInfo}
            colorTitle={item.colorInfo}
            message={item.message}
          />
        ))}
      </div>
      <About />
      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl relative overflow-hidden shadow-md border border-slate-100 flex flex-col md:block p-6 md:p-8">
          {/* Contenido de texto */}
          <div className="relative z-10 space-y-2 mb-6 md:mb-0 md:pr-48 lg:pr-56">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
              ¿No tienes página web?
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-semibold">
              Nosotros la hacemos por ti.
            </p>
            <p className="text-slate-500 text-sm md:text-base font-normal max-w-xl mb-5">
              Si eres uno de{" "}
              <span className="font-semibold text-emerald-600">
                nuestros primeros 10 clientes
              </span>
              , la página web te sale completamente gratis.
            </p>
            <Link
              href={WA_LINK}
              target="_black"
              className="bg-emerald-600 px-7 py-2 rounded-xl text-lg text-white font-bold cursor-pointer hover:bg-emerald-700"
            >
              Cotizar
            </Link>
          </div>

          <div className="bg-emerald-600 relative md:absolute bottom-0 right-0 left-0 md:left-auto md:top-0 md:bottom-0 w-full md:w-1/3 min-h-30 md:min-h-0 rounded-2xl md:rounded-none md:rounded-l-full md:rounded-bl-2xl flex justify-center items-center p-6">
            <Icon
              icon={faWikipediaW}
              className="text-3xl md:text-4xl text-emerald-50 shrink-0 transform -rotate-12"
            />
            <Icon
              icon={faWikipediaW}
              className="text-4xl md:text-5xl text-emerald-50 shrink-0 transform rotate-6"
            />
            <Icon
              icon={faWikipediaW}
              className="text-3xl md:text-4xl text-emerald-50 shrink-0 transform -rotate-12"
            />
          </div>
        </div>
      </section>
      <Plans />
      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl relative overflow-hidden shadow-md border border-slate-100 p-6 md:p-8 flex flex-col md:block">
          {/* Contenido de texto: alineado dinámicamente */}
          <div className="relative z-10 space-y-2 md:pl-48 lg:pl-56 flex flex-col items-start md:items-end text-left md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
              ¿Eres cliente de otro sistema?
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-semibold">
              Trae tu data con nosotros fácil.
            </p>
            <p className="text-slate-500 text-sm md:text-base font-normal max-w-xl mb-3">
              Si tienes datos en otro{" "}
              <span className="font-semibold text-orange-600">
                sistema de gestión
              </span>
              , tenemos para ti el servicio de migración de datos.
            </p>
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 px-7 py-2.5 rounded-xl text-base md:text-lg text-white font-bold transition-colors hover:bg-orange-700 shadow-sm inline-block"
            >
              Contratar servicio
            </Link>
          </div>

          {/* Elemento decorativo lateral (Izquierda en MD, Abajo en Móvil) */}
          <div className="bg-orange-600 relative md:absolute bottom-0 left-0 md:top-0 md:bottom-0 w-full md:w-1/3 min-h-30 md:min-h-0 rounded-2xl  md:rounded-r-lg  md:rounded-br-full flex justify-center items-center ">
            <Icon
              icon={faArrowRightArrowLeft}
              className="text-3xl md:text-7xl text-amber-100 shrink-0 transform -rotate-12"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
