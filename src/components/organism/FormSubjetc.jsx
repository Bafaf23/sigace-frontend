"use client";

import Button from "../atom/Button";
import Input from "../atom/Input";
import { createSubject } from "@/services/subject/createSubject";
import { faSpinner, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormSubject({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleUpdate = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createSubject(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("Asignatura creada exitosamente");
    setFormData({
      name: "",
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
          placeholder="Matemáticas, fisica, quimica..."
          value={formData.name}
          onChange={(e) => handleUpdate("name", e.target.value)}
          required
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={loading}
          icon={loading ? faSpinner : faSave}
          classNameBtn={`w-full md:w-auto font-bold text-white transition-all 
          ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-md"}`}
        >
          {loading ? "Guardando..." : "Registrar Asignatura"}
        </Button>
      </div>
    </form>
  );
}
