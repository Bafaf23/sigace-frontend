import Input from "../atom/Input";
import Selector from "../atom/Selector";

/**
 * Page de fromulario de inscripcion de estudiantes.
 * Furmulario de datos Medicos
 *
 * @componet
 * @param {object} props
 * @param {object} props.datos - Objeto de datos para la inscripcion de estudiante.
 * @param {Event} props.manejarCambio - Guarda los datos recopilados desde los formularios.
 * @returns {JSX.Element}
 */

const HealthPhysicalFields = ({ datos, manejarCambio }) => {
  const typeBoodlSel = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const lateralidad = [
    { value: "diestro", label: "Diestro" },
    { value: "zurdo", label: "Zurdo" },
    { value: "ambidiestro", label: "Ambidiestro" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="border-b pb-2 font-bold text-blue-700">
        Información Médica y Tallas
      </h4>
      <div className="grid md:grid-cols-3 grid-cols-2 items-end gap-4">
        <Selector
          id={"bloodType"}
          name={"bloodType"}
          label={"Selecciona tipo de sangre"}
          options={typeBoodlSel}
          value={datos.bloodType}
          onChange={manejarCambio}
        />
        <Selector
          id="Lateralidad"
          label="Lateralidad"
          name="lateralidad"
          options={lateralidad}
          value={datos.lateralidad}
          onChange={manejarCambio}
        />
        <Input
          name={"allergies"}
          label={"Alegias"}
          placeholder="Alergias (Ninguna si no aplica)"
          onChange={manejarCambio}
          value={datos.allergies}
        />
        <div className="col-span-2 md:col-span-3">
          <Input
            name="neurodevelopmentConditions"
            label="Condiciones de Neurodesarrolelo"
            placeholder="Ej: Autismo"
            onChange={manejarCambio}
            value={datos.neurodevelopmentConditions}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Input
            label="Discapacidad"
            placeholder="Ej: visual, auditiva, fisica, etc."
            onChange={manejarCambio}
            value={datos.discapacidad}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
        <Input
          name={"shirtSize"}
          label={"Talla de camisa"}
          placeholder="Ej: S,M,XL"
          onChange={manejarCambio}
          value={datos.shirtSize}
        />
        <Input
          name={"pantSize"}
          label={"Talla de pantalon"}
          placeholder="Ej: 34"
          onChange={manejarCambio}
          value={datos.pantSize}
        />
        <Input
          name={"shoeSize"}
          label={"Talla de zapatos"}
          placeholder="Ej: 45"
          onChange={manejarCambio}
          value={datos.shoeSize}
        />
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 place-items-end gap-2">
        <Input
          name={"medicalCondition"}
          label={"¿Tienes alguna enfermedad o condición médica?"}
          placeholder="Ej: Asma"
          onChange={manejarCambio}
          value={datos.medicalCondition}
        />
        <Input
          name={"height"}
          label={"¿Cuanto mides?"}
          placeholder="Ej: 1.34"
          onChange={manejarCambio}
          value={datos.height}
        />
        <Input
          name={"weight"}
          label={"¿Cuanto pesas?"}
          placeholder="Ej: 87"
          onChange={manejarCambio}
          value={datos.weight}
        />
      </div>
    </div>
  );
};

export default HealthPhysicalFields;
