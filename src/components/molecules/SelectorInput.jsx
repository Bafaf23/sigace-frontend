import Input from "../atom/Input";

/**
* Componente híbrido que combina un selector de categorías con un campo de texto.
* Ideal para formularios de contacto o identificación donde el tipo de dato varía.

* @component

* @param {Object} props
* @param {string} props.label - Título descriptivo sobre el campo.
* @param {Array<{label: string, value: string}>} props.options - Array de objetos para las opciones del select.
* @param {string} props.name - Nombre del campo select para el manejo del estado.
* @param {string} props.nameInput - Nombre del campo input para el manejo del estado.
* @param {string} [props.id] - ID único para el selector.
* @param {string} [props.placeholder] - Texto de ayuda para el campo de entrada.
* @param {string} [props.valueSel] - Valor seleccionado actualmente en el select.
* @param {string} [props.valueInput] - Valor actual del campo de texto.
* @param {Function} props.onChange - Función manejadora de cambios para ambos campos.

* @returns {JSX.Element} Un contenedor con un label y un grupo de entrada flex.
*/

export default function SelectorInput({
  label,
  options = [],
  name,
  nameInput,
  id,
  placeholder,
  valueSel,
  valueInput,
  onChange,
}) {
  const selectId = id || name;
  const inputId = `${selectId || "selector"}-input`;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={selectId}
        className="ml-1 text-sm font-semibold text-slate-600 dark:text-zinc-300"
      >
        {label}
      </label>
      <div className="flex gap-2">
        <select
          name={name}
          value={valueSel || ""}
          id={selectId}
          onChange={onChange}
          className="w-fit rounded-xl border border-slate-200 bg-zinc-100 px-4 py-3 text-slate-700 transition-all placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-400 dark:focus:border-orange-500 dark:focus:ring-orange-500/50"
          required
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Input
          id={inputId}
          type={"text"}
          placeholder={placeholder}
          name={nameInput}
          value={valueInput || ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
