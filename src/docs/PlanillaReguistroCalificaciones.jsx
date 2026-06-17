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
 * Formatea un valor para mitigar nulos o notas vacías
 */
function fmt(value, transform = (s) => s) {
  if (value == null || value === "") return "-";
  try {
    return transform(String(value));
  } catch {
    return "-";
  }
}

function fmtUpper(value) {
  return fmt(value, (s) => s.toUpperCase());
}

const styles = StyleSheet.create({
  page: {
    paddingRight: 30,
    paddingLeft: 30,
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
    width: 360,
    opacity: 0.04,
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
    marginBottom: 10,
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
  section: {
    marginBottom: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 4,
  },
  inputGroup: {
    flexDirection: "column",
    marginBottom: 4,
    paddingRight: 6,
  },
  label: {
    fontSize: 8,
    color: "#94A3B8",
    marginBottom: 3,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  valueBox: {
    fontSize: 9,
    color: "#1E293B",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    minHeight: 16,
  },

  // 📊 COMPLEJIDAD DE TABLA: RESUMEN ANUAL MULTI-LAPSO
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
    minHeight: 18,
    alignItems: "center",
  },
  // Anclajes fijos para identificar al Estudiante
  colNum: {
    width: "3%",
    textAlign: "center",
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    fontWeight: "bold",
  },
  colCedula: {
    width: "10%",
    textAlign: "center",
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  colEstudiantes: {
    width: "22%",
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    paddingLeft: 4,
  },

  // Bloques contenedores de Lapsos (Fila Superior del Encabezado)
  lapsoHeaderBlock: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#CBD5E1",
  },
  // Sub-celda de Notas por Materia
  colNoteCell: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  colFinalPromedio: {
    width: "5%",
    textAlign: "center",
    fontSize: 7.5,
    fontWeight: "bold",
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
  },
  headerText: {
    fontWeight: "bold",
    color: "#1E293B",
    textTransform: "uppercase",
    fontSize: 7,
  },

  // PIE DE FIRMAS SIMÉTRICO DE CONTROL
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  signatureLine: {
    width: "30%",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    textAlign: "center",
    paddingTop: 4,
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  signatureText: {
    fontSize: 7,
    color: "#64748B",
    lineHeight: 1.2,
  },
});

export const SabanaAnualPDF = ({
  studentsReport = [],
  subjects = [],
  institution,
  sectionData,
}) => {
  const institutionName =
    typeof institution === "object" ? institution?.name : institution;

  // Lapsos oficiales del año escolar en Venezuela
  const lapsos = ["I Lapso", "II Lapso", "III Lapso"];

  // Distribuimos el espacio disponible para las notas (~60% de la página) de forma milimétrica.
  // El ancho asignado a cada Lapso dependerá de cuántas materias se deban renderizar.
  const totalNotasWidth = 60;
  const totalSubjectsCount = subjects.length * lapsos.length;
  const singleCellWidth = `${totalNotasWidth / totalSubjectsCount}%`;
  const singleLapsoBlockWidth = `${totalNotasWidth / lapsos.length}%`;

  return (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        {/* IDENTIDAD DE MARCA */}
        <View style={styles.watermarkContainer} fixed>
          <Image src="/logoSigace.png" style={styles.watermarkImage} />
        </View>
        <View style={styles.accentBar} />

        {/* ENCABEZADO INSTITUCIONAL */}
        <View style={styles.header}>
          <View style={styles.institutionInfo}>
            <Text style={{ fontSize: 8, color: "#64748B" }}>
              República Bolivariana de Venezuela • Ministerio del Poder Popular
              para la Educación
            </Text>
            <Text style={styles.mainTitle}>{fmtUpper(institutionName)}</Text>
            <View style={styles.badge}>
              <Text>SIGACE • Consolidado Final de Calificaciones Anuales</Text>
            </View>
          </View>

          <View style={styles.headerDocType}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#1E293B" }}
            >
              RESUMEN GENERAL
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#04C4D9" }}
            >
              DE RENDIMIENTO
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
                color: "#1E293B",
                marginTop: 1,
              }}
            >
              AÑO ESCOLAR: {sectionData?.period_name || "N/A"}
            </Text>
          </View>
        </View>

        {/* VARIABLES DE CONTROL DE LA SECCIÓN */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Año Escolar / Curso</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(sectionData?.year_name)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "15%" }]}>
              <Text style={styles.label}>Sección</Text>
              <Text style={styles.valueBox}>
                "{fmtUpper(sectionData?.name)}"
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "40%" }]}>
              <Text style={styles.label}>Docente Profesor Guía</Text>
              <Text style={styles.valueBox}>
                {sectionData?.teacher_name
                  ? fmtUpper(
                      `${sectionData.teacher_last_name}, ${sectionData.teacher_name}`,
                    )
                  : "NO ASIGNADO"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Estado de Cierre</Text>
              <Text style={styles.valueBox}>PRE-CONSOLIDADO ANUAL</Text>
            </View>
          </View>
        </View>

        {/* 📊 TABLA DE CALIFICACIONES CON DOS NIVELES DE ENCABEZADO */}
        <View style={styles.table}>
          {/* PRIMER NIVEL DE ENCABEZADO: LAPSOS */}
          <View
            style={[
              styles.tableRow,
              {
                backgroundColor: "#F1F5F9",
                borderBottomWidth: 1,
                borderBottomColor: "#CBD5E1",
                minHeight: 18,
              },
            ]}
          >
            <Text style={styles.colNum}></Text>
            <Text style={styles.colCedula}></Text>
            <Text
              style={[
                styles.colEstudiantes,
                styles.headerText,
                { color: "#475569" },
              ]}
            >
              Estructura Evaluativa
            </Text>

            {lapsos.map((lapso, i) => (
              <View
                key={i}
                style={[
                  styles.lapsoHeaderBlock,
                  {
                    width: singleLapsoBlockWidth,
                    backgroundColor: i % 2 === 0 ? "#E2E8F0" : "#F1F5F9",
                  },
                ]}
              >
                <Text
                  style={[styles.headerText, { fontSize: 7, color: "#0F172A" }]}
                >
                  {lapso}
                </Text>
              </View>
            ))}
            <Text
              style={[
                styles.colFinalPromedio,
                styles.headerText,
                { backgroundColor: "#DBEAFE" },
              ]}
            >
              DEF
            </Text>
          </View>

          {/* SEGUNDO NIVEL DE ENCABEZADO: MATERIAS POR LAPSO */}
          <View
            style={[
              styles.tableRow,
              {
                backgroundColor: "#F8FAFC",
                borderBottomWidth: 1,
                borderBottomColor: "#94A3B8",
                minHeight: 18,
              },
            ]}
          >
            <Text style={[styles.colNum, styles.headerText]}>N°</Text>
            <Text style={[styles.colCedula, styles.headerText]}>Cédula</Text>
            <Text style={[styles.colEstudiantes, styles.headerText]}>
              Apellidos y Nombres
            </Text>

            {/* Repetimos la tira de materias bajo cada bloque de lapso */}
            {lapsos.map((_, lapsoIndex) =>
              React.Children.toArray(
                subjects.map((sub) => (
                  <View
                    key={`${lapsoIndex}-${sub.id}`}
                    style={[styles.colNoteCell, { width: singleCellWidth }]}
                  >
                    <Text style={[styles.headerText, { fontSize: 6 }]}>
                      {fmtUpper(sub.short_name || sub.name?.substring(0, 3))}
                    </Text>
                  </View>
                )),
              ),
            )}
            <Text
              style={[
                styles.colFinalPromedio,
                styles.headerText,
                { fontSize: 6.5 },
              ]}
            >
              ANUAL
            </Text>
          </View>

          {/* CUERPO MATRICIAL: EstudianteS Y NOTAS */}
          {studentsReport.length > 0 ? (
            studentsReport.map((student, index) => (
              <View
                key={student.id || index}
                style={[
                  styles.tableRow,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#E2E8F0",
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                  },
                ]}
              >
                <Text style={styles.colNum}>{index + 1}</Text>
                <Text style={styles.colCedula}>
                  {student.document || "V-XXXXXXXX"}
                </Text>
                <Text style={styles.colEstudiantes}>
                  {fmtUpper(
                    [student.last_name, student.name]
                      .filter(Boolean)
                      .join(", "),
                  )}
                </Text>

                {/* Renderizamos dinámicamente las notas cruzando Lapso -> Materia */}
                {lapsos.map((_, lapsoIndex) => {
                  const lapsoKey = `lapso_${lapsoIndex + 1}`; // Ejemplo de clave: lapso_1, lapso_2...

                  return React.Children.toArray(
                    subjects.map((sub) => {
                      const notaMateria =
                        student.lapsos_data?.[lapsoKey]?.[sub.id] ||
                        student.lapsos_data?.[lapsoKey]?.[sub.code];
                      return (
                        <View
                          key={`${lapsoKey}-${sub.id}`}
                          style={[
                            styles.colNoteCell,
                            { width: singleCellWidth },
                          ]}
                        >
                          <Text style={{ fontSize: 7.5, textAlign: "center" }}>
                            {fmt(notaMateria)}
                          </Text>
                        </View>
                      );
                    }),
                  );
                })}

                {/* Nota o Promedio Definitivo Anual del Estudiante */}
                <Text style={[styles.colFinalPromedio, { fontSize: 8 }]}>
                  {fmt(student.final_year_average)}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 9,
                  padding: 15,
                  color: "#64748B",
                }}
              >
                No se registraron históricos analíticos válidos para consolidar
                el año escolar actual.
              </Text>
            </View>
          )}
        </View>

        {/* REGISTRO LEGAL DE TRIPLES FIRMAS OFICIALES */}
        <View style={styles.footer} fixed>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Dpto. Evaluación</Text>
            <Text style={styles.signatureText}>FIRMA / SELLO</Text>
          </View>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Control de Estudios</Text>
            <Text style={styles.signatureText}>
              {institution?.coordinator_name
                ? fmtUpper(institution.coordinator_name)
                : "COORDINACIÓN GENERAL"}
            </Text>
            <Text style={styles.signatureText}>
              {institution?.coordinator_document
                ? `C.I. ${institution.coordinator_document}`
                : ""}
            </Text>
          </View>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Dirección del Plantel</Text>
            <Text style={styles.signatureText}>DIRECTOR(A) AUTORIZADO</Text>
          </View>
        </View>

        {/* PIE DE PÁGINA */}
        <Text
          style={{
            fontSize: 6.5,
            color: "#94A3B8",
            textAlign: "center",
            marginTop: 8,
            paddingBottom: 4,
          }}
          fixed
        >
          Este documento consolida el rendimiento integral de los tres lapsos
          reglamentarios vigentes en la Ley Orgánica de Educación. Cualquier
          enmienda, alteración o raspadura anula sus efectos legales ante el
          Ministerio del Poder Popular para la Educación.
        </Text>
      </Page>
    </Document>
  );
};

export default SabanaAnualPDF;
