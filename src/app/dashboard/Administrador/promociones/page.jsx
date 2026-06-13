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
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function PromocionesPage() {
  const { user } = useAuth();
  // 1. Estados para almacenar los estudiantes y controlar la carga
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPeriodId = user?.user.id_period;

  // 2. Fetch para traer los datos del Backend (Paso 1 completado)
  useEffect(() => {
    const fetchApprovedStudents = async () => {
      const data = await getApproved(user?.user.id_period);
      setStudents(data);
      setLoading(false);
    };
    fetchApprovedStudents();
  }, [currentPeriodId]);

  console.log(students, currentPeriodId);
  // 3. Función para el botón de Promover (Paso 2 en camino)
  const handlePromotion = async () => {
    console.log("Estudiantes a promover:", students);
    // Aquí ejecutaremos el lote completo enviando los IDs al backend
  };

  // Objeto de estilos
  const statusStyles = {
    Aprobado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Materia Pendiente": "bg-amber-50 text-amber-700 border border-amber-200",
    Reprobado: "bg-rose-50 text-rose-700 border border-rose-200",
  };
  return (
    <div>
      <HeaderDashbord titelPage="Promocion" />

      <div className="p-4">
        {/* Tu Banner Cyan personalizado */}
        <div className="flex bg-cyan-400/30 border border-cyan-500 rounded-xl p-4 mb-6 gap-3">
          <Icon icon={faGraduationCap} className="text-xl text-cyan-700" />
          <div className="flex-1">
            <h4 className="text-cyan-800 font-bold text-lg mb-1 tracking-wide">
              Estudiantes Aptos para Promoción
            </h4>
            <p className="text-cyan-700 text-sm md:text-base leading-relaxed font-medium">
              En la siguiente lista se mostrarán a todos los estudiantes que
              aprobaron todas las actividades y cumplen con el mínimo
              aprobatorio para ser promovidos al siguiente año escolar.
            </p>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handlePromotion}
            disabled={loading || !students}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-lg shadow transition-colors text-sm"
          >
            <Icon icon={faGraduationCap} />
            Promover Estudiantes ({students?.count})
          </button>
        </div>

        {/* Renderizado Condicional (Loading / Error / Tabla) */}
        <div>
          {loading ? (
            <p className="text-cyan-700 font-medium">
              Cargando estudiantes aprobados...
            </p>
          ) : error ? (
            <p className="text-red-500 font-medium">{error}</p>
          ) : (
            <TableInsti
              titelTable={[
                { name: "ID", icon: faIdCard },
                { name: "Nombre y Apellido", icon: faUser },
                { name: "Año y Seccion", icon: faLayerGroup },
                { name: "Perido", icon: faLayerGroup },
                { name: "Promedio Final", icon: faProjectDiagram },
                { name: "Estado", icon: faCheck },
              ]}
              data={students.data}
              renderTableRows={(student) => (
                <tr
                  key={student.document}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4">{student.id_student}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-bold">
                        {student.name}
                        {student.last_name}
                      </span>
                      <span className="text-sm text-slate-500">
                        {student.document}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <span className="text-slate-500 font-medium">
                        {student.year_name}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {student.current_section}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-cyan-600 font-bold">
                    {student.period}
                  </td>
                  <td className="px-6 py-4 text-orange-500 font-bold">
                    {student.general_average}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-full w-fit text-xs font-semibold tracking-wide ${statusStyles[student.status]}`}
                    >
                      <Icon icon={faCheck} className="text-xs" />
                      <span>{student.status}</span>
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
