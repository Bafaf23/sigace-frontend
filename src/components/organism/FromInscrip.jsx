"use client";
import Button from "../atom/Button";
import Icon from "../atom/Icon";
import Input from "../atom/Input";
import InputPass from "../atom/InputPass";
import AcademicFields from "../molecules/AcademicBackgroundFields";
import EnrollmentSchool from "../molecules/EnrollmentSchool";
import HealthPhysicalFields from "../molecules/HealthPhysicalFields";
import LegalRepresentativeFields from "../molecules/LegalRepresentativeFields";
import LocationFields from "../molecules/LocationFields";
import ParentsFields from "../molecules/ParentsFields";
import PersonalDataFields from "../molecules/PersonalDataFields";
import EnrollmentSuccessPage from "@/app/(auth)/enrollment/success/page";
import Terms from "@/components/atom/Terms";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import { createStudent } from "@/services/student/createStudent";
import { updateStudent } from "@/services/student/updateStudent";
import {
  faLeftLong,
  faRightLong,
  faUserPlus,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormInscrip({
  SIG,

  id_period,
  mode,
  student,
}) {
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);

  /**
   * Datos del estudiante.
   * @property {string} documentType - Tipo de documento del estudiante.
   * @property {string} document - Numero de documento del estudiante.
   * @property {string} name - Nombre del estudiante.
   * @property {string} lastName - Apellido del estudiante.
   * @property {string} email - Correo electronico del estudiante.
   * @property {string} phone - Numero de telefono del estudiante.
   * @property {string} gender - Sexo del estudiante.
   * @property {string} birthDate - Fecha de nacimiento del estudiante.
   * @property {string} allergies - Alergias del estudiante.
   * @property {string} shirtSize - Talla de camisa del estudiante.
   * @property {string} pantSize - Talla de pantalon del estudiante.
   * @property {string} shoeSize - Talla de zapato del estudiante.
   * @property {string} weight - Peso del estudiante.
   * @property {string} medicalCondition - Condicion medica del estudiante.
   * @property {string} height - Altura del estudiante.
   * @property {string} repdniType - Tipo de documento del representante legal del estudiante.
   * @property {string} repdni - Numero de documento de identidad del representante legal del estudiante.
   * @property {string} repName - Nombre del representante legal del estudiante.
   * @property {string} repLastName - Apellido del representante legal del estudiante.
   * @property {string} repPhone - Numero de telefono del representante legal del estudiante.
   * @property {string} repEmail - Correo electronico del representante legal del estudiante.
   * @property {string} relationship - Parentesco del representante legal del estudiante.
   * @property {string} username - Usuario para ingresar al sistema.
   * @property {string} createdAt - Fecha de creacion del estudiante.
   */
  const [formData, setFormData] = useState({
    // Paso 1: Personales + Academicos
    id_student: student?.id || "",
    id_user: student?.id_user || "",
    documentType: "V-",
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

    // Paso 2: Academicos
    isNewEntry: false,
    previousSchool: student?.previous_school || "",
    previousSchoolCode: student?.previous_school_code || "",
    previousYear: student?.previous_year || "",
    previousSection: student?.previous_section || "",
    canaimaSerial: student?.canaima_serial || "",

    // Paso 3: Enrollment
    year: student?.id_year || "",
    section: student?.id_section || "",
    SIG: student?.SIG || SIG,
    role_id: student?.role_id || 2,
    id_period: student?.id_period || id_period,

    // Paso 3: Health
    allergies: student?.allergies || "",
    shirtSize: student?.shirt_size || "",
    pantSize: student?.pants_size || "",
    shoeSize: student?.shoe_size || "",
    weight: student?.weight || "",
    medicalCondition: student?.medical_condition || "",
    height: student?.height || "",

    // Paso 5: Representante legal (legal_representatives + rep_* en students)
    repdniType: student?.repdniType || "V-",
    repdni: student?.repdni || "",
    repName: student?.rep_name || "",
    repLastName: student?.rep_last_name || "",
    repPhone: student?.rep_phone || "",
    relationship: student?.relationship || "",
    repEmail: student?.rep_email || "",
    birthCertificate: student?.birth_certificate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (passed !== totalSteps || loading) return;
    setLoading(true);
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

    if (mode !== "edit") {
      if (
        !formData.repdniType ||
        !formData.repdni ||
        !formData.repName ||
        !formData.repLastName
      ) {
        return toast.error(
          "Por favor, completa los datos del representante legal.",
        );
      }

      if (!formData.SIG) {
        return toast.error("El SIG es obligatorio.");
      }
    }

    console.log(formData);
    let result;
    if (mode === "edit") {
      result = await updateStudent(formData );
    } else {
      result = await createStudent(formData);
    }
    if (result.success !== true) {
      return toast.error(result.message);
    } else {
      toast.success(result.message);
    }
    setLoading(false);
  };

  const totalSteps = mode !== "edit" ? (formData.isNewEntry ? 5 : 4) : 2;

  return (
    <form onSubmit={handleSubmit}>
      {/* PASO 1: Datos Personales (Siempre visible) */}
      {passed === 1 && (
        <div className="animate-in fade-in space-y-8 duration-500">
          <PersonalDataFields
            datos={formData}
            manejarCambio={handleChange}
            mode={mode}
          />
        </div>
      )}

      {/* 🚀 EL PASO EXTRA DINÁMICO: Solo existe si isNewEntry es true */}
      {formData.isNewEntry ? (
        <>
          {passed === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              {/* Aquí va tu nuevo componente de los datos del liceo anterior */}
              <AcademicFields datos={formData} manejarCambio={handleChange} />
            </div>
          )}
          {passed === 3 && (
            <LocationFields datos={formData} manejarCambio={handleChange} />
          )}
          {passed === 4 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 5 && mode !== "edit" && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      ) : (
        <>
          {/* Si NO es nuevo ingreso, los pasos se acortan (Ubicación pasa a ser el paso 2 directamente) */}
          {passed === 2 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 3 && mode !== "edit" && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* PASO FINAL: Contraseña y Términos (Siempre es el último paso, sea 7 u 8) */}
      {passed === totalSteps && mode !== "edit" && (
        <div className="animate-in fade-in duration-300 space-y-6">
          <Input
            label="Usuario para ingresar al sistema"
            name="username"
            value={formData.email}
            readOnly
          />
          <div className="text-sm text-cyan-700 p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/50 flex items-center gap-2">
            <Icon icon={faCircleInfo} className="text-cyan-500 text-xl" />
            <p className="font-medium">
              Para iniciar sesion, se le notificara al estudiante a traves de su
              correo electronico.
            </p>
          </div>
        </div>
      )}
      <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
        <Button
          type="button"
          icon={faLeftLong}
          onClick={() => setPassed((p) => Math.max(1, p - 1))}
          classNameBtn={`text-slate-400 hover:text-slate-600 font-medium ${passed === 1 ? "invisible" : ""}`}
        >
          Anterior
        </Button>

        <Button
          type="button"
          icon={faRightLong}
          onClick={() => setPassed((p) => Math.min(totalSteps, p + 1))}
          classNameBtn={`rounded-lg bg-indigo-600 px-8 py-2 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 group flex items-center gap-5 ${passed >= totalSteps ? "hidden" : ""}`}
        >
          Siguiente
        </Button>
        <Button
          type="button"
          icon={faUserPlus}
          disabled={loading}
          onClick={handleSubmit}
          classNameBtn={`rounded-lg bg-green-600 px-8 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 ${passed < totalSteps ? "hidden" : ""}`}
        >
          {loading
            ? "Procesando..."
            : mode === "edit"
              ? "Actualizar"
              : "Inscribir"}
        </Button>
      </div>
    </form>
  );
}
