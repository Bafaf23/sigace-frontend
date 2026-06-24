"use client";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Icon from "@/components/atom/Icon";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import RecordAcademico from "@/components/organism/AcademicRecord";
import { getPeriodStudent } from "@/services/academicPeriod/getPeriodStudent";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";
import AccessDenied from "@/components/molecules/AccessDenied";

export default function RecordPega() {
  const { user } = useAuth();
  const [periodStudent, setPeriodStudent] = useState([]);

  useEffect(() => {
    getPeriodStudent(user?.user.id).then((data) =>
      setPeriodStudent(data.data[0]),
    );
  }, [user]);

  if (!user) return <Loading />;

  if (user?.user.role != "Estudiante") return <AccessDenied />;
  
  return (
    <>
      <HeaderDashbord titelPage="Récord Académico" />
      <section className="p-4">
        <div className="p-4 bg-indigo-100/50 border border-indigo-200 rounded-xl flex items-center gap-3 shadow-indigo-200 shadow">
          <Icon icon={faCircleInfo} className="text-xl text-indigo-700" />
          <div>
            <h5 className="font-bold text-indigo-800 uppercase text-sm">
              Nota de Interes
            </h5>
            <p className="text-indigo-700 font-medium text-sm">
              En este seccion podres ver <span className="font-bold">todo</span>{" "}
              tu historial de calificaciones.
            </p>
          </div>
        </div>
      </section>
      <section className="p-4">
        <RecordAcademico
          periodStudent={periodStudent}
          idStudent={user?.user.id}
        />
      </section>
    </>
  );
}
