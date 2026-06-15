export const metadata = {
  title: "SIGACE - Términos y Condiciones",
  description: "Términos y Condiciones de uso del sistema SIGACE",
};
export default function LegalPage() {
  return (
    <article className="m-auto max-w-3xl space-y-6 p-5 text-justify leading-relaxed">
      {/* Titulo y descripcion */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          Por favor, lea atentamente los siguientes términos y condiciones antes
          de utilizar nuestro servicio. Al utilizar nuestro servicio, usted
          acepta los siguientes términos y condiciones.
        </p>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Términos y Condiciones de Uso del Sistema{" "}
          <span className="text-cyan-600">SIGACE</span>
        </h1>
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Última actualización: 03/05/2026
        </p>
      </header>

      <p className="text-sm text-gray-600">
        El presente documento establece las reglas y condiciones bajo las cuales
        el Representante Legal (en adelante, "el Usuario") hará uso de la
        plataforma digital SIGACE (en adelante, "el Sistema") para la gestión de
        inscripción, control de estudios y consulta académica del estudiante.
      </p>

      {/* 1. Declaración de Representación Legal */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          1. Declaración de Representación Legal
        </h2>
        <p className="text-sm text-gray-600">
          Al utilizar este Sistema, el Usuario declara bajo fe de juramento ser
          el Representante Legal legítimo del adolescente o niño inscrito. El
          Usuario reconoce que:
        </p>
        <ul className="ml-5 list-outside list-disc space-y-2 text-sm text-gray-600">
          <li>
            Ejerce la Patria Potestad, Tutela o posee una Autorización
            Judicial/Administrativa vigente emitida por los órganos competentes
            (Tribunales de Protección o Consejo de Protección de Niños, Niñas y
            Adolescentes).
          </li>
          <li>
            Cualquier falsedad en la identidad del representante o en la
            documentación cargada acarreará la anulación inmediata de la
            inscripción y las sanciones civiles o penales correspondientes.
          </li>
        </ul>
      </section>

      {/* 2. Veracidad de la Información */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          2. Veracidad de la Información
        </h2>
        <p className="text-sm text-gray-600">
          El Usuario es el único responsable de la veracidad, exactitud y
          actualización de los datos suministrados en los formularios digitales.{" "}
          <span className="font-bold text-cyan-600">SIGACE</span> funciona como
          un repositorio de fe pública escolar; por lo tanto, la alteración
          maliciosa de datos (notas, fechas de nacimiento o documentos de
          identidad) será tratada como{" "}
          <span className="italic">Falsificación de Documento Público</span>,
          según la ley venezolana.
        </p>
      </section>

      {/* 3. Protección de Datos (LOPNNA) */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          3. Protección de Datos de Menores (LOPNNA)
        </h2>
        <p className="text-sm text-gray-600">
          En cumplimiento con el artículo 65 de la{" "}
          <span className="font-bold text-emerald-600">LOPNNA</span>,{" "}
          <span className="font-bold text-cyan-600">SIGACE</span> garantiza que:
        </p>
        <ul className="ml-5 list-outside list-disc space-y-2 text-sm text-gray-600">
          <li>Los datos del estudiante son confidenciales y restringidos.</li>
          <li>No se cederán datos a terceros con fines comerciales.</li>
          <li>
            El Sistema implementa cifrado para proteger el expediente digital.
          </li>
        </ul>
      </section>

      {/* 4. Firma Electrónica */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          4. Firma Electrónica y Validez Jurídica
        </h2>
        <p className="text-sm text-gray-600">
          Conforme a la Ley de Mensajes de Datos y Firmas Electrónicas, el
          Usuario acepta que el uso de sus credenciales y el marcado de
          aceptación equivalen a su{" "}
          <span className="font-bold underline">Firma Electrónica</span>.
        </p>
      </section>

      {/* 5. Seguridad */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          5. Uso de Credenciales y Seguridad
        </h2>
        <ul className="ml-5 list-outside list-disc space-y-2 text-sm text-gray-600">
          <li>Queda prohibido compartir las credenciales con terceros.</li>
          <li>
            Toda acción en la cuenta se atribuye legalmente al Representante.
          </li>
          <li>
            Es obligación del Usuario cerrar sesión en dispositivos compartidos.
          </li>
        </ul>
      </section>

      {/* 6. Delitos Informáticos */}
      <section className="space-y-2 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
        <h2 className="text-xl font-bold text-red-800">
          6. Delitos Informáticos
        </h2>
        <p className="text-sm text-red-900">
          Cualquier intento de acceso indebido, sabotaje o modificación no
          autorizada de calificaciones será denunciado ante el{" "}
          <strong>CICPC</strong> bajo la Ley Especial contra los Delitos
          Informáticos.
        </p>
      </section>

      {/* 7. Aceptación */}
      <section className="space-y-3 pb-10">
        <h2 className="text-xl font-bold text-slate-800">
          7. Aceptación del Servicio
        </h2>
        <p className="text-sm text-gray-600 italic">
          La continuación del proceso implica la aceptación total y sin reservas
          de estos términos.
        </p>
      </section>
    </article>
  );
}
