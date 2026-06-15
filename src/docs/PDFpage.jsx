"use client";
import Asistencias from "@/docs/Asistencias";
import ListaEstudiantesDoc from "@/docs/ReporteImprimiblePorSeccion";
import PlanillaInscripsion from "@/docs/PlanillaInscripsion";
import PlanillaReguistroCalificaciones from "@/docs/PlanillaReguistroCalificaciones";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);
const datosDePrueba = {
  // Datos de la institución (puede ser un objeto con name o un string directo)
  institution: {
    name: "Unidad Educativa Nacional Juana de Escalona",
  },

  // Arreglo de estudiantes distribuidos en diferentes años y secciones
  students: [
    // --- 1° AÑO - SECCIÓN "A" ---
    {
      id: "st-001",
      name: "Bryant Alexandre",
      last_name: "Facenda Flores",
      tuition_number: "MAT-2026-001",
      cedula: "V-31.023.456",
    },
    {
      id: "st-002",
      name: "Yara Valentina",
      last_name: "Facenda Flores",
      tuition_number: "MAT-2026-002",
      cedula: "V-32.145.678",
    },
    {
      id: "st-003",
      name: "Carlos Eduardo",
      last_name: "Mendoza Silva",
      tuition_number: "MAT-2026-003",
      cedula: "V-31.987.654",
    },

    // --- 1° AÑO - SECCIÓN "B" ---
    {
      id: "st-004",
      name: "Lilly Amanda",
      last_name: "Gómez Pérez",
      tuition_number: "MAT-2026-004",
      cedula: "V-33.456.123",
    },
    {
      id: "st-005",
      name: "Luis Manuel",
      last_name: "Rodríguez Aponte",
      tuition_number: "MAT-2026-005",
      cedula: "V-31.111.222",
    },

    // --- 2° AÑO - SECCIÓN "A" ---
    {
      id: "st-006",
      name: "Nayareth Sofía",
      last_name: "Castillo Rondón",
      tuition_number: "MAT-2026-006",
      cedula: "V-30.876.543",
    },
    {
      id: "st-007",
      name: "Keili Daniela",
      last_name: "Lovera Delgado",
      tuition_number: "MAT-2026-007",
      cedula: "V-31.555.444",
    },
  ],
};
export default function PDFpage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Esto se renderiza como HTML normal en la web */}
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <p>Vista previa del Reporte Escolar</p>
      </div>

      {/* El visor del PDF con el documento adentro */}
      <PDFViewer style={{ flex: 1, border: "none" }}>
        {/*  <PlanillaReguistroCalificaciones /> */}
        {/*     <PlanillaInscripsion /> */}
        {/*  <Asistencias /> */}
        <ListaEstudiantesDoc
          students={datosDePrueba.students}
          institution={datosDePrueba.institution}
          techaer={{
            name: "Bryant",
            last_name: "Facenda",
            document: "V-30021867",
          }}
        />
      </PDFViewer>
    </div>
  );
}
