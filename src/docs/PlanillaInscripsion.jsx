import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

/**
 * Formatea un valor para que sea mayúsculas
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
 * Formatea un valor para que sea mayúsculas
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

// 1. Estilos con ADN SIGACE (Corregidos para el motor de react-pdf)
const styles = StyleSheet.create({
  page: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 2,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#334155", // Slate 700
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

  watermarkText: {
    fontSize: 60,
    color: "#E2E8F0",
    opacity: 0.4,
    transform: "rotate(-45deg)",
    fontWeight: "bold",
    textTransform: "uppercase",
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
    backgroundColor: "#04C4D9", // Dark cyan SIGACE
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
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: "#F1F5F9",
    // 🌟 CORREGIDO: Se cambiaron los shorthands de strings a propiedades numéricas nativas
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 8,
    color: "#64748B",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 5,
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
    gap: 10,
  },
  inputGroup: {
    flexDirection: "column",
    marginBottom: 5,
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
    // 🌟 CORREGIDO: Removido string padding "6 0"
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    minWidth: 100,
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  signatureLine: {
    width: "40%",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    textAlign: "center",
    paddingTop: 4,
  },
  signatureText: {
    fontSize: 8,
    color: "#64748B",
  },
});

const PlanillaInscripsion = ({ data, institution }) => {
  return (
    <Document>
      <Page size="letter" style={styles.page} wrap>
        <View style={styles.watermarkContainer} fixed>
          <Image src="/logoSigace.png" style={styles.watermarkImage} />
        </View>
        <View style={styles.accentBar} />

        {/* HEADER ESTILO DASHBOARD */}
        <View style={styles.header}>
          <View style={styles.institutionInfo}>
            <Text style={{ fontSize: 9, color: "#64748B" }}>
              República Bolivariana de Venezuela
            </Text>
            <Text style={{ fontSize: 9, color: "#64748B" }}>
              Ministerio del Poder Popular para la Educación
            </Text>
            <Text style={styles.mainTitle}>{fmtUpper(institution)}</Text>
            <View style={styles.badge}>
              <Text>
                SIGACE • Fecha:{" "}
                {data?.createdAt || new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#1E293B" }}
            >
              PLANILLA DE
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#3B82F6" }}
            >
              INSCRIPCIÓN
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#1E293B" }}
            >
              {data?.SIG || "SIG4465"}-{data?.id || "02"}
            </Text>
          </View>
        </View>

        {/* SECCIÓN 1: ESTUDIANTE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionNumber}>
              <Text>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Información del Estudiante</Text>
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "50%" }]}>
              <Text style={styles.label}>Nombres y Apellidos</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(
                  [data.name, data?.last_name].filter(Boolean).join(" "),
                )}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Identificación</Text>
              <Text style={styles.valueBox}>
                {/* 🌟 CORREGIDO: Agregado el ? a user */}
                {data?.document || "V-00000000"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Sexo</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.gender)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Nacionalidad</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.user?.nationality || "Venezolana")}
              </Text>
            </View>

            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <Text style={styles.valueBox}>
                {/* 🌟 CORREGIDO: Evita crash si user viene indefinido */}
                {data?.birth_date
                  ? new Date(data?.birth_date).toLocaleDateString()
                  : "N/A"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Lateralidad</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.user?.lateralidad || "NINGUNA")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Correo Electronico</Text>
              <Text style={styles.valueBox}>
                {/* 🌟 CORREGIDO: Agregado el ? a user */}
                {data?.email?.toLowerCase() || "N/A"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Numero de Telefono</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.phone)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Condicion</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.condition || "Nuevo Ingreso")}
              </Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 2: Direccion y datos Medicos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionNumber}>
              <Text>2</Text>
            </View>
            <Text style={styles.sectionTitle}>Direccion y datos Medicos</Text>
          </View>
          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "50%" }]}>
              <Text style={styles.label}>Direccion</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.address || "...")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "46%" }]}>
              <Text style={styles.label}>Municipio</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.municipality || "...")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "25%" }]}>
              <Text style={styles.label}>Parroquia</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.parish || "...")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Discapacidad</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.disability || "...")}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Alergias</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.allergies)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Peso (kg) y Altura (cm)</Text>
              <Text style={styles.valueBox}>
                {fmt(data?.weight)} kg y {fmt(data?.user?.height)} cm
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "36%" }]}>
              <Text style={styles.label}>Tipo de Sangre</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.bloodType)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Talla de camisa</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.user?.shirtSize)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "36%" }]}>
              <Text style={styles.label}>Talla de pantalon</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.pantSize)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Talla de zapatos</Text>
              <Text style={styles.valueBox}>{fmtUpper(data?.shoeSize)}</Text>
            </View>
            <View style={[styles.inputGroup, { width: "30%" }]}>
              <Text style={styles.label}>Enfermedad o Condicion Medica</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(medicalConditionText(data?.user))}
              </Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 3: REPRESENTANTE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionNumber}>
              <Text>3</Text>
            </View>
            <Text style={styles.sectionTitle}>Representante Legal</Text>
          </View>

          <View style={styles.grid}>
            <View style={[styles.inputGroup, { width: "50%" }]}>
              <Text style={styles.label}>Nombre del Representante</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(
                  [data?.representative?.name, data?.representative?.lastName]
                    .filter(Boolean)
                    .join(" "),
                )}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Identificacion</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative?.dni)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "26%" }]}>
              <Text style={styles.label}>Parentesco</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative?.relationship)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "20%" }]}>
              <Text style={styles.label}>Telefono</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative?.phone)}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "40%" }]}>
              <Text style={styles.label}>Correo Electronico</Text>
              <Text style={styles.valueBox}>
                {/* 🌟 CORREGIDO: Agregado el ? a representative */}
                {data?.representative?.email?.toLowerCase() || "N/A"}
              </Text>
            </View>
            <View style={[styles.inputGroup, { width: "35%" }]}>
              <Text style={styles.label}>Folio del acta de nacimiento</Text>
              <Text style={styles.valueBox}>
                {fmtUpper(data?.representative?.birthCertificate)}
              </Text>
            </View>
          </View>
        </View>

        {/* PIE DE PÁGINA / FIRMAS */}
        <View style={styles.footer}>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureText}>
              {fmtUpper(
                [data?.user?.name, data?.user?.lastName]
                  .filter(Boolean)
                  .join(" "),
              )}
            </Text>
            <Text style={styles.signatureText}>
              {fmtUpper(data?.user?.dni)}
            </Text>
          </View>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureText}>
              {fmtUpper(
                [data?.representative?.name, data?.representative?.lastName]
                  .filter(Boolean)
                  .join(" "),
              )}
            </Text>
            <Text style={styles.signatureText}>
              {fmtUpper(data?.representative?.dni)}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 7,
            color: "#94A3B8",
            textAlign: "center",
            marginTop: 10,
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
