import Loading from "@/app/loading";
import Success from "@/components/organism/Success";

export const metadata = {
  titel: "ScholPack - pre-inscripción exitosa",
  description:
    "¡Felicidades! Tu pre-inscripción en ScholPack ha sido exitosa. Revisa los detalles de tu inscripción y sigue los próximos pasos para asegurar tu lugar en nuestra institución educativa.",
};

export default function EnrollmentSuccessPage({ data }) {
  if (!data) return <Loading />;

  const dataSuccess = {
    id: data?.user_id || data?.document || "N/A",
    SIG: data?.SIG || "N/A",
    user: {
      id: data?.user_id || "N/A",
      dni: data?.document || "N/A",
      documentType: data?.documentType,
      document: data?.document,
      name: data?.name || "N/A",
      lastName: data?.lastName || "N/A",
      email: data?.email || "N/A",
      phone: data?.phone || "N/A",
      gender: data?.gender || "N/A",
      birthDate: data?.birthDate || "N/A",
      nationality: data?.birthCountry || "N/A",
      address: data?.addressDetail || "N/A",
      state: data?.state || "N/A",
      municipality: data?.municipality || "N/A",
      parish: data?.parish || "N/A",
      lateralidad: data?.lateralidad || "N/A",
      condition: data?.isNewEntry ? "regular" : "nuevo ingreso",
      bloodType: data?.bloodType || "N/A",
      allergies: data?.allergies || "N/A",
      shirtSize: data?.shirtSize || "N/A",
      pantSize: data?.pantSize || "N/A",
      shoeSize: data?.shoeSize || "N/A",
      weight: data?.weight || "N/A",
      height: data?.height || "N/A",
      medicalCondition: data?.medicalCondition || "N/A",
    },
    representative: {
      dni: data?.repdni || "N/A",
      documentType: data?.repdniType || "N/A",
      document: data?.repdni || "N/A",
      name: data?.repName || "N/A",
      lastName: data?.repLastName || "N/A",
      email: data?.repEmail || "N/A",
      phone: data?.repPhone || "N/A",
      relationship: data?.relationship || "N/A",
      birthCertificate: data?.birthCertificate || "N/A",
    },
    institution: {
      name: data || "Liceo seleccionado",
      SIG: data?.SIG || "N/A",
    },
    createdAt: data?.createdAt || new Date().toISOString().split("T")[0],
    updatedAt: data?.updatedAt || "N/A",
  };

  return <Success data={dataSuccess} />;
}
