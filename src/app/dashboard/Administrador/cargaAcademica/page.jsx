"use client";
import Button from "@/components/atom/Button";
import SkeletonCard from "@/components/atom/SkeletonCard";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import ListAcademicLoand from "@/components/molecules/ListAcademicLoand";
import FormAcadLoand from "@/components/organism/FormAcadLoand";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getLoad } from "@/services/loadacadmic/getLoad";
import { getSection } from "@/services/section/getSection";
import { getSubjects } from "@/services/subject/getSujects";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";

export default function CargaAcademicaPage() {
  const { user } = useAuth();

  const SIG = user?.user?.SIG;
  const token = user?.user?.token;
  const id_period = user?.user?.id_period;

  const [isOpen, setisOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [academicLoads, setAcademicLoads] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sections, setSections] = useState([]);

  const loadCatalogData = useCallback(() => {
    if (!SIG || !token) return;
    setLoading(true);
    Promise.all([
      getTeachersAll(SIG, token),
      getSection(SIG, token),
      getSubjects(SIG),
      getLoad({ SIG, token }),
    ])
      .then(([teachersData, sectionsData, subjectsData, loadData]) => {
        setTeachers(teachersData);
        setSections(sectionsData);
        setSubjects(subjectsData);
        setAcademicLoads(loadData);
      })
      .catch((error) => {
        console.error("Error al cargar datos de carga académica:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [SIG, token]);

  useEffect(() => {
    loadCatalogData();
  }, [loadCatalogData]);

  console.log(teachers)
  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-3 md:flex-row md:justify-between md:p-3 lg:justify-between">
        <HeaderDashbord titelPage="Gestion de Carga academica" />
        <div className="hidden md:block">
          <Button
            onClick={() => setisOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 "
          >
            {"Crear carga Academica"}
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setisOpen(!isOpen)}
        title={"Carga Academica"}
      >
        <FormAcadLoand
          subjects={subjects}
          teachers={teachers}
          sections={sections}
          SIG={SIG}
          id_period={id_period}
        />
      </Modal>

      <div className="p-3 md:hidden lg:hidden">
        <div className="w-full flex justify-end">
          <Button
            onClick={() => setisOpen(true)}
            icon={faPlus}
            classNameBtn="bg-indigo-500 p-3 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 w-full text-center"
          >
            {"Crear Carga academica"}
          </Button>
        </div>
      </div>
      {loading ? (
        <SkeletonCard />
      ) : (
        <ListAcademicLoand
          academicLoads={academicLoads}
          subjects={subjects}
          teachers={teachers}
          sections={sections}
        />
      )}
    </div>
  );
}
