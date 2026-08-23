import Input from "../atom/Input";
import Selector from "../atom/Selector";
import Button from "../atom/Button";
import { useState } from "react";
import { createSchool } from "@/services/school/createSchool";
import { updateSchool } from "@/services/school/updateSchool";
import toast from "react-hot-toast";
import Banner from "../atom/Banner";
import {
  faArrowsAltV,
  faCheck,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
export default function FormInstitucion({
  institution,
  onSuccess,
  isEdit = false,
  directores = [],
}) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    SIG: institution?.SIG || "",
    name: institution?.school_name || "",
    address: institution?.address || "",
    phone: institution?.phone || "",
    company_name: institution?.company_name || "",
    email: institution?.email || "",
    type: institution?.type || "Pública",
    RIF: institution?.RIF || "",
    municipality: institution?.municipality || "",
    cdceId: institution?.cdceId || 1,
    state: institution?.state || "Miranda",
    director_id: institution?.director_id || "",
    city: institution?.city || "",
    DEA_CODE: institution?.DEA_CODE || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.type ||
      (formData.type === "Pública" && !formData.DEA_CODE) ||
      (formData.type === "Privada" && (!formData.RIF || !formData.company_name))
    ) {
      setLoading(false);
      toast.error("Todos los campos son obligatorios");
      return;
    }
    const result = isEdit
      ? await updateSchool(formData)
      : await createSchool(formData);
    if (result.error) {
      setLoading(false);
      toast.error(result.error);
      return;
    }
    if (result.success) {
      toast.success(
        isEdit
          ? "Institucion actualizada exitosamente"
          : "Institucion creada exitosamente",
      );
      setLoading(false);
      onSuccess?.();
    } else {
      setLoading(false);
      toast.error(result.error);
      return;
    }
  };

  const totalPage = 2;
  const isLastStep = currentPage === totalPage;

  return (
    <form className="space-y-6 p-2" onSubmit={handleSubmit}>
      <Banner
        titel="Subdominio Automatico"
        message="EL subdominio se creara de forma automatica."
        icon={faInfo}
      />
      {currentPage === 1 && (
        <div className="space-y-3">
          <Selector
            name="type"
            label="Seleccione el tipo de institución"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: "Pública", label: "Pública" },
              { value: "Privada", label: "Privada" },
            ]}
          />
          <div className="grid grid-cols-1 gap-2">
            {formData.type === "Pública" ? (
              <Input
                name="school_name"
                label="Nombre de la institucion"
                placeholder="Institucion de Educacion"
                value={formData.school_name}
                onChange={(e) =>
                  setFormData({ ...formData, school_name: e.target.value })
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="name"
                  label="Nombre de la institucion"
                  placeholder="Institucion de Educacion"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  name="company_name"
                  label="Razon social"
                  placeholder="Ej: La Paloma. S.A"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {formData.type === "Pública" ? (
              <div className="grid grid-cols-1 gap-2">
                <Input
                  name="DEA_CODE"
                  label="Codigo DEA"
                  placeholder="Ej: PD00001234"
                  value={formData.DEA_CODE}
                  onChange={(e) =>
                    setFormData({ ...formData, DEA_CODE: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="RIF"
                  label="RIF"
                  placeholder="Ej: J1234567890"
                  value={formData.RIF}
                  onChange={(e) =>
                    setFormData({ ...formData, RIF: e.target.value })
                  }
                />
                <Input
                  name="DEA_CODE"
                  label="Codigo DEA"
                  placeholder="Ej: PD00001234"
                  value={formData.DEA_CODE}
                  onChange={(e) =>
                    setFormData({ ...formData, DEA_CODE: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div className="space-y-2">
          <Selector
            name="state"
            label="Estado"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            options={[{ value: "miranda", label: "Miranda" }]}
          />
          <div className="grid grid-cols-1 gap-2">
            <Input
              name="address"
              label="Dirección"
              placeholder="Calle 123, Barrio 456, Caracas 1010"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                name="city"
                label="Ciudad"
                placeholder="Caracas"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <Input
                name="municipality"
                label="Municipio"
                placeholder="EL hatillo"
                value={formData.municipality}
                onChange={(e) =>
                  setFormData({ ...formData, municipality: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              name="phone"
              label="Teléfono"
              placeholder="04123456789"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              name="email"
              placeholder="ejemplo@institucion.com"
              label="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {isLastStep ? (
          <Button
            icon={faCheck}
            type="submit"
            disabled={loading}
            classNameBtn="px-4 py-2 bg-emerald-600 text-white rounded font-bold cursor-pointe"
          >
            Guardar
          </Button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded font-bold"
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
}
