import Input from "../atom/Input";

import SelectorInput from "./SelectorInput";

/**
 * Componente de Formulario para el Registro de Datos Personales.
 *
 * Este componente actúa como una sección del formulario de registro que gestiona:
 * 1. Identidad: Selección de nacionalidad (V/E) y número de documento.
 * 2. Datos básicos: Nombre, apellido, fecha de nacimiento y contacto.
 * 3. Seguridad: Entrada de contraseña con confirmación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Estado que contiene los valores actuales del formulario.
 * @param {Function} props.manejoCambio - Función callback para actualizar el estado global del formulario.
 *
 * @returns {JSX.Element} Fragmento de UI con campos validados y estilizados con Tailwind CSS.
 */
export default function DataUserRegister({ data, manejoCambio }) {
  const options = [
    {
      label: "Venezolano",
      value: "V-",
    },
    {
      label: "Extranjero",
      value: "E-",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-1 items-center gap-2">
        <SelectorInput
          label={"Tipo de Identidad"}
          name={"typeDocuement"}
          nameInput={"document"}
          options={options}
          id={"optionId"}
          placeholder={"3242343"}
          valueSel={data.typeDocuement}
          valueInput={data.document}
          onChange={manejoCambio}
        />
      </div>
      <Input
        label={"Nombre"}
        type={"text"}
        placeholder={"Mario"}
        value={data.name}
        name={"name"}
        onChange={manejoCambio}
      />

      <div className="flex gap-2">
        <Input
          label={"Apellido"}
          type={"text"}
          placeholder={"Sanchez"}
          value={data.last_name}
          name={"last_name"}
          onChange={manejoCambio}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <Input
          label={"Correo Electronico"}
          type={"email"}
          placeholder={"usuario@ejemplo.com"}
          value={data.email}
          name={"email"}
          onChange={manejoCambio}
        />
        <Input
          label={"Telefono"}
          type={"text"}
          placeholder={"0424..."}
          value={data.phone}
          name={"phone"}
          onChange={manejoCambio}
        />
      </div>
    </div>
  );
}
