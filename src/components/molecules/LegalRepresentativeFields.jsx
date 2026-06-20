import Input from "../atom/Input";
import Selector from "../atom/Selector";
import SelectorInput from "./SelectorInput";

/**
 * Page de fromulario de inscripcion de estudiantes.
 * Furmulario de datos de los representantes del estudiante.
 *
 * @componet
 * @param {object} props
 * @param {object} props.datos - Objeto de datos para la inscripcion de estudiante.
 * @param {Event} props.manejarCambio - Guarda los datos recopilados desde los formularios.
 * @returns {JSX.Element}
 */

const LegalRepresentativeFields = ({ datos, manejarCambio }) => {
  const relationshipOptions = [
    { value: "mamá", label: "Madre" },
    { value: "papá", label: "Padre" },
    { value: "tutor", label: "Tutor" },
    { value: "institucional", label: "Protección Integral / Institucional" },
  ];

  const dniType = [
    { value: "V-", label: "Venezolano" },
    { value: "E-", label: "Extranjero" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="border-b pb-2 font-bold text-blue-700">
        Datos del Representante Legal
      </h4>

      <div className="grid grid-cols-1 items-end gap-4">
        <SelectorInput
          id="repDniType"
          name={"repdniType"}
          nameInput={"repdni"}
          label="Cédula del Representante"
          placeholder="Ej: 12345678"
          options={dniType}
          valueSel={datos.repdniType}
          valueInput={datos.repdni}
          onChange={manejarCambio}
        />
        <Selector
          name="relationship"
          label="Parentesco"
          options={relationshipOptions}
          onChange={manejarCambio}
          value={datos.relationship}
        />
      </div>

      <div className="grid  grid-cols-2 items-end gap-2">
        <Input
          name="repName"
          label="Nombres"
          placeholder="Juan"
          onChange={manejarCambio}
          value={datos.repName}
        />
        <Input
          name="repLastName"
          label="Apellidos"
          placeholder="Fernández"
          onChange={manejarCambio}
          value={datos.repLastName}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="repEmail"
          label="Correo Electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          onChange={manejarCambio}
          value={datos.repEmail}
        />
        <Input
          name="repPhone"
          label="Número de Teléfono"
          placeholder="04241234567"
          onChange={manejarCambio}
          value={datos.repPhone}
        />
      </div>
    </div>
  );
};

export default LegalRepresentativeFields;
