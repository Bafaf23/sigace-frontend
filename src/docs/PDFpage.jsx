"use client";
import Asistencias from "@/docs/Asistencias";
import PlanillaInscripsion from "@/docs/PlanillaInscripsion";
import PlanillaReguistroCalificaciones from "@/docs/PlanillaReguistroCalificaciones";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

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
        <PlanillaReguistroCalificaciones />
        {/*     <PlanillaInscripsion /> */}
        {/*  <Asistencias /> */}
      </PDFViewer>
    </div>
  );
}
