import Input from "../atom/Input";
import Selector from "../atom/Selector";

/**
 * Parte obcional del from de enrolement que pregunta si viene de otra intitucion
 *
 * @param {object} props
 * @param {object} props.datos
 * @param {Event} props.manejarCambio
 * @returns {JSX.Element}
 */

const AcademicFields = ({ datos, manejarCambio }) => {
  const yearOptions = [
    { value: "1", label: "1er Año" },
    { value: "2", label: "2do Año" },
    { value: "3", label: "3er Año" },
    { value: "4", label: "4to Año" },
    { value: "5", label: "5to Año" },
  ];

  return (
    <div className="space-y-6">
      {datos.isNewEntry && (
        <div className="mt-5 space-y-4">
          <h4 className="border-b pb-2 font-bold text-blue-700">
            Información Académica de Procedencia
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              name="previousSchool"
              label="Plantel de Procedencia"
              placeholder="Ej: U.E.N. Francisco de Miranda"
              value={datos.previousSchool}
              onChange={manejarCambio}
            />
            <Input
              name="previousSchoolCode"
              label="Código DEA del Plantel"
              placeholder="Ej: OD123456"
              value={datos.previousSchoolCode}
              onChange={manejarCambio}
            />
          </div>

          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
            <Selector
              name="previousYear"
              label="Año cursado"
              options={yearOptions}
              value={datos.previousYear}
              onChange={manejarCambio}
            />
            <Input
              name="previousSection"
              label="Sección (Si aplica)"
              placeholder="Ej: A"
              value={datos.previousSection}
              onChange={manejarCambio}
            />
            <Input
              name="canaimaSerial"
              label="Serial Equipo Canaima"
              placeholder="Opcional"
              value={datos.canaimaSerial}
              onChange={manejarCambio}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicFields;
