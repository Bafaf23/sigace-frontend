"use client";
import Button from "../atom/Button";
import Input from "../atom/Input";
import InputPass from "../atom/InputPass";
import AcademicFields from "../molecules/AcademicBackgroundFields";
import HealthPhysicalFields from "../molecules/HealthPhysicalFields";
import LegalRepresentativeFields from "../molecules/LegalRepresentativeFields";
import LocationFields from "../molecules/LocationFields";
import ParentsFields from "../molecules/ParentsFields";
import PersonalDataFields from "../molecules/PersonalDataFields";
import EnrollmentSuccessPage from "@/app/(auth)/enrollment/success/page";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import {
  faLeftLong,
  faRightLong,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import EnrollmentSchool from "../molecules/EnrollmentSchool";
import Terms from "@/components/atom/Terms";

const GENDER_TO_DB = { F: "femenino", M: "masculino" };

const RELATIONSHIP_TO_DB = {
  madre: "mamá",
  mamá: "mamá",
  padre: "papá",
  papá: "papá",
  tutor: "tutor",
  proteccionIntegral: "institucional",
  institucional: "institucional",
};

function buildFullDni(type, number) {
  if (!type || !number) return "";
  return `${type}${number}`;
}

function buildConditionDescription(formData) {
  if (!formData.isNewEntry) return "Ingreso regular";

  const parts = [
    formData.previousSchool && `Plantel: ${formData.previousSchool}`,
    formData.previousSchoolCode && `DEA: ${formData.previousSchoolCode}`,
    formData.previousYear && `Año cursado: ${formData.previousYear}`,
    formData.previousSection && `Sección: ${formData.previousSection}`,
    formData.canaimaSerial && `Canaima: ${formData.canaimaSerial}`,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" | ") : "Nuevo ingreso";
}

/** Arma el cuerpo del POST alineado con users, students y legal_representatives. */
/** IDs devueltos por POST /create_enrolelment/ */
function pickEnrolelmentIds(response) {
  if (!response || typeof response !== "object") return {};
  const userId = response.user_id ?? response.userId;
  const studentId = response.student_id ?? response.studentId;
  const resolved = userId ?? studentId ?? response.id;
  if (resolved == null || resolved === "") return {};
  return {
    user_id: resolved,
    student_id: studentId ?? resolved,
  };
}

function buildEnrolelmentPayload(formData) {
  const repDni = buildFullDni(formData.repdniType, formData.repdni);
  const relationship =
    RELATIONSHIP_TO_DB[formData.relationship] || formData.relationship;

  return {
    documentType: formData.documentType,
    document: formData.document,
    name: formData.name,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    birthDate: formData.birthDate,
    pass: formData.pass,
    sig: formData.sig,
    section: formData.section,
    year: formData.year,
    gender: GENDER_TO_DB[formData.gender] || formData.gender,
    birthCountry: formData.birthCountry || "Venezuela",
    state: formData.state,
    municipality: formData.municipality,
    addressDetail: formData.addressDetail,
    bloodType: formData.bloodType,
    allergies: formData.allergies || "Ninguna",
    weight: formData.weight,
    height: formData.height,
    shirtSize: formData.shirtSize,
    shoeSize: formData.shoeSize,
    pantSize: formData.pantSize,
    medicalCondition: formData.medicalCondition || "Ninguna",
    repdni: repDni,
    repName: formData.repName,
    repLastName: formData.repLastName,
    repEmail: formData.repEmail,
    repPhone: formData.repPhone,
    relationship,
    legalRepresentativeDni: repDni,
    legalRepresentativeName: formData.repName,
    legalRepresentativeLastName: formData.repLastName,
    legalRepresentativePhone: formData.repPhone,
    legalRepresentativeEmail: formData.repEmail,
    legalRepresentativeRelationship: relationship,
    condition: formData.isNewEntry ? "nuevo_ingreso" : "regular",
    conditionDescription: buildConditionDescription(formData),
    codeCertificate: `C${String(formData.document).padStart(9, "0")}`,
  };
}

export default function FormInscrip() {
  const [passed, setPassed] = useState(1);
  const [confirmPass, setConfirmPass] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [resulData, setResulData] = useState(null);

  /**
   * Objeto data de estudiantes para la inscripcion de estudiantes.
   * @typedef {Object} dataEnrolelment - Objeto de datos para la inscripcion de estudiante.
   * @property {string} dniType - Tipo de documento de identidad del estudiante.
   * @property {string} dni - Numero de documento de identidad del estudiante.
   * @property {string} name - Nombre del estudiante.
   * @property {string} lastName - Apellido del estudiante.
   * @property {string} email - Correo electronico del estudiante.
   * @property {string} phone - Numero de telefono del estudiante.
   * @property {string} gender - Genero del estudiante.
   * @property {string} birthDate - Fecha de nacimiento del estudiante.
   * @property {string} pass - Contraseña del estudiante.
   * @property {boolean} isNewEntry - Indica si el estudiante viene de otra institucion academica.
   * @property {string} previousSchool - Nombre de la institucion academica anterior del estudiante.
   * @property {string} previousSchoolCode - Codigo de la institucion academica anterior del estudiante.
   * @property {string} previousYear - Ano de la institucion academica anterior del estudiante.
   * @property {string} previousSection - Seccion de la institucion academica anterior del estudiante.
   * @property {string} canaimaSerial - Serial de la canaima del estudiante.
   * @property {string} year - Ano de la canaima del estudiante.
   * @property {string} section - Seccion de la canaima del estudiante.
   * @property {string} state - Estado de la canaima del estudiante.
   * @property {string} municipality - Municipio de la canaima del estudiante.
   * @property {string} parish - Parroquia de la canaima del estudiante.
   * @property {string} addressDetail - Detalle de la direccion del estudiante.
   * @property {string} housingCondition - Condicion de vivienda del estudiante.
   * @property {string} bloodType - Tipo de sangre del estudiante.
   * @property {string} allergies - Alergias del estudiante.
   * @property {string} shirtSize - Talla de camisa del estudiante.
   * @property {string} pantSize - Talla de pantalon del estudiante.
   * @property {string} shoeSize - Talla de zapato del estudiante.
   * @property {string} weight - Peso del estudiante.
   * @property {string} medicalCondition - Condicion medica del estudiante.
   * @property {string} height - Altura del estudiante.
   * @property {string} motherName - Nombre de la madre del estudiante.
   * @property {string} motherDni - Numero de documento de identidad de la madre del estudiante.
   * @property {string} motherEmail - Correo electronico de la madre del estudiante.
   * @property {string} motherPhone - Numero de telefono de la madre del estudiante.
   * @property {string} fatherName - Nombre del padre del estudiante.
   * @property {string} fatherDni - Numero de documento de identidad del padre del estudiante.
   * @property {string} fatherEmail - Correo electronico del padre del estudiante.
   * @property {string} fatherPhone - Numero de telefono del padre del estudiante.
   * @property {string} repDni - Numero de documento de identidad del representante legal del estudiante.
   * @property {string} repName - Nombre del representante legal del estudiante.
   * @property {string} repLastName - Apellido del representante legal del estudiante.
   * @property {string} repPhone - Numero de telefono del representante legal del estudiante.
   * @property {string} relationship - Parentesco del representante legal del estudiante.
   * @property {string} repEmail - Correo electronico del representante legal del estudiante.
   * @property {string} sig - Codigo unico dado por el sistema que identifica a la institucion.
   * @property {boolean} accepted - Indica si el estudiante acepta los términos y condiciones de uso del sistema.
   * @property {string} role - role del usuario (teacher, student, administrator). por defecto es teacher. En este registro solo se puede registrar un usuario de tipo teacher.
   * @property {string} birthdate - Fecha de nacimiento del estudiante.
   * @property {string} section - Seccion del estudiante.
   * @property {string} state - Estado del estudiante.
   * @property {string} municipality - Municipio del estudiante.
   * @property {string} parish - Parroquia del estudiante.
   * @property {string} addressDetail - Detalle de la direccion del estudiante.
   * @property {string} housingCondition - Condicion de vivienda del estudiante.
   * @property {string} bloodType - Tipo de sangre del estudiante.
   * @property {string} allergies - Alergias del estudiante.
   * @property {string} shirtSize - Talla de camisa del estudiante.
   * @property {string} pantSize - Talla de pantalon del estudiante.
   * @property {string} shoeSize - Talla de zapato del estudiante.
   * @property {string} weight - Peso del estudiante.
   * @property {string} medicalCondition - Condicion medica del estudiante.
   * @property {string} height - Altura del estudiante.
   * @property {string} motherName - Nombre de la madre del estudiante.
   * @property {string} motherDni - Numero de documento de identidad de la madre del estudiante.
   * @property {string} motherEmail - Correo electronico de la madre del estudiante.
   * @property {string} motherPhone - Numero de telefono de la madre del estudiante.
   * @property {string} fatherName - Nombre del padre del estudiante.
   * @property {string} fatherDni - Numero de documento de identidad del padre del estudiante.
   * @property {string} fatherEmail - Correo electronico del padre del estudiante.
   * @property {string} fatherPhone - Numero de telefono del padre del estudiante.
   * @property {string} repDni - Numero de documento de identidad del representante legal del estudiante.
   * @property {string} repName - Nombre del representante legal del estudiante.
   * @property {string} repLastName - Apellido del representante legal del estudiante.
   * @property {string} repPhone - Numero de telefono del representante legal del estudiante.
   * @property {string} relationship - Parentesco del representante legal del estudiante.
   * @property {string} repEmail - Correo electronico del representante legal del estudiante.
   * @property {string} sig - Codigo unico dado por el sistema que identifica a la institucion.
   * @property {boolean} accepted - Indica si el estudiante acepta los términos y condiciones de uso del sistema.
   * @property {string} role - role del usuario (teacher, student, administrator). por defecto es teacher. En este registro solo se puede registrar un usuario de tipo teacher.
   * @property {string} birthdate - Fecha de nacimiento del estudiante.
   * @property {string} section - Seccion del estudiante.
   * @property {string} state - Estado del estudiante.
   * @property {string} municipality - Municipio del estudiante.
   * @property {string} parish - Parroquia del estudiante.
   * @property {string} addressDetail - Detalle de la direccion del estudiante.
   * @property {string} housingCondition - Condicion de vivienda del estudiante.
   * @property {string} bloodType - Tipo de sangre del estudiante.
   * @property {string} allergies - Alergias del estudiante.
   * @property {string} shirtSize - Talla de camisa del estudiante.
   * @property {string} pantSize - Talla de pantalon del estudiante.
   * @property {string} shoeSize - Talla de zapato del estudiante.
   * @property {string} weight - Peso del estudiante.
   * @property {string} medicalCondition - Condicion medica del estudiante.
   * @property {string} height - Altura del estudiante.
   * @property {string} motherName - Nombre de la madre del estudiante.
   * @property {string} motherDni - Numero de documento de identidad de la madre del estudiante.
   * @property {string} motherEmail - Correo electronico de la madre del estudiante.
   * @property {string} motherPhone - Numero de telefono de la madre del estudiante.
   * @property {string} fatherName - Nombre del padre del estudiante.
   * @property {string} fatherDni - Numero de documento de identidad del padre del estudiante.
   * @property {string} fatherEmail - Correo electronico del padre del estudiante.
   * @property {string} fatherPhone - Numero de telefono del padre del estudiante.
   * @property {string} repDni - Numero de documento de identidad del representante legal del estudiante.
   * @property {string} repName - Nombre del representante legal del estudiante.
   * @property {string} repLastName - Apellido del representante legal del estudiante.
   * @property {string} repPhone - Numero de telefono del representante legal del estudiante.
   * @property {string} relationship - Parentesco del representante legal del estudiante.
   * @property {string} repEmail - Correo electronico del representante legal del estudiante.
   * @property {string} sig - Codigo unico dado por el sistema que identifica a la institucion.
   * @property {boolean} accepted - Indica si el estudiante acepta los términos y condiciones de uso del sistema.
   * @property {string} username - Usuario para ingresar al sistema.
   */
  const [data, setData] = useState({
    // Paso 1: Personales + Academicos
    user_id: "",
    documentType: "V-",
    document: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    birthCountry: "Venezuela",
    pass: "",
    isNewEntry: false,
    previousSchool: "",
    previousSchoolCode: "",
    previousYear: "",
    previousSection: "",
    canaimaSerial: "",

    year: "",
    section: "",

    // Paso 2: Location
    state: "",
    municipality: "",
    parish: "",
    addressDetail: "",
    housingCondition: "",

    // Paso 3: Health
    bloodType: "",
    allergies: "",
    shirtSize: "",
    pantSize: "",

    shoeSize: "",
    weight: "",
    medicalCondition: "",
    height: "",

    // Paso 4: Parents
    motherName: "" || "ausente",
    motherDni: "" || "ausente",
    motherEmail: "" || "ausente",
    motherPhone: "" || "ausente",
    lateralidad: "",
    fatherName: "" || "ausente",
    fatherDni: "" || "ausente",
    fatherEmail: "" || "ausente",
    fatherPhone: "" || "ausente",

    // Paso 5: Representante legal (legal_representatives + rep_* en students)
    repdniType: "V-",
    repdni: "",
    repName: "",
    repLastName: "",
    repPhone: "",
    relationship: "",
    repEmail: "",
    birthCertificate: "",
    sig: "",
    nameInstitution: "" || "Liceo seleccionado",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!data.document || !data.name || !data.lastName) {
      return toast.error(
        "Por favor, rellena los campos obligatorios del estudiante.",
      );
    }

    if (!data.repdni || !data.repName || !data.repLastName) {
      return toast.error(
        "Por favor, completa los datos del representante legal.",
      );
    }

    if (!data.sig || !data.section || !data.year) {
      return toast.error(
        "Selecciona la institución, el año y la sección a inscribir.",
      );
    }

    if (data.pass !== confirmPass) {
      return toast.error("Las contraseñas no coinciden.");
    }

    setLoading(true);

    const payload = buildEnrolelmentPayload(data);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_enrolelment/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

      const responseData = await result.json().catch(() => ({}));

      if (result.ok) {
        const ids = pickEnrolelmentIds(responseData);
        if (!ids.user_id) {
          console.warn(
            "create_enrolelment sin user_id/student_id:",
            responseData,
          );
        }
        toast.success("¡Inscripción procesada con éxito!");
        setResulData({ ...data, ...ids });
        setSuccess(true);
      } else {
        toast.error(responseData.error || "Hubo un error al registrar.");
      }
    } catch {
      toast.error("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (success && resulData) return <EnrollmentSuccessPage data={resulData} />;

  return (
    <div className="w-full max-w-2xl p-3 md:p-0">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg"
      >
        <StepIndicator currentStep={passed} totalSteps={7} />

        <div className="mt-6 min-h-[400px]">
          {passed === 1 && (
            <div className="animate-in fade-in space-y-8 duration-500">
              <PersonalDataFields datos={data} manejarCambio={handleChange} />
              <AcademicFields datos={data} manejarCambio={handleChange} />
            </div>
          )}

          {passed === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <LocationFields datos={data} manejarCambio={handleChange} />
            </div>
          )}

          {passed === 3 && (
            <HealthPhysicalFields datos={data} manejarCambio={handleChange} />
          )}
          {passed === 4 && (
            <ParentsFields datos={data} manejarCambio={handleChange} />
          )}
          {passed === 5 && (
            <LegalRepresentativeFields
              datos={data}
              manejarCambio={handleChange}
            />
          )}
          {passed === 6 && (
            <EnrollmentSchool data={data} manejarCambio={handleChange} />
          )}
          {passed === 7 && (
            <>
              <Input
                label="Tu usuario para ingresar al sistema"
                placeholder="Ej: juan.fernandez"
                name="username"
                onChange={handleChange}
                value={data.email}
                readOnly={true}
              />

              <div className="mt-7 grid md:grid-cols-2 grid-cols-1 gap-3">
                <InputPass
                  label={"Ingresa tu contraseña para ingresar al sistema"}
                  placeholder={"*********"}
                  value={data.pass}
                  name={"pass"}
                  onChange={handleChange}
                />
                <InputPass
                  label={"Confirma tu contraseña"}
                  placeholder={"*********"}
                  value={confirmPass}
                  name={"confirmPass"}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>

              {data.pass && confirmPass && data.pass !== confirmPass && (
                <p className="mt-3 animate-pulse text-xs font-medium text-red-500">
                  ⚠️ Las contraseñas no coinciden.
                </p>
              )}
              <Terms
                onChange={(e) => setAccepted(e.target.checked)}
                accepted={accepted}
              />
            </>
          )}
        </div>

        <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
          <Button
            icon={faLeftLong}
            onClick={() => setPassed((p) => Math.max(1, p - 1))}
            classNameBtn={`text-slate-400 hover:text-slate-600 font-medium ${passed === 1 ? "invisible" : ""}`}
          >
            Anterior
          </Button>

          {passed < 7 ? (
            <Button
              icon={faRightLong}
              onClick={() => setPassed((p) => Math.min(7, p + 1))}
              classNameBtn="rounded-lg bg-indigo-600 px-8 py-2 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 group flex items-center gap-5"
              classNameIcon="group-hover:translate-x-1 transition-transform duration-300"
            >
              Siguiente
            </Button>
          ) : (
            <>
              <Button
                icon={faUserPlus}
                type="submit"
                disabled={loading || !accepted}
                classNameBtn="rounded-lg bg-green-600 px-8 py-2 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 shadow-lg shadow-green-100"
              >
                {loading ? "Procesando..." : "Inscribir"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
