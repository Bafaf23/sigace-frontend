import Banner from "../atom/Banner";
import Button from "../atom/Button";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import { createSchool } from "@/services/school/createSchool";
import { updateSchool } from "@/services/school/updateSchool";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormInstitucion({
  institution,
  onSuccess,
  isEdit = false,
  cdde,
}) {
  const [loading, setLoading] = useState(false);

  const director = institution?.usersByRole.director?.[0] || {};

  const [formData, setFormData] = useState({
    SIG: institution?.SIG || "",
    name: institution?.name || institution?.school_name || "",
    address: institution?.address || "",
    phone: institution?.phone || "",
    company_name: institution?.company_name || "",
    email: institution?.email || "",
    type: institution?.type || "Publica",
    RIF: institution?.RIF || "",
    municipality: institution?.municipality || "",
    cdceId: institution?.cdcee.id || 1,
    cdceName: institution?.cdcee.name || "",
    state: institution?.state || "Miranda",
    director_id: director.id || "",
    city: institution?.city || "",
    DEA_CODE: institution?.code_DEA || "",
  });

  const isPublic = formData.type === "Publica";

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (newType) => {
    setFormData((prev) => ({
      ...prev,
      type: newType,
      // Limpia los campos si cambia a pública
      ...(newType === "Publica"
        ? { RIF: "", company_name: "" }
        : { code_DEA: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.type ||
      (formData.type === "Publica" && !formData.DEA_CODE) ||
      (formData.type === "Privada" && (!formData.RIF || !formData.company_name))
    ) {
      toast.error(
        "Por favor completa los campos obligatorios correspondientes",
      );
      return;
    }

    setLoading(true);

    try {
      const result = isEdit
        ? await updateSchool(formData)
        : await createSchool(formData);

      if (result?.success) {
        toast.success(
          isEdit
            ? "Institución actualizada exitosamente"
            : "Institución creada exitosamente",
        );
        onSuccess?.();
      } else {
        toast.error(
          result?.error || "Ocurrió un error al procesar la solicitud",
        );
      }
    } catch (err) {
      toast.error("Error inesperado en la comunicación con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Sección 1: Información Institucional */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-start w-full">
          <div caseName="w-fit">
            <Input
              name="SIG"
              label="Código SIG"
              placeholder={"SIG"}
              readOnly={true}
              value={formData.SIG}
              onChange={(e) => handleChange("SIG", e.target.value)}
            />
          </div>
          <div className="lg:col-span-2">
            <Input
              name="name"
              label="Nombre de la institución"
              placeholder="Ej: U.E.N. Simón Bolívar"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 items-end gap-2 w-full">
            <div>
              <Selector
                name="type"
                label="Tipo de institución"
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                options={[
                  { value: "Publica", label: "Pública" },
                  { value: "Privada", label: "Privada" },
                ]}
              />
            </div>
            <div>
              <Input
                name="DEA_CODE"
                label="Código DEA"
                placeholder={"Ej: OD00001234"}
                readOnly={isEdit}
                value={formData.DEA_CODE}
                onChange={(e) => handleChange("DEA_CODE", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Input
              name="RIF"
              label="RIF"
              placeholder={!isPublic ? "J123456780" : "G200000090"}
              value={formData.RIF}
              readOnly={isPublic}
              onChange={(e) => handleChange("RIF", e.target.value)}
            />
          </div>

          <div>
            <Input
              name="company_name"
              label="Razón Social"
              placeholder={
                !isPublic
                  ? "C.E. San Martín C.A."
                  : "Ministerio del Poder Popular para la Educación"
              }
              value={formData.company_name}
              readOnly={isPublic}
              onChange={(e) => handleChange("company_name", e.target.value)}
            />
          </div>

          <div>
            {isEdit == true ? (
              <Input
                name="ccedeName"
                label="Centro de Desarrollo Estudiantil (CDCE)"
                value={formData.cdceName}
                readOnly={true}
                onChange={(e) => handleChange("cdceName", e.target.value)}
              />
            ) : (
              <Selector
                name="cdceName"
                label="Centro de Desarrollo Estudiantil (CDCE)"
                value={formData.cdceId}
                onChange={(e) => handleTypeChange(e.target.value)}
                options={cdde.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            )}
          </div>

          <div>
            <Input
              name="dirrector_id"
              label="Director(a) de la institución"
              value={`${director.name || ""} ${director.last_name || ""} (${director.id_card || ""})`}
              readOnly={true}
              onChange={(e) => handleChange("dirrector_id", e.target.value)}
            />
          </div>

          <div>
            <Input
              name="phone"
              label="Teléfono de contacto"
              placeholder="04121234567"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Input
              name="email"
              label="Correo electrónico"
              placeholder="contacto@institucion.edu.ve"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Ubicación */}
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div>
            <Selector
              name="state"
              label="Estado"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              options={[{ value: "Miranda", label: "Miranda" }]}
            />
          </div>

          <div>
            <Input
              name="city"
              label="Ciudad"
              placeholder="Ej: Los Teques"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div>
            <Input
              name="municipality"
              label="Municipio"
              placeholder="Ej: Guaicaipuro"
              value={formData.municipality}
              onChange={(e) => handleChange("municipality", e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <Input
              name="address"
              label="Dirección detallada"
              placeholder="Ej: Av. Principal, Calle 4, Edificio Escolar, Sector Centro"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-zinc-800">
        <Button
          icon={faCheck}
          type="submit"
          disabled={loading}
          classNameBtn="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading
            ? "Guardando..."
            : isEdit
              ? "Actualizar Institución"
              : "Registrar Institución"}
        </Button>
      </div>
    </form>
  );
}
