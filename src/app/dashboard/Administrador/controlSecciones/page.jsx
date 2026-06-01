"use client";
import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import CardGridSetion from "@/components/molecules/CardGridSetion";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import QuickActions from "@/components/molecules/QuickActions";
import FormSection from "@/components/organism/FormSection";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getSection } from "@/services/section/getSection";
import { getStudenNotEnrollment } from "@/services/student/getStudenNotEnrollment";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";

export default function controleSecciones() {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const SIG = user?.user?.SIG;
  const authority = user?.user?.token;
  const period = user?.user?.id_period;

  console.log(sections);

  const loadStudents = useCallback(() => {
    if (!SIG || !authority || !period) return;
    setLoading(true);
    getStudenNotEnrollment({ SIG, id_period: period })
      .then((data) => {
        setStudents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [SIG, authority]);

  const loadSections = useCallback(() => {
    if (!SIG || !authority) return;
    getSection(SIG, authority).then((data) => {
      setSections(data);
    });
  }, [SIG, authority]);

  useEffect(() => {
    loadSections();
    loadStudents();
  }, [loadSections, loadStudents]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <HeaderDashbord titelPage={"Controle de Secciones"} />
        <div className="p-3">
          <Button
            onClick={() => setIsopen(!isOpen)}
            icon={faPlus}
            classNameBtn={
              "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
          >
            {"Crear seccion"}
          </Button>

          <Modal
            title={"Crea una nueva seccion"}
            isOpen={isOpen}
            onClose={() => setIsopen(!isOpen)}
          >
            <FormSection
              onSuccess={() => {
                loadSections();
                setIsopen(false);
              }}
            />
          </Modal>
        </div>
      </div>
      <QuickActions />
      <CardGridSetion
        dataSet={sections}
        availableStudents={students}
        period={period}
      />
    </div>
  );
}
