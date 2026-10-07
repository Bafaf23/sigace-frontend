"use client";
import Banner from "@/components/atom/Banner";
import Icon from "@/components/atom/Icon";
import RecordAcademico from "@/components/organism/AcademicRecord";
import FromConsult from "@/components/organism/FormCunsult";
import FormVerify from "@/components/organism/FormVerify";
import { getPeriodStudent } from "@/services/enrollment/getPeriodStudent";
import { consult } from "@/services/student/consult";
import { getTuitionNumber } from "@/services/student/getTuitionNumber";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ConsultPage() {
  const [page, setPage] = useState("tuitionNumber");
  const [loanding, setLoanding] = useState(false);
  const [tuitionNumber, setTuitionNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [period, setPeriod] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tuitionNumber) {
      toast.error("Por favor, ingresa tu número de matrícula.");
      return;
    }

    setLoanding(true);

    try {
      const res = await consult({ tuitionNumber });
      if (!res || res.success === false) {
        toast.error(res?.message || "No se pudo procesar la consulta.");
        return;
      }

      toast.success(res.message || "Consulta realizada correctamente.");
      setPage("otp");
    } catch (error) {
      console.error("Error al realizar la consulta:", error);
      toast.error("Ocurrió un error al realizar la consulta.");
    } finally {
      setLoanding(false);
    }
  };

  const handleSubmitVerify = async (codigoOtpCompleto) => {
    if (codigoOtpCompleto.length < 6) {
      return toast.error("El código debe ser de 6 dígitos.");
    }

    setLoanding(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`,
        { tuitionNumber, OTP: codigoOtpCompleto },
        { withCredentials: true },
      );

      if (res.data?.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data?.message);
      const dataLoaded = await handleDataPage(tuitionNumber);
      if (!dataLoaded) return;
      setPage("page");
    } catch (error) {
      const mensajeDelServidor = error.response?.data?.message;
      console.error(error);
      toast.error(
        mensajeDelServidor || "Código inválido o error en el servidor.",
      );
    } finally {
      setLoanding(false);
    }
  };

  const handleDataPage = async (tuitionNumber) => {
    if (!tuitionNumber) return false;
    try {
      const studentRes = await getTuitionNumber(tuitionNumber);
      const periodRes = await getPeriodStudent(studentRes?.student?.id);
      if (!studentRes?.student) {
        throw new Error("La respuesta no contiene los datos del estudiante.");
      }

      setStudentData(studentRes.student);
      setPeriod(periodRes);
      return true;
    } catch (error) {
      console.error("Error al cargar los datos del estudiante:", error);
      toast.error("No se pudieron cargar los datos del estudiante.");
      return false;
    }
  };

  const section = studentData?.enrollments?.[0]?.section;
  const year = studentData?.enrollments?.[0]?.year;
  const sectionName = typeof section === "string" ? section : section?.name;
  const yeraName = typeof year === "string" ? section : year?.name;

  return (
    <div className="flex flex-col flex-1 justify-center p-4 gap-2 space-y-6 max-w-xl mx-auto">
      <div className="flex justify-start gap-2 w-full">
        <Link
          href="/"
          className="dark:text-zinc-300 text-zinc-500 flex gap-2 items-center"
        >
          <Icon icon={faArrowLeft} />
          Volver
        </Link>
      </div>

      {page === "tuitionNumber" && (
        <>
          <Banner
            icon={faInfo}
            title="Consulta de Calificaciones"
            message="Las calificaciones se mostraran en tiempo real, para consultar tus calificaciones de años anteriores diriugete a la institución educativa correspondiente."
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-orange-600 dark:text-orange-400">
              Consulta de Calificaciones
            </h1>
            <p className="text-sm md:text-md text-slate-700 dark:text-zinc-300 font-medium">
              Consulta tus calificaciones facilmente y de manera rápida.
            </p>
          </div>

          <FromConsult
            onSubmit={handleSubmit}
            setTuitionNumber={setTuitionNumber}
            tuitionNumber={tuitionNumber}
          />
        </>
      )}

      {page === "otp" && (
        <>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-orange-600 dark:text-orange-400">
              Introduce el Codigo enviado
            </h1>
            <p className="text-sm md:text-md text-slate-700 dark:text-zinc-300 font-medium">
              Enviamos un codigo para verificar tu identidad.
            </p>
          </div>
          <FormVerify
            onVerify={handleSubmitVerify}
            loanding={loanding}
            otp={otp}
            setOtp={setOtp}
          />
        </>
      )}
      {page === "page" && (
        <section className="w-full animate-fade-in">
          <div className="flex flex-col items-center gap-5">
            <div className="w-full bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xs">
              <div className="flex flex-col gap-1">
                <span className="text-md font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
                  Estudiante
                </span>
                {/* Aquí pintas el nombre real que vino del backend */}
                <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 uppercase">
                  {studentData?.user?.name || "S/N"}{" "}
                  {studentData?.user?.last_name || "S/N"}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 border-t border-zinc-300 dark:border-zinc-700 pt-4 text-sm font-medium text-slate-600 dark:text-zinc-400">
                <div>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase">
                    Matrícula
                  </p>
                  <p className="text-slate-800 dark:text-zinc-200">
                    {tuitionNumber || "S/M"}
                  </p>
                  <p className="text-slate-800 dark:text-zinc-200">
                    {studentData?.school?.school_name || "S/M"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase dark:text-zinc-500">
                    Sección / Año
                  </p>
                  <p className="text-slate-800 dark:text-zinc-200 ">
                    {sectionName || "Año no asignado"} /{" "}
                    {yeraName || "Año no asignado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Encabezado de la Tabla */}
            <div className="w-full text-left mt-2 flex flex-col gap-3 justify-between">
              <div>
                <h3 className="text-2xl font-extrabold uppercase text-slate-800 dark:text-orange-500">
                  Calificaciones
                </h3>
                <p className=" text-slate-500 dark:text-zinc-400 font-medium">
                  Resumen de notas por momentos académicos.
                </p>
              </div>
              <RecordAcademico
                periodStudent={period?.data}
                idStudent={studentData?.id}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setOtp(new Array(6).fill(""));
              setTuitionNumber("");
              setStudentData(null);
              setPage("tuitionNumber");
            }}
            className="w-full mt-4 p-3 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold rounded-xl transition-all hover:bg-zinc-800 active:scale-95 text-sm"
          >
            Volver
          </button>
        </section>
      )}
    </div>
  );
}
