import Input from "../atom/Input";
import Selector from "../atom/Selector";
import Button from "../atom/Button";
import { useState } from "react";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { createSchool } from "@/services/createSchool";
import toast from "react-hot-toast";
export default function FormInstitucion() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    tipo: "publico",
    rif: "",
    codigo_DEA: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.nombre ||
      !formData.direccion ||
      !formData.telefono ||
      !formData.correo ||
      !formData.tipo ||
      (formData.tipo === "publico" && !formData.codigo_DEA) ||
      (formData.tipo === "privado" && !formData.rif)
    ) {
      setLoading(false);
      toast.error("Todos los campos son obligatorios");
      return;
    }
    const result = await createSchool(formData);
    if (result.error) {
      setLoading(false);
      toast.error(result.error);
      return;
    }
    if (result.success) {
      toast.success("Institucion creada exitosamente");
      setLoading(false);
    }
  };
  return (
    <form className="space-y-6 p-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-2">
        <Input
          name="nombre"
          label="Nombre de la institucion"
          placeholder="Institucion de Educacion"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Input
          name="direccion"
          label="Dirección"
          placeholder="Calle 123, Barrio 456, Caracas 1010"
          value={formData.direccion}
          onChange={(e) =>
            setFormData({ ...formData, direccion: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          name="phone"
          label="Teléfono"
          placeholder="04123456789"
          value={formData.telefono}
          onChange={(e) =>
            setFormData({ ...formData, telefono: e.target.value })
          }
        />
        <Input
          name="email"
          placeholder="ejemplo@institucion.com"
          label="Correo electrónico"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Selector
          name="tipo"
          label="Tipo"
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          options={[
            { value: "publico", label: "Público" },
            { value: "privado", label: "Privado" },
          ]}
        />
        {formData.tipo === "publico" ? (
          <div className="grid grid-cols-1 gap-2">
            <Input
              name="dea"
              label="Codigo DEA"
              placeholder="Ej: PD00001234"
              value={formData.codigo_DEA}
              onChange={(e) =>
                setFormData({ ...formData, codigo_DEA: e.target.value })
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <Input
              name="rif_institucion"
              label="RIF"
              placeholder="Ej: J1234567890"
              value={formData.rif}
              onChange={(e) =>
                setFormData({ ...formData, rif: e.target.value })
              }
            />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          disabled={loading}
          type="submit"
          icon={faSave}
          classNameBtn="bg-indigo-500 p-2 rounded-md text-slate-50 font-bold cursor-pointer flex items-center gap-1"
        >
          Crear Institucion
        </Button>
      </div>
    </form>
  );
}
