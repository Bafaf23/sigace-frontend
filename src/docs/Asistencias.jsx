import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";

/**
 * Formatea un valor para mitigar nulos
 * @param {string} value
 * @param {function} transform
 * @returns {string}
 */
function fmt(value, transform = (s) => s) {
  if (value == null || value === "") return "N/A";
  try {
    return transform(String(value));
  } catch {
    return "N/A";
  }
}

/**
 * Formatea un valor a mayúsculas
 * @param {string} value
 * @returns {string}
 */
function fmtUpper(value) {
  return fmt(value, (s) => s.toUpperCase());
}

// Estilos calcados de tu Planilla de Inscripción (Mismos colores, paddings y grosores)
const styles = StyleSheet.create({
  page: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 15,
    paddingBottom: 2,
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
    width: 320,
    opacity: 0.05,
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#04C4D9", // Tu cyan característico de SIGACE
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  institutionInfo: {
    flexDirection: "column",
    width: "70%",
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 1,
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 8,
    color: "#64748B",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  headerDocType: {
    width: "30%",
    textAlign: "right",
  },
  // Contenedor General de la Sección de Datos de Control
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 5,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionNumber: {
    backgroundColor: "#1E293B",
    color: "#FFF",
    width: 18,
    height: 18,
    borderRadius: 9,
    fontSize: 9,
    textAlign: "center",
    marginRight: 8,
    paddingTop: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1E293B",
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: "column",
    marginBottom: 5,
    paddingRight: 6,
  },
  label: {
    fontSize: 8,
    color: "#94A3B8",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  valueBox: {
    fontSize: 10,
    color: "#1E293B",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    minHeight: 20,
  },
  // 📊 DISEÑO DE CUADRÍCULA DE CONTROL (ASISTENCIA)
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 22,
    alignItems: "center",
  },
  tableHeaderRow: {
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
  },
  // Columnas asimétricas para encajar los 20 días hábiles de forma milimétrica
  colNum: {
    width: "4%",
    textAlign: "center",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    padding: 2,
    fontWeight: "bold",
  },
  colCedula: {
    width: "12%",
    textAlign: "center",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    padding: 2,
  },
  colAlumnos: {
    width: "30%",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    paddingLeft: 6,
  },
  colDay: {
    width: "2.2%",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    height: "100%",
  },
  colObs: { width: "10%", fontSize: 8, paddingLeft: 4 },

  headerText: {
    fontWeight: "bold",
    color: "#1E293B",
    textTransform: "uppercase",
  },
  // 🏛️ FIRMAS TRIPLE SIMÉTRICAS (30% c/u)
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  signatureLine: {
    width: "30%",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    textAlign: "center",
    paddingTop: 6,
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15, // Espacio óptimo para firmar a bolígrafo
    textTransform: "uppercase",
  },
  signatureText: {
    fontSize: 8,
    color: "#64748B",
    lineHeight: 1.2,
  },
});

// Generamos el array estático de los 20 días laborables para las casillas en blanco
const diasDelMes = Array.from({ length: 20 }, (_, i) => i + 1);

const Asistencias = ({ students = [], institution, sectionData }) => {
  const institutionName =
    typeof institution === "object" ? institution?.name : institution;

  return (
    <Document>
      {/* Orientación horizontal para albergar la cuadrícula de asistencia limpiamente */}
      <Page size="LETTER" orientation="landscape" style={styles.page} wrap>
        {/* FONDO DE AGUA Y ACCENT BAR COMPARTIDO */}
        <View style={styles.watermarkContainer} fixed>
          <Image src="/logoSigace.png" style={styles.watermarkImage} />
        </View>
        <View style={styles.accentBar} />

        {/* ENCABEZADO INSTITUCIONAL */}
        <View style={styles.header}>
          <View style={styles.institutionInfo}>
            <Text style={{ fontSize: 9, color: "#64748B" }}>
              República Bolivariana de Venezuela
            </Text>
            <Text style={{ fontSize: 9, color: "#64748B" }}>
              Ministerio del Poder Popular para la Educación
            </Text>
            <Text style={styles.mainTitle}>{fmtUpper(institutionName)}</Text>
            <View style={styles.badge}>
              <Text>SIGACE • Control Mensual de Campo</Text>
            </View>
          </View>

          <View style={styles.headerDocType}>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#1E293B" }}
            >
              CONTROL DE
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#04C4D9" }}
            >
              ASISTENCIA
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#1E293B",
                marginTop: 2,
              }}
            >
              {sectionData?.year_name || "N/A"} - "{sectionData?.name || "N/A"}"
            </Text>
          </View>
        </View>

        {/* METADATOS DE LA SECCIÓN (Estilo inputs de tu planilla) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <div style={styles.sectionHeaderLeft}>
              <View style={styles.sectionNumber}>
                <Text>1</Text>
              </View>
              <Text style={styles.sectionTitle}>
                Variables de Control del Aula
              </Text>
            </div>
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Docente Guía / Profesor</Text>
              <Text style={styles.valueBox}>
                {sectionData?.teacher_name
                  ? fmtUpper(
                      `${sectionData.teacher_last_name}, ${sectionData.teacher_name}`,
                    )
                  : "POR ASIGNAR"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Año Escolar / Período</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(sectionData?.period_name || "ACTIVO")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Mes de Evaluación</Text>
              <Text style={styles.valueBox}>___________________________</Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Total Alumnos</Text>
              <Text style={styles.valueBox}>
                {students?.length || "0"} Estudiantes
              </Text>
            </View>
          </View>
        </View>

        {/* 📊 CUADRÍCULA DE CONTROL DIARIO PARA LLENAR A MANO */}
        <View style={styles.table}>
          {/* Fila de Encabezados de la Tabla */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.colNum, styles.headerText]}>N°</Text>
            <Text style={[styles.colCedula, styles.headerText]}>Cédula</Text>
            <Text style={[styles.colAlumnos, styles.headerText]}>
              Apellidos y Nombres
            </Text>
            {diasDelMes.map((dia) => (
              <Text
                key={dia}
                style={[
                  styles.colDay,
                  styles.headerText,
                  { textAlign: "center", fontSize: 7, paddingTop: 5 },
                ]}
              >
                {dia}
              </Text>
            ))}
            <Text style={[styles.colObs, styles.headerText, { paddingTop: 5 }]}>
              Observación
            </Text>
          </View>

          {/* Mapeo Dinámico de los Alumnos de la Sección */}
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <View
                key={student.id || index}
                style={[
                  styles.tableRow,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#E2E8F0",
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC", // Intercalado sutil
                  },
                ]}
              >
                <Text style={styles.colNum}>{index + 1}</Text>
                <Text style={styles.colCedula}>
                  {student.document || "V-XXXXXXXX"}
                </Text>
                <Text style={styles.colAlumnos}>
                  {fmtUpper(
                    [student.last_name, student.name]
                      .filter(Boolean)
                      .join(", "),
                  )}
                </Text>

                {/* 20 Bloques estructurales vacíos idóneos para trazos con bolígrafo */}
                {diasDelMes.map((dia) => (
                  <View key={dia} style={styles.colDay} />
                ))}

                <Text style={styles.colObs}></Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 9,
                  color: "#64748B",
                  padding: 15,
                }}
              >
                No existen alumnos activos asociados a esta sección actualmente.
              </Text>
            </View>
          )}
        </View>

        {/* 🏛️ PIE DE PÁGINA / REGISTRO TRIPLE DE FIRMAS SIMÉTRICAS */}
        <View style={styles.footer} fixed>
          {/* Columna 1: Docente de Aula */}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Docente de Aula</Text>
            <Text style={styles.signatureText}>
              {sectionData?.teacher_name
                ? fmtUpper(
                    `${sectionData.teacher_name} ${sectionData.teacher_last_name}`,
                  )
                : "FIRMA AUTORIZADA"}
            </Text>
            <Text style={styles.signatureText}>C.I. DOCENTE</Text>
          </View>

          {/* Columna 2: Delegado / Vocero (Opcional o Coordinación) */}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Delegación de Grado</Text>
            <Text style={styles.signatureText}>REVISADO POR</Text>
            <Text style={styles.signatureText}>VOCERÍA / EVALUACIÓN</Text>
          </View>

          {/* Columna 3: Control de Estudios (Identidad Corporativa SIGACE) */}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Control de Estudios</Text>
            <Text style={styles.signatureText}>
              {institution?.coordinator_name
                ? fmtUpper(institution.coordinator_name)
                : "FIRMA Y SELLO"}
            </Text>
            <Text style={styles.signatureText}>
              {institution?.coordinator_document
                ? `C.I. ${fmtUpper(institution.coordinator_document)}`
                : "RECEPTOR REGISTRO"}
            </Text>
          </View>
        </View>

        {/* PIE DE PÁGINA SISTÉMICO CONSTANTE */}
        <Text
          style={{
            fontSize: 7,
            color: "#94A3B8",
            textAlign: "center",
            marginTop: 12,
            paddingBottom: 5,
          }}
          fixed
        >
          Documento impreso desde el Sistema de Gestión Académica e Inteligente
          SIGACE. Nomenclatura manual obligatoria: [P] Presente | [A] Ausente |
          [J] Justificado | [R] Retraso.
        </Text>
      </Page>
    </Document>
  );
};

export default Asistencias;
