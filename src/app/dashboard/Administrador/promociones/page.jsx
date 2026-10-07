"use client";

import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import { useAuth } from "@/context/AuthContext";
import { approved } from "@/services/enrollment/Approved";
import { getApproved } from "@/services/enrollment/getApproved";
import {
  faCheck,
  faIdCard,
  faLayerGroup,
  faUser,
  faGraduationCap,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PromocionesPage() {
  const { user } = useAuth();

  const [students, setStudents] = useState({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);

  const currentPeriodId = user?.user?.id_period;

  useEffect(() => {
    if (!currentPeriodId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const fetchApprovedStudents = async () => {
      try {
        setLoading(true);
        const response = await getApproved(currentPeriodId);

        const studentList = Array.isArray(response.data) ? response.data : [];
        setStudents({
          data: studentList,
          count: studentList.length,
        });
      } catch (error) {
        toast.error("Error al cargar estudiantes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedStudents();
  }, [currentPeriodId]);

  const handlePromotion = async () => {
    if (!students.data.length) return;
    setLoading(true);

    try {
      const response = await approved();
      if (response.success === false) {
        toast.error(response.message);
      } else {
        toast.success(response.message || "Estudiantes promovidos con éxito");
        setStudents({ data: [], count: 0 });
      }
    } catch (error) {
      toast.error("Error al procesar la promoción");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusStyles = {
    Aprobado:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60",
    "Materia Pendiente":
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60",
    Reprobado:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60",
  };

  return (
    <section className="transition-colors space-y-3">
      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Promociones
      </h2>

      <Banner
        icon={faInfo}
        titel="Nota Informativa"
        message="En este módulo estarán listados todos los estudiantes que cumplen con el mínimo aprobatorio para ser promovidos al siguiente año superior."
      />

      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            onClick={() => handlePromotion()}
            icon={faGraduationCap}
            disabled={loading || students.data.length === 0}
            classNameBtn="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/10 text-sm cursor-pointer disabled:cursor-not-allowed dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Promover Estudiantes ({students.count})
          </Button>
        </div>

        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-orange-600 dark:text-orange-400 font-medium animate-pulse text-sm">
                Cargando estudiantes aptos...
              </p>
            </div>
          ) : students.data.length === 0 ? (
            <div className="text-slate-500 dark:text-zinc-400 text-center py-12 px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 border-dashed">
              <p className="text-sm max-w-lg mx-auto">
                No hay estudiantes aptos para promoción en este periodo. Una vez
                finalizado el periodo académico este módulo estará activo.
              </p>
            </div>
          ) : (
            <TableInsti
              titelTable={[
                { name: "Número Matrícula", icon: faIdCard },
                { name: "Nombre y Apellido", icon: faUser },
                { name: "Año y Sección", icon: faLayerGroup },
                { name: "Período", icon: faLayerGroup },
                { name: "Estado", icon: faCheck },
              ]}
              data={students.data}
              renderTableRows={(student) => (
                <tr
                  key={student.id_student}
                  className="transition-colors group hover:bg-slate-50/60 dark:hover:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800/60"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/Administrador/gestionEstudiantes/${student.id_student}`}
                      className="font-bold text-orange-600 dark:text-orange-400 text-xs border border-orange-500/20 rounded-lg px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 hover:underline inline-block transition-colors"
                    >
                      {student.tuition_number}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {student.name} {student.last_name}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-zinc-400">
                        {student.document}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-zinc-300">
                    {student.year_name} - {student.current_section}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-zinc-300">
                    {student.period}
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`px-3 py-1 w-fit border rounded-full text-xs font-semibold ${
                        statusStyles[student.status] ||
                        "bg-slate-50 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {student.status}
                    </div>
                  </td>
                </tr>
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
}
