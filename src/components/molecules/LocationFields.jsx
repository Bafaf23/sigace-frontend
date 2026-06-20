import Input from "../atom/Input";
import Selector from "../atom/Selector";

/**
 * Page de fromulario de inscripcion de estudiantes.
 * Furmulario de dereciones
 *
 * @componet
 * @param {object} props
 * @param {object} props.datos - Objeto de datos para la inscripcion de estudiante.
 * @param {Event} props.manejarCambio - Guarda los datos recopilados desde los formularios.
 * @returns {JSX.Element}
 */

const LocationFields = ({ datos, manejarCambio }) => {
  const StatesSel = [
    { value: "amazonas", label: "Amazonas" },
    { value: "anzoategui", label: "Anzoátegui" },
    { value: "apure", label: "Apure" },
    { value: "aragua", label: "Aragua" },
    { value: "barinas", label: "Barinas" },
    { value: "bolivar", label: "Bolívar" },
    { value: "carabobo", label: "Carabobo" },
    { value: "cojedes", label: "Cojedes" },
    { value: "deltaAmacuro", label: "Delta Amacuro" },
    { value: "distritoCapital", label: "Distrito Capital" },
    { value: "falcon", label: "Falcón" },
    { value: "guarico", label: "Guárico" },
    { value: "lara", label: "Lara" },
    { value: "merida", label: "Mérida" },
    { value: "miranda", label: "Miranda" },
    { value: "monagas", label: "Monagas" },
    { value: "nuevaEsparta", label: "Nueva Esparta" },
    { value: "portuguesa", label: "Portuguesa" },
    { value: "sucre", label: "Sucre" },
    { value: "tachira", label: "Táchira" },
    { value: "trujillo", label: "Trujillo" },
    { value: "vargas", label: "La Guaira" },
    { value: "yaracuy", label: "Yaracuy" },
    { value: "zulia", label: "Zulia" },
  ];

  const housingConditionSel = [
    { label: "Familiar", value: "familiar" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="border-b pb-2 font-bold text-blue-700">Direcciones</h4>
      <div className="grid grid-cols-2 items-end gap-4">
        <Selector
          id={"state"}
          name={"state"}
          placeholder={"Cojedes"}
          label={"En donde vives"}
          options={StatesSel}
          value={datos.state}
          onChange={manejarCambio}
        />
        <Input
          name={"municipality"}
          label={"Municipio"}
          placeholder={"Paz castillo"}
          onChange={manejarCambio}
          value={datos.municipality}
        />
      </div>

      <div className="grid grid-cols-2 place-items-end gap-2">
        <Input
          name={"parish"}
          label={"Parriquia"}
          placeholder={"San Juan"}
          onChange={manejarCambio}
          value={datos.parish}
        />
        <Input
          name={"addressDetail"}
          label={"Dirección Específica"}
          placeholder={"calle florida..."}
          onChange={manejarCambio}
          value={datos.addressDetail}
        />
      </div>
      <div className="grid grid-cols-1 place-items-end gap-2">
        <Selector
          id={"housingCondition"}
          name={"housingCondition"}
          label={"Condicion de la vivienda"}
          options={housingConditionSel}
          onChange={manejarCambio}
          value={datos.housingCondition}
        />
      </div>
    </div>
  );
};

export default LocationFields;
