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

/**
 * Obtiene el texto de la condición médica del usuario
 * @param {Object} user
 * @returns {string}
 */
function medicalConditionText(user) {
  if (!user) return "";
  if (typeof user.medicalCondition === "string") return user.medicalCondition;
  if (user.medicalCondition?.medicalCondition) {
    return user.medicalCondition.medicalCondition;
  }
  return "";
}

// Estilos adaptados para incluir la tercera firma
const styles = StyleSheet.create({
  page: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 10,
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
    width: 300,
    opacity: 0.05,
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#04C4D9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
  },
  institutionInfo: {
    flexDirection: "column",
    width: "65%",
  },
  mainTitle: {
    fontSize: 18,
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
    width: "35%",
    textAlign: "right",
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
  tuitionBadge: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tuitionLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#2563EB",
    textTransform: "uppercase",
    marginRight: 4,
  },
  tuitionValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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

  // 🌟 FOOTER REDISEÑADO PARA 3 COLUMNAS SIMÉTRICAS (30% cada una)
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  signatureLine: {
    width: "30%", // Bajó de 42% a 30% para que quepan las tres en línea
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    textAlign: "center",
    paddingTop: 6,
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15, // Espacio para que firmen físicamente
    textTransform: "uppercase",
  },
  signatureText: {
    fontSize: 8,
    color: "#64748B",
    lineHeight: 1.2,
  },
});

// Modificado para aceptar el objeto 'institution' completo con los datos del plantel
const PlanillaInscripsion = ({ data, institution }) => {
  // Extraemos el nombre de la institución si viene como string o como objeto
  const institutionName =
    typeof institution === "object" ? institution?.name : institution;

  return (
    <Document>
      <Page size="letter" style={styles.page} wrap>
        {/* FONDO Y BARRA TOP */}
        <View style={styles.watermarkContainer} fixed>
          <Image src="/logoSigace.png" style={styles.watermarkImage} />
        </View>
        <View style={styles.accentBar} />

        {/* ENCABEZADO */}
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
              <Text>SIGACE • Fecha: {new Date().toLocaleDateString()}</Text>
            </View>
          </View>

          <View style={styles.headerDocType}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#1E293B" }}
            >
              PLANILLA DE
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#04C4D9" }}
            >
              INSCRIPCIÓN
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#1E293B",
                marginTop: 2,
              }}
            >
              {data?.SIG || "SIG4465"}-{data?.id || "02"}
            </Text>
          </View>
        </View>

        {/* SECCIÓN 1: ESTUDIANTE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionNumber}>
                <Text>1</Text>
              </View>
              <Text style={styles.sectionTitle}>
                Información del Estudiante
              </Text>
            </View>

            {/* Matrícula Estilizada */}
            {data?.tuition_number && (
              <View style={styles.tuitionBadge}>
                <Text style={styles.tuitionLabel}>Nº Matrícula:</Text>
                <Text style={styles.tuitionValue}>{data.tuition_number}</Text>
              </View>
            )}
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "55%" }]}>
              <Text style={styles.label}>Nombres y Apellidos</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(
                  [data?.name, data?.last_name].filter(Boolean).join(" "),
                )}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Identificación</Text>
              <Text style={styles.valueBox}>
                {data?.document || "V-00000000"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Sexo</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.gender)}</Text>
            </View>

            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <Text style={styles.valueBox}>
                {data?.birth_date
                  ? new Date(data.birth_date).toLocaleDateString()
                  : "N/A"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "45%" }]}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <Text style={styles.valueBox}>
                {data?.email ? data.email.toLowerCase() : "N/A"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Número de Teléfono</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.phone)}</Text>
            </View>

            <View style={[styles.inputGroup, { width: "100%" }]}>
              <Text style={styles.label}>Condición</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.condition || "Nuevo Ingreso")}
              </Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 2: DIRECCIÓN Y DATOS MÉDICOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionNumber}>
                <Text>2</Text>
              </View>
              <Text style={styles.sectionTitle}>Dirección y Datos Médicos</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "40%" }]}>
              <Text style={styles.label}>Alergias</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.allergies)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Peso (kg) y Altura (cm)</Text>
              <Text style={styles.valueBox}>
                {fmt(data?.weight)} kg y {fmt(data?.height)} cm
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Talla de camisa</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.shirtSize)}</Text>
            </View>

            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Talla de pantalón</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.pantSize)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Talla de zapatos</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.shoeSize)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "50%" }]}>
              <Text style={styles.label}>Enfermedad o Condición Médica</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(medicalConditionText(data?.user))}
              </Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 3: REPRESENTANTE LEGAL */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionNumber}>
                <Text>3</Text>
              </View>
              <Text style={styles.sectionTitle}>Representante Legal</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "50%" }]}>
              <Text style={styles.label}>Nombre del Representante</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(
                  [data?.representative_name, data?.representative_last_name]
                    .filter(Boolean)
                    .join(" "),
                )}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Identificación</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative_document)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Parentesco</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative_relationship)}
              </Text>
            </View>

            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative_phone)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "70%" }]}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <Text style={styles.valueBox}>
                {data?.representative_email
                  ? data.representative_email.toLowerCase()
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* 🏛️ PIE DE PÁGINA / SECCIÓN DE FIRMAS ACTUALIZADA (3 COLUMNAS) */}
        <View style={styles.footer}>
          {/* Columna 1: Estudiante */}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Estudiante</Text>
            <Text style={styles.signatureText}>
              {fmtUpper(
                [data?.name, data?.last_name].filter(Boolean).join(" "),
              )}
            </Text>
            <Text style={styles.signatureText}>
              {data?.document ? fmtUpper(data.document) : "C.I. N/A"}
            </Text>
          </View>

          {/* Columna 2: Representante */}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureTitle}>Representante Legal</Text>
            <Text style={styles.signatureText}>
              {fmtUpper(
                [data?.representative_name, data?.representative_last_name]
                  .filter(Boolean)
                  .join(" "),
              )}
            </Text>
            <Text style={styles.signatureText}>
              {data?.representative_document
                ? fmtUpper(data.representative_document)
                : "C.I. N/A"}
            </Text>
          </View>

          {/* Columna 3: Control de Estudios (NUEVA) */}
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
                : "RECEPTOR AUTORIZADO"}
            </Text>
          </View>
        </View>

        {/* PIE DE PÁGINA SISTÉMICO */}
        <Text
          style={{
            fontSize: 7,
            color: "#94A3B8",
            textAlign: "center",
            marginTop: 15,
            paddingBottom: 5,
          }}
        >
          Documento generado digitalmente por el Sistema de Gestión Académica
          SIGACE. Verifique la autenticidad mediante el código QR institucional.
        </Text>
      </Page>
    </Document>
  );
};

export default PlanillaInscripsion;
