"use client";
import Button from "../atom/Button";
import Selector from "../atom/Selector";
import { createLoad } from "@/services/loadacadmic/createLoad";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormAcadLoand({
  subjects,
  teachers,
  sections,
  SIG,
  id_period,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    subjectId: "",
    teacherId: "",
    sectionId: "",
    SIG: SIG,
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
        !formData.SIG ||
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
        SIG: SIG,
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-2">
        <Selector
          label={"Seleciona una materia"}
          name="subjectId"
          id={"subjectId"}
          options={subjects.map((su) => ({
            value: su.code_subject,
            label: `${su.name} - ${su.year_name}`,
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
            label: `${teacher.document} - ${teacher.name} ${teacher.last_name}`,
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
            label: `${sect.year_name} - ${sect.name}`,
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
        classNameBtn="bg-indigo-600 text-white p-2 rounded-lg mt-2"
      >
        Guardar Carga Académica
      </Button>
    </form>
  );
}
