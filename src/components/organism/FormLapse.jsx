import Button from "../atom/Button";
import Input from "../atom/Input";
import { createLapse } from "@/services/lapse/createLapse";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormLapse({ period, token }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    period: period,
    start_date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await createLapse(formData, token);
    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success("Lapso creado exitosamente");
    setFormData({ name: "", period: period });
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <Input
          label="Nombre del Lapso"
          type="text"
          name="name"
          placeholder="Ej: Lapso 1"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Fecha de inicio"
          type="date"
          name="period"
          value={formData.start_date}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          classNameBtn="bg-green-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
          icon={faSave}
        >
          Crear Lapso
        </Button>
      </div>
    </form>
  );
}
