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
  const lateralidad = [
    { value: "diestro", label: "Diestro" },
    { value: "zurdo", label: "Zurdo" },
    { value: "ambidiestro", label: "Ambidiestro" },
  ];

  return (
    <div className="space-y-6">
      <h4 className="border-b pb-2 font-bold text-blue-700">
        Información Médica y Tallas
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <Input
          name={"allergies"}
          label={"Alegias"}
          placeholder="Alergias (Ninguna si no aplica)"
          onChange={manejarCambio}
          value={datos.allergies}
        />
        <Input
          label="Condicion Medica"
          placeholder="Ej: visual, auditiva, fisica, etc"
          onChange={manejarCambio}
          value={datos.discapacidad}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-2">
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
      <div className="grid md:grid-cols-2 grid-cols-2 place-items-end gap-2">
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
