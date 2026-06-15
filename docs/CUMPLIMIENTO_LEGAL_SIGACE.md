# Cumplimiento legal y operativo — SIGACE (liceo, Venezuela)

> **Aviso:** esto no es asesoría legal. Valídalo con un abogado del sector educativo y con la Coordinación de control de Estudios y Evaluación de tu Zona Educativa. El marco incluye LOE, reglamentos, circulares del MPPE, LOPNNA, Ley de Mensajes de Datos y Firmas Electrónicas, y el uso obligatorio del sistema oficial de gestión escolar (Güaicaipuro) según lo oriente el MPPE.

---

## 1. Lista: qué falta para acercarse a un cumplimiento razonable

### Obligaciones del plantel (no las cubre solo el software)

1. Usar el sistema oficial del MPPE (**Güaicaipuro**) para matrícula, notas y cierres según la Zona Educativa y circulares vigentes.
2. Responsables designados (director/a, coordinador/a de control de estudios y evaluación) y procedimientos internos escritos.
3. Documentos con validez institucional: boletas, certificaciones y cierres con **sello del plantel y firmas** según normativa aplicable.
4. Alineación con la Zona Educativa: formatos, plazos y reportes (p. ej. resumen final de evaluación).

### Brechas típicas en SIGACE (producto + operación)

5. Integración o **exportación** compatible con la carga en Güaicaipuro (evitar SIGACE aislado del flujo oficial).
6. **Notas reales** en backend, con **cierre de lapso** y **auditoría** (quién cambió qué y cuándo).
7. **Configuración de lapsos y año escolar** funcional; rutas del menú coherentes (`administrator` vs `administrators`).
8. **Asistencia** operativa (docente + consulta estudiante).
9. **Boletas / certificaciones PDF** con datos del liceo y flujo de emisión; distinguir consulta web vs documento sellado y firmado.
10. **Retiros, traslados y modificaciones de matrícula** con historial y permisos.
11. **role coordinador de control de estudios** (cierres, emisión/revisión de documentos, irregularidades).
12. **Portal estudiante** (y representante si se ofrece): notas y asistencia en solo lectura.
13. **Carga académica** enlazada al backend (docente–materia–sección).
14. **Coherencia legal–técnica** con lo prometido en `/legal` (cifrado, confidencialidad): HTTPS, backups, acceso por role, logs.
15. **Política de privacidad / tratamiento de datos** alineada con LOPNNA (y normativa de datos personales si aplica).
16. **Rutas y auth** sin 404, rutas públicas correctas (inscripción), sin `localhost` en producción.
17. **Revisión jurídica** con abogado venezolano del sector educativo.

---

## 2. Checklist legal-operativa (por flujo)

### Inscripción y expediente

- [ ] Identidad del estudiante y datos académicos de procedencia.
- [ ] Representante legal y padres/tutores según corresponda.
- [ ] Consentimientos y términos (`/legal`); comprobante PDF de inscripción como apoyo (no sustituye actos oficiales).
- [ ] Validación de duplicados y reglas contra doble matrícula indebida.

### Matrícula y cupos

- [ ] Matrícula en año/sección con cupo; listados por sección.
- [ ] Cambios de sección / corrección de datos con trazabilidad.
- [ ] Retiros y traslados; carga o conciliación con Güaicaipuro según plazos MPPE.

### Estructura académica

- [ ] Años (1°–5°), secciones, asignaturas por grado/área.
- [ ] Carga académica docente–materia–sección; cambios de docente documentados.

### Lapsos y evaluación

- [ ] Lapsos con fechas y estados (abierto/cerrado); cierre autorizado por role.
- [ ] Plan evaluativo por materia; exportación/PDF si lo exige el plantel.
- [ ] Notas por lapso coherente con el régimen del liceo; recuperación/mesas si aplica.

### Asistencia

- [ ] Registro docente; justificaciones; reportes; consulta estudiante.

### Documentos

- [ ] Boletas por lapso; constancias si aplica; firmas y datos del plantel según normativa.
- [ ] Texto claro: documento oficial = el que emite y legaliza el plantel (sello/firmas).

### MPPE y estadística

- [ ] Cumplimiento de cargas y reportes en Güaicaipuro; exportaciones que pida la Zona.

### Seguridad y datos

- [ ] Permisos por role; logs de acceso a datos sensibles; backups.
- [ ] Política de retención y rectificación de datos personales.

### roles

- [ ] Admin, docente, estudiante; **coordinador de control de estudios** recomendado; superusuario/soporte si aplica.

---

## 3. Prioridad por riesgo legal

### Prioridad 1 — Riesgo alto

1. LOPNNA y datos de menores: política de tratamiento, acceso mínimo, no filtrar notas/asistencia.
2. Auditoría de calificaciones (creación/cambio, usuario, fecha, valor anterior).
3. Autenticación y permisos reales por role.
4. Alinear textos legales con la capacidad técnica real del sistema.

### Prioridad 2 — Riesgo medio

5. Flujo con Güaicaipuro (exportación o procedimiento acordado con la Zona).
6. Notas persistidas + cierre de lapso.
7. Boletas/certificaciones PDF y proceso de emisión.
8. Matrícula avanzada: retiros, traslados, cambios con registro.

### Prioridad 3 — Orden y cierre del producto

9. Asistencia completa.
10. Portal estudiante (y representante si se promete).
11. Carga académica en API.
12. Lapsos en UI + backend; rutas consistentes en el sidebar.
13. Infra: HTTPS, env, sin localhost en producción, backups.
14. Abogado + validación con Coordinación de control de Estudios.

**Orden sugerido de trabajo:** ítems P1 (1→4), luego P2 (5→8) en paralelo con backend, después P3 (9→14).

---

## 4. Referencia rápida de rutas en el frontend (revisar typos)

- Docente: `planEvaluativo`, `cargarNotas`, `asistencia`.
- Admin: `controlSecciones`, `gestionAsignaturas`, `cargaAcademica`; lapsos enlazados a `/dashboard/administrators/lapsos` en el sidebar — verificar que la ruta exista y coincida con `administrator` si aplica.
- Estudiante: `notas`, `asistencia` (confirmar que las páginas existan).
- Legal: `/legal`.

---

_Documento generado a partir de conversaciones de diseño del proyecto SIGACE; actualízalo cuando la Zona Educativa o el MPPE cambien requisitos o formatos._
