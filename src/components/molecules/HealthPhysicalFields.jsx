import Banner from "../atom/Banner";
import Input from "../atom/Input";
import Selector from "../atom/Selector";
import { faHeadSideCough } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className="space-y-6 w-full">
      <h4 className="font-extrabold text-amber-500 text-2xl uppercase">
        Tus datos medicos y fisicos
      </h4>
      <Banner
        icon={faHeadSideCough}
        title="¿No padecesde alguna condición médica?"
        message="Si no padeces ninguna condición o alergia médica, deja los campos en blanco."
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          name={"allergies"}
          label={"Allergies"}
          placeholder="Asma, Rinitis, etc."
          onChange={manejarCambio}
          value={datos.allergies}
        />
        <Input
          label="Condicion Medica"
          placeholder="Otitis, Diabetes, etc."
          onChange={manejarCambio}
          value={datos.discapacidad}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        <Input
          name={"shirtSize"}
          label={"Talla de camisa"}
          placeholder="S,M,XL"
          onChange={manejarCambio}
          value={datos.shirtSize}
        />
        <Input
          name={"pantSize"}
          label={"Talla de pantalon"}
          placeholder="34"
          onChange={manejarCambio}
          value={datos.pantSize}
        />
        <div className="col-span-2">
          <Input
            name={"shoeSize"}
            label={"Talla de zapatos"}
            placeholder="45"
            onChange={manejarCambio}
            value={datos.shoeSize}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-2 place-items-end gap-2">
        <Input
          name={"height"}
          label={"¿Cuanto mides?"}
          placeholder="1,34"
          onChange={manejarCambio}
          value={datos.height}
        />
        <Input
          name={"weight"}
          label={"¿Cuanto pesas?"}
          placeholder="87"
          onChange={manejarCambio}
          value={datos.weight}
        />
      </div>
    </div>
  );
};

export default HealthPhysicalFields;
