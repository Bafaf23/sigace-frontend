"use client";

import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import SkeletonCard from "@/components/atom/SkeletonCard";
import CardGridSetion from "@/components/molecules/CardGridSetion";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormSection from "@/components/organism/FormSection";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getSection } from "@/services/section/getSection";
import { getStudenNotEnrollment } from "@/services/student/getStudenNotEnrollment";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";

export default function controlSecciones() {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const SIG = user?.user?.SIG;
  const authority = user?.user?.token;
  const period = user?.user?.id_period;

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
    setLoading(true);
    getSection(SIG, authority, period)
      .then((data) => {
        setSections(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [SIG, authority]);

  useEffect(() => {
    loadSections();
    loadStudents();
  }, [loadSections, loadStudents]);
  console.log(sections);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <HeaderDashbord titelPage={"control de Secciones"} />
        <div className="p-3 hidden md:block lg:block">
          <Button
            onClick={() => setIsopen(!isOpen)}
            icon={faPlus}
            classNameBtn={
              "bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
            }
          >
            {"Crear seccion"}
          </Button>
        </div>
      </div>
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
      <div className="p-3">
        <div className="flex items-center gap-2 bg-indigo-500/20 p-3 rounded-lg border border-indigo-500/30">
          <Icon icon={faInfoCircle} className="text-indigo-500 text-2xl" />
          <p className="text-sm font-medium text-indigo-500  dark:text-indigo-400">
            En este modulo puedes crear y gestionar las secciones de tu escuela.
            Tambien puedes inscribir a los alumnos a las secciones.
          </p>
        </div>
      </div>
      <div className="md:hidden lg:hidden p-3 w-full">
        <Button
          onClick={() => setIsopen(!isOpen)}
          icon={faPlus}
          classNameBtn={
            "bg-indigo-500 p-4 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 w-full"
          }
        >
          {"Crear seccion"}
        </Button>
      </div>
      {loading ? (
        <SkeletonCard />
      ) : (
        <CardGridSetion
          dataSet={sections}
          availableStudents={students}
          period={period}
        />
      )}
    </div>
  );
}
