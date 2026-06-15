import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";

function fmt(value, transform = (s) => s) {
  if (value == null || value === "") return "N/A";
  try {
    return transform(String(value));
  } catch {
    return "N/A";
  }
}

function fmtUpper(value) {
  return fmt(value, (s) => s.toUpperCase());
}

const styles = StyleSheet.create({
  page: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 70,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#334155",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  watermarkImage: {
    width: 300,
    opacity: 0.03,
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#04C4D9",
  },
  headerFixedContainer: {
    display: "block",
    width: "100%",
    marginBottom: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 8,
  },
  institutionInfo: {
    flexDirection: "column",
    width: "70%",
  },
  mainTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 9,
    color: "#1D4ED8",
    marginTop: 4,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  headerDocType: {
    width: "30%",
    textAlign: "right",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  tableHeaderCell: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tableCell: {
    fontSize: 9,
    color: "#334155",
  },
  colNum: { width: "8%" },
  colMatricula: { width: "22%" },
  colEstudiante: { width: "45%" },
  colCedula: { width: "25%" },
  footerSignatures: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  signatureLine: {
    width: "40%",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    textAlign: "center",
    paddingTop: 5,
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1E293B",
  },
  pageNumber: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94A3B8",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
  },
});

const ReporteImprimiblePorSeccion = ({
  students = [],
  section,
  year,
  institution,
  teacher, // Corregido de techaer a teacher
}) => {
  const institutionName =
    typeof institution === "object" ? institution?.name : institution;

  // Construimos el nombre del grupo usando directamente los props de la sección,
  // ya que la data no viene dentro de cada objeto estudiante.
  const labelAnio = year ? String(year).toUpperCase() : "AÑO NO ASIGNADO";
  const labelSeccion = section
    ? `SECCIÓN "${String(section).toUpperCase()}"`
    : "SIN SECCIÓN";

  // Si el prop 'year' ya incluye la palabra "Año" (ej: "4to Año"), evitamos duplicarla
  const nombreGrupo = labelAnio.includes("AÑO")
    ? `${labelAnio} - ${labelSeccion}`
    : `${labelAnio}° AÑO - ${labelSeccion}`;

  const alumnosDelGrupo = Array.isArray(students) ? students : [];

  return (
    <Document>
      <Page size="letter" style={styles.page} wrap>
        {/* ELEMENTOS ESTÁTICOS DE FONDO */}
        <View style={styles.watermarkContainer} fixed>
          <Image src="/logoSigace.png" style={styles.watermarkImage} />
        </View>
        <View style={styles.accentBar} fixed />

        {/* ENCABEZADO GENERAL REPETIBLE */}
        <View style={styles.headerFixedContainer} fixed>
          <View style={styles.header}>
            <View style={styles.institutionInfo}>
              <Text style={{ fontSize: 7, color: "#64748B" }}>
                República Bolivariana de Venezuela
              </Text>
              <Text style={{ fontSize: 7, color: "#64748B" }}>
                Ministerio del Poder Popular para la Educación
              </Text>
              <Text style={styles.mainTitle}>
                {fmtUpper(institutionName || "U.E.N Juana de Escalona")}
              </Text>
              <View style={styles.badge}>
                <Text>{nombreGrupo}</Text>
              </View>
            </View>

            <View style={styles.headerDocType}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "#1E293B",
                }}
              >
                LISTA DE
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "#04C4D9",
                }}
              >
                ESTUDIANTES
              </Text>
              <Text style={{ fontSize: 7, color: "#94A3B8", marginTop: 2 }}>
                Total Aula: {alumnosDelGrupo.length} Alumnos
              </Text>
            </View>
          </View>

          {/* Cabecera de la Tabla */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colNum]}>N°</Text>
            <Text style={[styles.tableHeaderCell, styles.colMatricula]}>
              Matrícula
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colEstudiante]}>
              Apellidos y Nombres
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colCedula]}>
              Cédula de Identidad
            </Text>
          </View>
        </View>

        {/* LISTADO DE ESTUDIANTES */}
        <View style={styles.tableContainer}>
          {alumnosDelGrupo.map((student, index) => (
            <View
              key={student?.id || index}
              style={[
                styles.tableRow,
                index % 2 === 1 ? { backgroundColor: "#F8FAFC" } : {},
              ]}
              wrap={false}
            >
              <Text
                style={[styles.tableCell, styles.colNum, { color: "#64748B" }]}
              >
                {index + 1}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colMatricula,
                  { fontWeight: "bold", color: "#1D4ED8" },
                ]}
              >
                {student?.tuition_number || "N/A"}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colEstudiante,
                  { fontWeight: "bold", color: "#0F172A" },
                ]}
              >
                {fmtUpper(
                  `${student?.last_name || ""}, ${student?.name || ""}`,
                )}
              </Text>
              <Text style={[styles.tableCell, styles.colCedula]}>
                {student?.document || student?.cedula || "V-N/A"}
              </Text>
            </View>
          ))}
        </View>

        {/* AREA DE FIRMAS AL FINAL */}
        <View style={styles.footerSignatures} wrap={false}>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Docente / Guía</Text>
            <Text style={styles.signatureTitle}>
              {typeof teacher === "object"
                ? `${teacher?.name || "N/A"} ${teacher?.last_name || ""}`.trim()
                : teacher || "No asignado"}
            </Text>
            {teacher?.document && (
              <Text style={styles.signatureTitle}>{teacher.document}</Text>
            )}
          </View>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Control de Estudios</Text>
          </View>
        </View>

        {/* NÚMERO DE PÁGINA */}
        <Text style={styles.pageNumber} fixed>
          SIGACE • Sistema de Gestión Académica
        </Text>
      </Page>
    </Document>
  );
};

export default ReporteImprimiblePorSeccion;
