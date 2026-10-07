import FormInscrip from "@/components/organism/FromInscrip";
import { headers } from "next/headers";

export const metadata = {
  titel: "ScholPack - pre-inscripción",
  description:
    "Relaizá tu pre-inscripción en ScholPack y asegura tu lugar en nuestra institución educativa. Completa el formulario de inscripción y da el primer paso hacia un futuro académico exitoso.",
};

async function enrollmentOpen(subdomain) {
  if (!subdomain) return null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/check/${subdomain}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "Error al verificar la disponibilidad de inscripción:",
      error,
    );
  }
}

export default async function EnrolelmentPage() {
  const headerList = await headers();
  const subdomain = headerList.get("x-school-subdomain");
  const enrollmentStatus = await enrollmentOpen(subdomain);

  if (!enrollmentStatus?.is_enrollment_open) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-zinc-200 uppercase">
          Inscripción cerrada
        </h1>

        <p className="p-4 text-center rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/50 max-w-lg">
          No te preocupes,{" "}
          <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase">
            {enrollmentStatus?.school_name?.slice(5) || "la institución"}
          </span>{" "}
          aún no ha iniciado el proceso de inscripción. Te invitamos a estar
          atento a sus redes sociales y sitio web para conocer las fechas de
          apertura y los requisitos necesarios para inscribirte.
        </p>
      </div>
    );
  }
  return (
    <FormInscrip
      nameSchool={enrollmentStatus?.school_name.slice(5)}
      SIG={enrollmentStatus?.SIG}
    />
  );
}
