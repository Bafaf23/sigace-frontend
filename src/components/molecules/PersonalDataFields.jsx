import Input from "../atom/Input";
import Selector from "../atom/Selector";
import ToggleSimple from "../atom/ToggleSimple";
import SelectorInput from "./SelectorInput";

/**
 * Page de fromulario de inscripcion de estudiantes.
 * Furmulario de del estudiante (ej: nombre, sexo, fecha de nacimineto).
 *
 * @componet
 * @param {object} props
 * @param {object} props.datos - Objeto de datos para la inscripcion de estudiante.
 * @param {Event} props.manejarCambio - Guarda los datos recopilados desde los formularios.
 * @returns {JSX.Element}
 */

const PersonalDataFields = ({ datos, manejarCambio, mode }) => {
  const documentType = [
    { value: "V-", label: "Venezolano" },
    { value: "CE-", label: "Cedula Estudiantil" },
  ];

  const genderSel = [
    { label: "Femenino", value: "Femenino" },
    { label: "Masculino", value: "Masculino" },
  ];

  const statusOptions = [
    { label: "Activo", value: "Activo" },
    { label: "Retirado", value: "Retirado" },
    { label: "Traslado", value: "Traslado" },
    { label: "Reingreso", value: "Reingreso" },
  ];

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    manejarCambio({ target: { name, value: checked } });
  };

  return (
    <div className="space-y-4">
      <h4 className="border-b pb-2 font-bold text-blue-700">
        Datos Personales
      </h4>
      <div>
        {mode !== "edit" && (
          <ToggleSimple
            label={"¿Vienes de otra institución academica?"}
            name={"isNewEntry"}
            value={datos.isNewEntry}
            onChange={handleToggle}
          />
        )}
      </div>
      <div className="grid md:grid-cols-3 items-end gap-4">
        {mode !== "edit" ? (
          <div className="col-span-2">
            <SelectorInput
              id={"dni"}
              name={"documentType"}
              nameInput={"document"}
              placeholder={"323233"}
              label={"Selecciona tipo de documento"}
              options={documentType}
              onChange={manejarCambio}
              valueSel={datos.documentType}
              valueInput={datos.document}
            />
          </div>
        ) : (
          <>
            <div className="col-span-3 md:col-span-2">
              <Input
                name={"document"}
                label={"Numero de documento"}
                placeholder={"323233"}
                onChange={manejarCambio}
                value={datos.document}
              />
            </div>
            <div className="">
              <Selector
                name={"status"}
                label={"Estatus"}
                options={statusOptions}
                onChange={manejarCambio}
                value={datos.status}
              />
            </div>
          </>
        )}
        <div className="col-span-2 md:col-span-1">
          <Input
            name={"birthDate"}
            label={"Fecha de nacimiento"}
            placeholder={"23/12/2002"}
            type={"date"}
            onChange={manejarCambio}
            value={datos.birthDate || ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 place-items-end gap-2 md:grid-cols-2">
        <Input
          name={"name"}
          label={"Nombre"}
          placeholder={"Juan"}
          onChange={manejarCambio}
          value={datos?.name}
        />
        <Input
          name={"lastName"}
          label={"Apellido"}
          placeholder={"Fernandez"}
          onChange={manejarCambio}
          value={datos?.lastName}
        />
      </div>
      <div>
        <Selector
          name={"gender"}
          label={"Género / Sexo"}
          options={genderSel}
          onChange={manejarCambio}
          value={datos?.gender}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 place-items-end gap-2">
        <Input
          name={"email"}
          label={"Correo Electronico"}
          placeholder={"ejemplo@correo.com"}
          onChange={manejarCambio}
          value={datos?.email}
        />
        <Input
          name={"phone"}
          label={"Numero de Telefono"}
          placeholder={"0424XXXXXXX"}
          onChange={manejarCambio}
          value={datos?.phone}
        />
      </div>
    </div>
  );
};

export default PersonalDataFields;
