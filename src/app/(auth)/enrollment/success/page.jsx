"use client";

import Success from "@/components/organism/Success";
import Loading from "./loading";

function buildDni(type, number) {
  if (!number) return "";
  return `${type || ""}${number}`.trim();
}

function parseSigCode(sig) {
  if (!sig) return "";
  return String(sig).split(" - ")[0]?.trim() || String(sig);
}

function parseInstitutionName(data) {
  if (data.nameInstitution) return data.nameInstitution;
  if (data.institutionName) return data.institutionName;
  const sig = data.sig;
  if (!sig) return "";
  const parts = String(sig).split(" - ");
  return parts.length > 1 ? parts.slice(1).join(" - ").trim() : "";
}

export default function EnrollmentSuccessPage({ data }) {
  if (!data) return <Loading />;

  const dataSuccess = {
    id: data.user_id || data.document,
    sig: parseSigCode(data.sig),
    user: {
      id: data.user_id || "N/A",
      dni: buildDni(data.documentType, data.document),
      documentType: data.documentType,
      document: data.document,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      birthDate: data.birthDate,
      nationality: data.birthCountry,
      address: data.addressDetail,
      state: data.state,
      municipality: data.municipality,
      parish: data.parish,
      lateralidad: data.lateralidad,
      condition: data.isNewEntry ? "regular" : "nuevo ingreso",
      bloodType: data.bloodType,
      allergies: data.allergies,
      shirtSize: data.shirtSize,
      pantSize: data.pantSize,
      shoeSize: data.shoeSize,
      weight: data.weight,
      height: data.height,
      medicalCondition: data.medicalCondition,
    },
    representative: {
      dni: buildDni(data.repdniType, data.repdni),
      documentType: data.repdniType,
      document: data.repdni,
      name: data.repName,
      lastName: data.repLastName,
      email: data.repEmail,
      phone: data.repPhone,
      relationship: data.relationship,
      birthCertificate: data.birthCertificate,
    },
    institution: {
      name: parseInstitutionName(data) || "Liceo seleccionado",
      sig: parseSigCode(data.sig),
    },
    createdAt: data.createdAt || new Date().toLocaleDateString("es-VE"),
    updatedAt: data.updatedAt,
  };

  return <Success data={dataSuccess} />;
}
