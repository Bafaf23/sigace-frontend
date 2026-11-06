"use client";
import Banner from "../atom/Banner";
import Button from "../atom/Button";
import Icon from "../atom/Icon";
import Input from "../atom/Input";
import AcademicFields from "../molecules/AcademicBackgroundFields";
import EnrollmentSchool from "../molecules/EnrollmentSchool";
import HealthPhysicalFields from "../molecules/HealthPhysicalFields";
import LegalRepresentativeFields from "../molecules/LegalRepresentativeFields";
import LocationFields from "../molecules/LocationFields";
import PersonalDataFields from "../molecules/PersonalDataFields";
import { createStudent } from "@/services/student/createStudent";
import { updateStudent } from "@/services/student/updateStudent";
import { faInfoCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormInscrip({ mode, student, onSuccess }) {
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    documentType: "V",
    document: student?.document || "",
    name: student?.name || "",
    lastName: student?.last_name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    gender: student?.gender || "",
    status: student?.status || "",
    birthDate: student?.birth_date
      ? new Date(student.birth_date).toISOString().split("T")[0]
      : "",

    isNewEntry: false,
    previousSchool: student?.previous_school || "",
    previousSchoolCode: student?.previous_school_code || "",
    previousYear: student?.previous_year || "",
    previousSection: student?.previous_section || "",

    role_id: 2,

    allergies: student?.allergies || "",
    shirtSize: student?.shirt_size || "",
    pantSize: student?.pants_size || "",
    shoeSize: student?.shoe_size || "",
    weight: student?.weight || "",
    medicalCondition: student?.medical_condition || "",
    height: student?.height || "",

    repdniType: student?.repdniType || "V",
    repdni: student?.repdni || "",
    repName: student?.rep_name || "",
    repLastName: student?.rep_last_name || "",
    repPhone: student?.rep_phone || "",
    relationship: student?.relationship || "",
    repEmail: student?.rep_email || "",
  });

  const totalSteps = mode === "edit" ? 2 : formData.isNewEntry ? 5 : 4;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (passed === 1) {
      if (
        !formData.documentType ||
        !formData.document ||
        !formData.name ||
        !formData.lastName
      ) {
        return toast.error(
          "Por favor, completa los campos obligatorios del estudiante.",
        );
      }
    }
    setPassed((p) => Math.min(totalSteps, p + 1));
  };

  const handleKeyDown = (e) => {
    // Evitar que enviar el formulario con 'Enter' salte pasos
    if (e.key === "Enter" && passed < totalSteps) {
      e.preventDefault();
      handleNextStep();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (loading) return;

    if (
      !formData.documentType ||
      !formData.document ||
      !formData.name ||
      !formData.lastName
    ) {
      return toast.error(
        "Por favor, rellena los campos obligatorios del estudiante.",
      );
    }

    if (
      mode !== "edit" &&
      (!formData.repdni || !formData.repName || !formData.repLastName)
    ) {
      return toast.error(
        "Por favor, completa los datos del representante legal.",
      );
    }

    setLoading(true);

    if (mode === "edit") {
      const result = await updateStudent(formData);
      if (result?.success !== true) {
        toast.error(result?.message);
      } else {
        toast.success(result.message);
        onSuccess?.();
      }
    } else {
      const result = await createStudent(formData);
      if (result?.success !== true) {
        toast.error(result?.message);
      } else {
        toast.success(result.message);
        onSuccess?.();
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="space-y-4 w-full max-w-2xl mx-auto"
    >
      {/* Banner modo edit */}
      {mode === "edit" && (
        <div className="bg-cyan-50/50 border border-cyan-200 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-cyan-800 font-medium leading-relaxed">
            <strong className="text-cyan-900 font-semibold">Nota:</strong> La
            condición y el estatus del estudiante se actualizarán de forma
            automática al final del periodo académico.
          </p>

          <div className="mt-3 pt-3 border-t border-cyan-200/60 flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-700 bg-cyan-100/50 px-2 py-0.5 rounded-md">
              Acción
            </span>
            <p className="text-xs text-cyan-600 font-medium">
              En caso de{" "}
              <span className="font-semibold text-cyan-800">Traslado</span> o{" "}
              <span className="font-semibold text-cyan-800">Retirado</span>, por
              favor contacte a soporte.
            </p>
          </div>
        </div>
      )}

      {/* PASO 1: Datos Personales (Común para todos) */}
      {passed === 1 && (
        <PersonalDataFields
          datos={formData}
          manejarCambio={handleChange}
          mode={mode}
        />
      )}

      {/* FLUJO: NUEVO INGRESO (isNewEntry: true) */}
      {mode !== "edit" && formData.isNewEntry && (
        <>
          {passed === 2 && (
            <AcademicFields datos={formData} manejarCambio={handleChange} />
          )}
          {passed === 3 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 4 && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* FLUJO: INGRESO REGULAR (isNewEntry: false) */}
      {mode !== "edit" && !formData.isNewEntry && (
        <>
          {passed === 2 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 3 && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* FLUJO: EDICIÓN (mode === "edit") */}
      {mode === "edit" && (
        <>
          {passed === 2 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* PASO FINAL: Información de Cuenta (Solo en creación) */}
      {passed === totalSteps && mode !== "edit" && (
        <div className="space-y-6">
          <Banner
            icon={faStopCircle}
            title="Reglamento, términos y condiciones"
            message="Al presionar el botón de inscribir, acepta los términos y condiciones del sistema (ScholPack) y el reglamento interno de la institución educativa en la que desea inscribir al estudiante. Se recomienda leer el reglamento y los términos y condiciones antes de continuar."
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <Input
              label="Usuario para ingresar al sistema"
              name="email"
              value={formData.email}
              readOnly
            />

            <Input
              label="Contraseña temporal para ingresar al sistema"
              name="document"
              value={formData.document ? `${formData.document}@2026` : ""}
              readOnly
            />
          </div>
        </div>
      )}

      {/* CONTROLES DE NAVEGACIÓN */}
      <div className="mt-5 flex justify-between pt-6">
        <Button
          type="button"
          onClick={() => setPassed((p) => Math.max(1, p - 1))}
          classNameBtn={`text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-400 font-medium border border-slate-300 dark:border-zinc-600 rounded-lg px-5 py-2 cursor-pointer ${
            passed === 1 ? "invisible" : ""
          }`}
        >
          Anterior
        </Button>

        {passed < totalSteps && (
          <Button
            type="button"
            onClick={handleNextStep}
            classNameBtn="rounded-lg bg-orange-600 px-5 py-2 font-bold text-white transition-all hover:bg-orange-700 active:scale-95 group flex items-center gap-5 cursor-pointer"
          >
            Siguiente
          </Button>
        )}

        {passed === totalSteps && (
          <Button
            type="submit"
            disabled={loading}
            classNameBtn="rounded-lg bg-green-600 px-5 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 cursor-pointer"
          >
            {loading
              ? "Procesando..."
              : mode === "edit"
                ? "Actualizar"
                : "Finalizar"}
          </Button>
        )}
      </div>
    </form>
  );
}
