import Button from "../atom/Button";
import Icon from "../atom/Icon";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import { useAuth } from "@/context/AuthContext";
import { createSection } from "@/services/section/createSection";
import { getYears } from "@/services/subject/getYears";
import { getTeachersAll } from "@/services/teachers/getTeachersAll";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function FormSection({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [years, setYears] = useState([]);

  const { user } = useAuth();

  const SIG = user.user.SIG;
  const authority = user.user.token;
  const id_period = user.user.id_period;
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    yearId: "",
    capacity: 35,
    period: "",
    SIG: SIG,
    id_period: id_period,
  });

  const handleUpdate = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sectionOptions = [
    { value: "A", label: "Sección A" },
    { value: "B", label: "Sección B" },
    { value: "C", label: "Sección C" },
    { value: "U", label: "Sección Única (U)" },
  ];

  useEffect(() => {
    getTeachersAll(SIG, authority).then((data) => {
      setTeachers(
        data.map((teacher) => ({
          value: teacher.id_teacher,
          label: `${teacher.document} - ${teacher.name} ${teacher.last_name}`,
        })),
      );
    });
    getYears(SIG).then((data) => setYears(data));
  }, [SIG]);
  console.log(teachers);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.name ||
      !formData.yearId ||
      !formData.teacherId ||
      !formData.capacity
    ) {
      toast.error("Por favor, rellena todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    const result = await createSection(
      { ...formData, capacity: Number(formData.capacity) },
      authority,
    );

    if (!result.success) {
      toast.error(
        typeof result.error === "string"
          ? result.error
          : (result.message ?? "Error al crear la sección"),
      );
      setLoading(false);
      return;
    }

    toast.success(result.message ?? "¡Sección creada con éxito!");
    setFormData({
      name: "",
      teacherId: "",
      yearId: "",
      capacity: 35,
      period: "",
      SIG,
    });
    onSuccess?.();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <div className="grid grid-cols-2 gap-2">
        <Selector
          options={years.map((year) => ({ value: year.id, label: year.name }))}
          name={"yearId"}
          label={"Seleciona un año"}
          onChange={(e) => handleUpdate("yearId", e.target.value)}
          value={formData.yearId}
        />
        <Selector
          options={sectionOptions}
          name={"name"}
          label={"Selecciona la sección"}
          onChange={(e) => handleUpdate("name", e.target.value)}
          value={formData.name}
        />
        {/* Fila 2: Docente Guía (Ocupa todo el ancho) */}
        <div className="col-span-2">
          <Selector
            options={teachers}
            name="teacherId"
            label="Asignar Docente Guía"
            onChange={(e) => handleUpdate("teacherId", e.target.value)}
            value={formData.teacherId}
          />
        </div>

        <div className="col-span-2">
          <Input
            type="number"
            name="capacity"
            label="Capacidad Máxima (Cupos)"
            placeholder="Ej: 35"
            value={formData.capacity}
            onChange={(e) => handleUpdate("capacity", e.target.value)}
          />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 col-span-2">
          <div className="flex items-center gap-2">
            <Icon icon={faInfoCircle} className="text-gray-500 text-xl" />
            <p className="text-sm text-gray-500">
              Se recomienda que la capacidad máxima sea de 35 alumnos por
              sección.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={loading}
          icon={loading ? faSpinner : faCheck} // Cambia el icono si está cargando
          classNameBtn={`rounded-lg px-8 py-2 font-bold text-white transition-all 
            ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:shadow-lg active:scale-95"}`}
        >
          {loading ? "Cargando..." : "Crear Sección"}
        </Button>
      </div>
    </form>
  );
}
