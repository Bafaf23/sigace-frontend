import Button from "../atom/Button";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import { createEvaluation } from "@/services/evaluation/createEvaluation";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Formulario para crear el plan Evaluativo del la materia asignada el profesor
 *
 * @returns {JSX.Element}
 */

export default function FormCargaPV({
  onSuccess,
  idLoadAcademic,
  idLapseActive,
}) {
  const [formData, setFormData] = useState({
    date: "",
    referent_teorical: "",
    activity: "",
    technical: "",
    instrument: "",
    porcentage: "",
    id_load_academic: idLoadAcademic,
    id_lapse: idLapseActive,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createEvaluation(formData);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    const newId = response?.result?.id;
    if (onSuccess && newId) {
      // 🌟 EL TRUCO: Creamos el objeto completo fusionando los inputs con el nuevo ID
      const evaluation = {
        id: newId, // ID único para la clave (key) de React y borrados
        date: formData.date,
        referent_teorical: formData.referent_teorical,
        activity: formData.activity,
        technical: formData.technical, // Asegúrate de mapear bien si usas 'technical' o 'technique'
        instrument: formData.instrument,
        porcentage: formData.porcentage, // Mantiene el porcentaje escrito
      };

      // 2. Enviamos el objeto completamente estructurado al componente Padre
      onSuccess(evaluation);
      toast.success(response.message);

      setFormData({
        date: "",
        referent_teorical: "",
        activity: "",
        technical: "",
        instrument: "",
        porcentage: "",
        id_load_academic: idLoadAcademic,
        id_lapse: idLapseActive,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div className="col-span-1">
        {/* Semana */}
        <Input
          label="Fecha"
          type="date"
          name="date"
          placeholder="Ej: 2026-01-01"
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-span-2">
        {/* Contenido / Referente */}
        <Input
          label="Referente Teórico (Contenido)"
          type="text"
          name="referent_teorical"
          placeholder="Ej: Ecuaciones de segundo grado"
          onChange={handleChange}
          required
        />
      </div>
      {/* Estrategia / Actividad */}
      <Input
        label="Estrategia / Actividad"
        type="text"
        name="activity"
        placeholder="Ej: Taller grupal"
        onChange={handleChange}
        required
      />
      {/* Técnica */}
      <Selector
        label="Técnica"
        name="technique"
        options={[
          { value: "Observación", label: "Observación" },
          { value: "Análisis de producción", label: "Análisis de producción" },
          { value: "Prueba escrita", label: "Prueba escrita" },
          { value: "Entrevista", label: "Entrevista" },
        ]}
        onChange={(e) =>
          setFormData({ ...formData, technical: e.target.value })
        }
        value={formData.technical}
      />

      {/* Instrumento */}
      <Input
        label="Instrumento"
        type="text"
        name="instrument"
        placeholder="Ej: Escala de estimación"
        onChange={handleChange}
        required
      />

      {/* Ponderación */}
      <Input
        label="Ponderación (%)"
        type="number"
        name="porcentage"
        placeholder="Ej: 20%"
        onChange={handleChange}
        required
      />

      {/* Botón de envío */}
      <div className="flex items-end">
        <Button
          icon={faPlus}
          type="submit"
          classNameBtn="w-full bg-indigo-500 p-3 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1 hover:bg-indigo-600"
        >
          {"Añadir al Plan"}
        </Button>
      </div>
    </form>
  );
}
