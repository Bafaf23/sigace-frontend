import Button from "../atom/Button";
import Selector from "../atom/Selector";
import { createEnrollment } from "@/services/enrollment/createEnrollment";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormAssignStudent({
  students,
  period,
  id_section,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    id_student: "",
    id_section: id_section,
    id_period: period,
    status: "Activo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.id_student) {
      return toast.error("Por favor, selecciona un Estudiante");
    }

    setLoading(true);

    const result = await createEnrollment(dataForm);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success("Estudiante asignado con éxito");
    setDataForm({
      id_student: "",
      id_section: id_section,
      id_period: period,
      status: "Activo",
    });
    onSuccess?.();
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <Selector
        label={"Seleciona un Estudiante"}
        options={students?.map((s) => ({
          value: s.id,
          label: `${s.document} - ${s.name} ${s.last_name}`,
        }))}
        value={dataForm.id_student}
        onChange={(e) =>
          setDataForm({ ...dataForm, id_student: e.target.value })
        }
      />

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
        Se inscribirá automáticamente en la sección actual.
      </div>

      <Button
        icon={faUser}
        type="submit"
        disabled={loading || students.length === 0}
        classNameBtn="w-full rounded-lg bg-indigo-600 py-2 font-bold text-white transition-all hover:bg-indigo-700 disabled:bg-slate-300"
      >
        {loading ? "Registrando..." : "Confirmar Inscripción"}
      </Button>
    </form>
  );
}
