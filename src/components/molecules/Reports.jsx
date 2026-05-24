import Button from "../atom/Button";
import {
  faChartLine,
  faUserCheck,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

export default function Reports() {
  return (
    <section className="mt-5 flex flex-col gap-5 p-3">
      <h1 className="text-xl font-bold text-gray-600/60 uppercase dark:text-slate-400">
        Reportes
      </h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <Button
          classNameBtn={`group relative py-4 px-6 bg-orange-600 cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-3 text-white shadow-lg shadow-orange-200 transition-all duration-300 ease-outhover hover:bg-orange-700 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 active:translate-y-0 dark:shadow-orange-800 dark:hover:shadow-orange-600`}
          icon={faChartLine}
        >
          {"RRA"}
        </Button>
        <Button
          onClick={() => {
            toast.error(
              "Módulo de Asistencia\nActualmente en fase de desarrolelo.",
              {
                duration: 4000,
                icon: "⚠️",
              },
            );
          }}
          classNameBtn={`group relative py-4 px-6 bg-indigo-600 cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-3 text-white shadow-lg shadow-indigo-200 transition-all duration-300 ease-outhover hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-1 active:scale-95 active:translate-y-0 dark:shadow-indigo-800 dark:hover:shadow-indigo-600`}
          icon={faUserCheck}
        >
          {"Reporte asistencia"}
          <span className="absolute top-2 right-2 rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-tighter uppercase backdrop-blur-md">
            Proximante
          </span>
        </Button>
        <Button
          classNameBtn={`group relative py-4 px-6 bg-green-600 cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-3 text-white shadow-lg shadow-green-200 transition-all duration-300 ease-outhover hover:bg-green-700 hover:shadow-green-300 hover:-translate-y-1 active:scale-95 active:translate-y-0 dark:shadow-green-800 dark:shadow-green-600`}
          icon={faListCheck}
        >
          {"Plan de Evaluacion"}
        </Button>
      </div>
    </section>
  );
}
