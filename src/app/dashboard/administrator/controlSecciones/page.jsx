"use client";
import Button from "@/components/atom/Button";
import CardGridSetion from "@/components/molecules/CardGridSetion";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import FormSection from "@/components/organism/FormSection";
import Modal from "@/components/organism/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getSection } from "@/services/getSection";
import { useAuth } from "@/context/AuthContext";
import { useCallback } from "react";
import Loading from "./loading";

export default function controleSecciones() {
  const { user } = useAuth();
  const [secciones, setSecciones] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);

  const school_id = user?.user?.school_id;

  const loadSections = useCallback(() => {
    if (school_id) {
      setLoading(true);
      getSection(school_id)
        .then((data) => setSecciones(data))
        .finally(() => setLoading(false));
    }
  }, [school_id]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  if (loading) return <Loading />;

  return (
    <div className="p-4">
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
            {<FormSection />}
          </Modal>
        </div>
      </div>
      <CardGridSetion dataSet={secciones} />
    </div>
  );
}
