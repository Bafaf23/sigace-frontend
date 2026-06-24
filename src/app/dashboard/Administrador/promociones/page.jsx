"use client";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TableInsti from "@/components/molecules/TableInsti";
import { useAuth } from "@/context/AuthContext";
import { getApproved } from "@/services/enrollment/getApproved";
import {
  faCheck,
  faIdCard,
  faLayerGroup,
  faProjectDiagram,
  faUser,
  faGraduationCap,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PromocionesPage() {
  const { user } = useAuth();

  // 1. CORRECCIÓN: Inicializar con un objeto vacío para evitar errores de acceso a .data o .count
  const [students, setStudents] = useState([]);
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

        // 2. CORRECCIÓN: Asegurar que setStudents siempre reciba la estructura esperada
        // Si tu servicio devuelve directamente el array, ajusta aquí: { data: response, count: response.length }
        setStudents(response.data);
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
    if (!students.data?.length) return;
    // Lógica de promoción...
  };

  const statusStyles = {
    Aprobado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Materia Pendiente": "bg-amber-50 text-amber-700 border border-amber-200",
    Reprobado: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  return (
    <div>
      <HeaderDashbord titelPage="Promoción" />
      <section className="p-4">
        <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl flex items-start gap-3 shadow-sm">
          <Icon
            icon={faCircleInfo}
            className="text-xl text-cyan-600 mt-0.5 shrink-0"
          />
          <div>
            <h6 className="font-bold text-cyan-800 text-sm md:text-base">
              Nota Informativa
            </h6>
            <p className="font-medium text-cyan-950 text-xs md:text-sm mt-0.5 leading-relaxed">
              En este módulo estarán listados todos los estudiantes que cumplen
              con el mínimo aprobatorio para ser promovidos al siguiente año
              superior.
            </p>
          </div>
        </div>
      </section>

      <div className="p-4">
        {/* ... (Banner igual) ... */}

        <div className="flex justify-end mb-4">
          <button
            onClick={handlePromotion}
            disabled={loading || students.data?.length === 0}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
          >
            <Icon icon={faGraduationCap} />
            Promover Estudiantes ({students.length})
          </button>
        </div>

        <div>
          {loading ? (
            <p className="text-cyan-700 font-medium">Cargando...</p>
          ) : students.data?.length === 0 ? (
            <p className="text-slate-500 text-center py-10 bg-white rounded-2xl border border-slate-100 shadow">
              No hay estudiantes aptos para promoción en este periodo. Una vez
              finalizado el perido academico esta modulo estara activo
            </p>
          ) : (
            <TableInsti
              titelTable={[
                { name: "Numero Matrícula", icon: faIdCard },
                { name: "Nombre y Apellido", icon: faUser },
                { name: "Año y Seccion", icon: faLayerGroup },
                { name: "Período", icon: faLayerGroup },
                { name: "Estado", icon: faCheck },
              ]}
              data={students}
              renderTableRows={(student) => (
                <tr
                  key={student.id_student}
                  className="transition-colors group hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/Administrador/gestionEstudiantes/${student.id_student}`}
                      className="font-bold text-cyan-700 text-sm border border-cyan-700/10 rounded-md px-2 py-1 bg-cyan-50"
                    >
                      {student.tuition_number}
                    </Link>
                  </td>
                  <td className="flex flex-col">
                    <span className="font-bold group-hover:text-indigo-600">
                      {student.name} {student.last_name}
                    </span>
                    <span className="text-sm text-slate-500">
                      {student.document}
                    </span>
                  </td>
                  <td>
                    {student.year_name} - {student.current_section}
                  </td>
                  <td>{student.period}</td>

                  <td>
                    <div
                      className={`px-2 py-1 w-fit border rounded-full text-xs ${statusStyles[student.status]}`}
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
    </div>
  );
}
