import Banner from "@/components/atom/Banner";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "SIGACE - Términos y Condiciones",
  description: "Términos y Condiciones de uso del sistema SIGACE",
};

export default function LegalPage() {
  const systemName = process.env.NEXT_PUBLIC_SISTEM || "SIGACE";

  return (
    <article className="m-auto max-w-3xl space-y-6 p-5 text-justify leading-relaxed">
      {/* Banner de Advertencia */}
      <Banner
        icon={faInfo}
        titel="Lee atentamente"
        message="Por favor, lea atentamente los siguientes términos y condiciones antes de utilizar nuestro servicio. El acceso o uso de la plataforma implica la aceptación de la totalidad de estas cláusulas."
      />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Términos y Condiciones de Uso del Sistema{" "}
          <span className="bg-linear-to-r from-amber-500 via-orange-500 to-cyan-500 bg-clip-text text-transparent">
            {systemName}
          </span>
        </h1>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Última actualización: 21/08/2026
        </p>
      </header>

      <p className="text-sm text-slate-600">
        Bienvenido a <span className="font-bold">{systemName}</span> (Sistema de
        Control de Estudios). Al acceder, registrarse o utilizar nuestra
        plataforma web y servicios asociados, la institución educativa o usuario
        individual (&quot;Usted&quot; o &quot;la Institución&quot;) acepta
        cumplir y quedar vinculado por los presentes Términos y Condiciones.
      </p>

      {/* 1. Definición del Servicio */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          1. Definición del Servicio
        </h2>
        <p className="text-sm text-slate-600">
          <span className="font-bold">{systemName}</span> es una solución de
          software como servicio (SaaS) desarrollada para la gestión académica,
          control de estudios, registro de calificaciones, planes de evaluación
          y generación de reportes e impresos institucionales para centros de
          educación.
        </p>
      </section>

      {/* 2. Veracidad de la Información */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          2. Veracidad de la Información y Fe Pública
        </h2>
        <p className="text-sm text-slate-600">
          El Usuario y la Institución son los únicos responsables de la
          veracidad, exactitud y actualización de los datos ingresados.{" "}
          <span className="font-bold">{systemName}</span> opera como una
          herramienta de procesamiento. La alteración intencionada o maliciosa
          de registros (notas, matrículas o identidades) será considerada una
          infracción grave y objeto de acciones legales bajo la tipificación de{" "}
          <span className="italic font-semibold">
            Falsificación de Documento Público
          </span>
          .
        </p>
      </section>

      {/* 3. Cuentas de Usuario */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          3. Cuentas de Usuario y Acceso Institucional
        </h2>
        <ul className="ml-5 list-outside list-disc space-y-2 text-sm text-slate-600">
          <li>
            <span className="font-bold">Responsabilidad Operativa:</span> La
            Institución designará formalmente a sus administradores para el
            manejo de roles (directivos, docentes y personal de control de
            estudios).
          </li>
          <li>
            <span className="font-bold">Custodia de Credenciales:</span> La
            seguridad de los accesos recae estrictamente en el usuario.{" "}
            <span className="font-bold">{systemName}</span> no responde por
            fugas de información derivadas de negligencia en el resguardo de
            contraseñas.
          </li>
        </ul>
      </section>

      {/* 4. LOPNNA */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          4. Protección de Datos de Menores (LOPNNA)
        </h2>
        <p className="text-sm text-slate-600">
          En cumplimiento con la normativa legal de protección al menor (LOPNNA,
          Art. 65),{" "}
          <span className="font-bold text-cyan-600">{systemName}</span>{" "}
          establece que:
        </p>
        <ul className="ml-5 list-outside list-disc space-y-2 text-sm text-slate-600">
          <li>
            Los expedientes digitales de los estudiantes tienen carácter
            estrictamente confidencial.
          </li>
          <li>
            Queda terminantemente prohibida la cesión de datos a terceros con
            fines comerciales.
          </li>
          <li>
            La custodia digital de los expedientes responde a estándares de
            encriptación y aislamiento de bases de datos.
          </li>
        </ul>
      </section>

      {/* 5. Propiedad de los Datos */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          5. Propiedad de los Datos y Bajas del Servicio
        </h2>
        <p className="text-sm text-slate-600">
          Los datos académicos e identificativos cargados pertenecen a la
          Institución. En caso de culminación o cancelación del contrato SaaS,
          la Institución dispondrá de un lapso de{" "}
          <span className="font-bold">30 días continuos</span> para solicitar el
          respaldo exportable de sus datos. Finalizado este plazo, se procederá
          al borrado seguro de la base de datos de producción.
        </p>
      </section>

      {/* 6. Mantenimiento y Exoneración de Fuerza Mayor */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800">
          6. Disponibilidad (SLA) y Casos Fortuitos
        </h2>
        <p className="text-sm text-slate-600">
          Se procurará un nivel óptimo de disponibilidad. No obstante,{" "}
          <span className="font-bold">{systemName}</span> queda exonerada de
          responsabilidades operativas o legales ante interrupciones generadas
          por fallas de infraestructura eléctrica general, caídas masivas del
          proveedor de internet (ISP) o eventos de fuerza mayor.
        </p>
      </section>

      {/* 7. Delitos Informáticos */}
      <section className="space-y-2 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
        <h2 className="text-xl font-bold text-red-800">
          7. Delitos Informáticos
        </h2>
        <p className="text-sm text-red-900">
          Cualquier vulneración técnica, intento de ataque por fuerza bruta,
          inyección SQL o modificación no autorizada de la base de datos será
          denunciada ante el{" "}
          <span className="font-bold">
            CICPC (División de Delitos Informáticos)
          </span>{" "}
          al amparo de la Ley Especial contra los Delitos Informáticos.
        </p>
      </section>
    </article>
  );
}
