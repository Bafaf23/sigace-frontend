"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TarjetaMateriaNotas from "@/components/molecules/TarjetaMateriaNotas";
import { useAuth } from "@/context/AuthContext";
import { getLapseActive } from "@/services/lapse/getLapseActive";
import { getGrade } from "@/services/student/getGrade";
import {
  faClock,
  faGraduationCap,
  faClipboardList,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NotasPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState({
    yearName: "",
    sectionName: "",
    sectionId: null,
  });
  const [lapse, setLapse] = useState({});
  const [generalAverage, setGeneralAverage] = useState("0.00");

  const { user } = useAuth();

  const SIG = user?.user.SIG;
  const id = user?.user.id;
  console.log(section);
  useEffect(() => {
    if (!user?.user?.SIG) return;

    const fetchGrades = async () => {
      try {
        setLoading(true);

        const idStudent = user.user.id;
        const SIG = user.user.SIG;

        const response = await getGrade(idStudent, SIG);
        const lapseActive = await getLapseActive();

        const listaMaterias = response?.subjects || [];
        const yearName = response?.year || "";
        const sectionName = response?.section || "";
        const sectionId = response?.section_id || null;

        setSubjects(listaMaterias);
        setLapse(lapseActive);
        setSection({
          yearName: yearName,
          sectionName: sectionName,
          sectionId: sectionId,
        });

        if (listaMaterias.length > 0) {
          const sumaDefinitivas = listaMaterias.reduce(
            (acc, sub) => acc + parseFloat(sub.final_grade || 0),
            0,
          );
          const promedio = sumaDefinitivas / listaMaterias.length;
          setGeneralAverage(promedio.toFixed(2));
        }
      } catch (error) {
        console.error("❌ Error al cargar notas en el frontend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user]);

  const handlePrint = () => {
    if (!SIG || !id || !section.sectionId) {
      toast.error("Información de sección incompleta para generar la boleta.");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/boleta/${SIG}/${id}/${section.sectionId}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) return <Loading />;

  return (
    <main>
      <HeaderDashbord titelPage="Panel de Notas" />

      <div className="p-3 mt-5">
        {/* Banner Informativo Premium */}
        <div className="flex items-start gap-3 p-4 bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-900/50 mb-5 rounded-xl backdrop-blur-sm shadow-sm">
          {/* Icono Informativo */}
          <div className="p-1.5 bg-cyan-100 text-cyan-600 rounded-lg dark:bg-cyan-900/50 dark:text-cyan-400 mt-0.5 flex items-center justify-center shrink-0">
            <Icon icon={faClipboardList} className="text-sm" />
            {/* 💡 Puedes cambiar faClipboardList por un icono de información como faInfoCircle si lo tienes importado */}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              Nota Informativa
            </span>
            <p className="text-sm text-cyan-800 dark:text-slate-300 leading-relaxed font-medium">
              Las notas se muestran según el <strong>periodo</strong> y el lapso
              en tiempo real. Si quieres ver tus notas de <strong>años</strong>{" "}
              anteriores, consulta al departamento de control de estudios.
            </p>
          </div>
        </div>
        {/* Tarjetas Superiores Informativas //TODO:hacer las tarjetas componentes */}
        <div className="grid grid-cols-3 mb-4 gap-3">
          {/* Tarjeta: Periodo */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-lg text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon icon={faClock} className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Periodo
              </span>
              <div className="flex gap-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {user?.user?.period || "2025 - 2026"}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {lapse.name}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta: Promedio General */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/50 shadow-sm transition-all">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Icon icon={faGraduationCap} className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Promedio General
              </span>
              <span
                className={`text-sm font-black ${parseFloat(generalAverage) >= 9.5 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
              >
                {generalAverage} pts
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-indigo-500 p-3 rounded-xl text-white font-medium flex gap-2 items-center cursor-pointer hover:bg-indigo-700 transition-colors w-fit shadow-sm"
            >
              <Icon icon={faPrint} className="w-4 h-4" />
              Imprimir Boleta
            </button>
          </div>
        </div>

        {/* Mapeo de Materias (Opción 1) */}
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            // 🌟 Inyectamos tu componente pasándole solo la materia con su data incrustada
            <TarjetaMateriaNotas key={subject.id} subject={subject} />
          ))
        ) : (
          <div className="text-center p-6 text-slate-400 dark:text-slate-500">
            Aún no hay materias registradas en tu sección.
          </div>
        )}
      </div>
    </main>
  );
}
