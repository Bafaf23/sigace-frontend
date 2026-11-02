"use client";
import Button from "../atom/Button";
import Selector from "../atom/Selector";
import Loading from "@/app/loading";
import { createLoad } from "@/services/loadacadmic/createLoad";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormAcadLoand({
  subjects,
  teachers,
  sections,
  id_period,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    subjectId: "",
    teacherId: "",
    sectionId: "",
    id_period: id_period,
  });
  const [loanding, setLoanding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoanding(true);
      if (
        !formData.subjectId ||
        !formData.teacherId ||
        !formData.sectionId ||
        !formData.id_period
      ) {
        toast.error("Por favor, rellena todos los campos");
        setLoanding(false);
        return;
      }
      console.log(formData);
      const response = await createLoad(formData);

      if (response.error) {
        toast.error(response.error);
        setLoanding(false);
        return;
      }

      setFormData({
        ...formData,
        subjectId: "",
        teacherId: "",
        sectionId: "",
        id_period: id_period,
      });

      toast.success(response.message);
      onSuccess?.();
      setLoanding(false);
    } catch (error) {
      toast.error("Hubo un error,", error.error);
      console.error("Error al enviar:", error.error);
      setLoanding(false);
      return;
    }
  };

  if (loanding) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Selector
          label={"Seleciona una materia"}
          name="subjectId"
          id={"subjectId"}
          options={subjects.map((su) => ({
            value: su?.code_subject,
            label: `${su?.name}`,
          }))}
          onChange={(e) =>
            setFormData({ ...formData, subjectId: e.target.value })
          }
          value={formData.subjectId}
        />
        <Selector
          label={"Seleciona un profesor"}
          id={"teacherId"}
          options={teachers.map((teacher) => ({
            value: teacher.id,
            label: `${teacher.user.id_card} - ${teacher.user.name} ${teacher.user.last_name}`,
          }))}
          name="teacherId"
          value={formData.teacherId}
          onChange={(e) => {
            setFormData({ ...formData, teacherId: e.target.value });
          }}
        />
      </div>
      <div>
        <Selector
          label={"Seleciona una Seccion"}
          id={"sectionId"}
          options={sections.map((sect) => ({
            value: sect.id,
            label: `${sect.name} - ${sect.nomenclature}`,
          }))}
          name="sectionId"
          value={formData.sectionId}
          onChange={(e) => {
            setFormData({ ...formData, sectionId: e.target.value });
          }}
        />
      </div>
      <Button
        type="submit"
        icon={faSave}
        classNameBtn="bg-green-600 text-white hover:bg-green-700 "
      >
        Guardar
      </Button>
    </form>
  );
}
