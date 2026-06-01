import Button from "../atom/Button";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import { createSubject } from "@/services/subject/createSubject";
import { getYears } from "@/services/subject/getYears";
import { faSpinner, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function FormSubject({ schoolId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    SIG: schoolId,
    year_id: "",
  });

  const [years, setYears] = useState([]);

  useEffect(() => {
    getYears(schoolId).then((data) => {
      setYears(data.map((year) => ({ value: year.id, label: year.name })));
    });
  }, []);

  const handleUpdate = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

    const result = await createSubject(formData);
    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success("Asignatura creada exitosamente");
    setFormData({
      name: "",
      schoolId: schoolId,
      year_id: "",
    });
    onSuccess?.();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <Input
          label="Nombre de la Asignatura"
          name="name"
          placeholder="Ej: Matemáticas"
          value={formData.name}
          onChange={(e) => handleUpdate("name", e.target.value)}
          required
        />
      </div>

      <Selector
        label="Año Escolar de la Asignatura"
        options={years}
        value={formData.year_id}
        onChange={(e) => handleUpdate("year_id", e.target.value)}
        required
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={loading}
          icon={loading ? faSpinner : faSave}
          classNameBtn={`w-full md:w-auto rounded-xl px-10 py-3 font-bold text-white transition-all 
          ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md"}`}
        >
          {loading ? "Guardando..." : "Registrar Asignatura"}
        </Button>
      </div>
    </form>
  );
}
