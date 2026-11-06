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
import Success from "./Success";
import { incripOnline } from "@/services/student/createStudent";
import { updateStudent } from "@/services/student/updateStudent";
import {
  faInfoCircle,
  faStopCircle,
  faHeadSideCough,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormInscripOnline({ onSuccess, nameSchool, SIG }) {
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    documentType: "V",
    document: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    status: "",
    birthDate: "",

    isNewEntry: false,
    previousSchool: "",
    previousSchoolCode: "",
    previousYear: "",
    previousSection: "",

    SIG: SIG,
    role_id: 2,

    allergies: "",
    shirtSize: "",
    pantSize: "",
    shoeSize: "",
    weight: "",
    medicalCondition: "",
    height: "",

    repdniType: "V",
    repdni: "",
    repName: "",
    repLastName: "",
    repPhone: "",
    relationship: "",
    repEmail: "",
  });

  const totalSteps = 4;

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

    setLoading(true);

    const result = await incripOnline(formData);

    if (result?.success !== true) {
      toast.error(result?.message || "Ocurrió un error.");
    } else {
      toast.success(result.message);
      setSuccessData(result.data);
      onSuccess?.();
    }
    setLoading(false);
  };

  if (successData)
    return (
      <Success data={successData} school={{ name: nameSchool, SIG: SIG }} />
    );

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="space-y-4 w-full max-w-2xl mx-auto"
    >
      {/* PASO 1: Datos Personales (Común para todos) */}
      {passed === 1 && (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-extrabold text-amber-500 uppercase">
              Tus datos personales
            </h4>
          </div>
          <Banner
            icon={faIdCard}
            title="¿No tienes cedula de identidad?"
            message="Si aun no tienes cedula de identidad, puedes seleccionar 'CE' (Cédula de estudiantil) como tipo de documento y completar el campo con la cedula de tu representante."
          />
          <PersonalDataFields datos={formData} manejarCambio={handleChange} />
        </>
      )}

      {/* FLUJO: NUEVO INGRESO (isNewEntry: true) */}

      {/* {passed === 2 && (
          <AcademicFields datos={formData} manejarCambio={handleChange} />
        )} */}
      {passed === 2 && (
        <>
          <h4 className="font-extrabold text-amber-500 text-2xl uppercase">
            Tus datos medicos y fisicos
          </h4>
          <Banner
            icon={faHeadSideCough}
            title="¿No padecesde alguna condición médica?"
            message="Si no padeces ninguna condición o alergia médica, deja los campos en blanco."
          />
          <HealthPhysicalFields datos={formData} manejarCambio={handleChange} />
        </>
      )}

      {passed === 3 && (
        <>
          <div>
            <h4 className="font-extrabold text-amber-500 uppercase text-2xl">
              Hey, ¡Casi terminamos!
            </h4>
            <p className="dark:text-zinc-300 text-slate-600 font-medium">
              Ahora necesitamos los datos del representante legal.
            </p>
          </div>
          <LegalRepresentativeFields
            datos={formData}
            manejarCambio={handleChange}
          />
        </>
      )}

      {/* PASO FINAL: Información de Cuenta (Solo en creación) */}
      {passed === totalSteps && (
        <div className="space-y-6">
          <div>
            <h4 className="font-extrabold text-amber-500 uppercase text-2xl">
              Una cosa más para terminar
            </h4>
            <p className="text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
              Verifica la información suministrada. Si ves algún error, regresa
              y corrígelo.
            </p>
          </div>

          <Banner
            icon={faStopCircle}
            title="Reglamento, términos y condiciones"
            message="Al presionar el botón de inscribir, acepta los términos y condiciones del sistema (ScholPack) y el reglamento interno de la institución educativa en la que desea inscribir al estudiante. Se recomienda leer el reglamento y los términos y condiciones antes de continuar."
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="col-span-2">
              <Input
                label="Escuela que procesa el registro"
                name="school"
                value={`${nameSchool || ""} (${SIG || ""})`}
                readOnly
              />
            </div>

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
            {loading ? "Procesando..." : "Finalizar"}
          </Button>
        )}
      </div>
    </form>
  );
}
