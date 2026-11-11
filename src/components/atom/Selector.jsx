"use client";

/**
 * Selector que muestra distintas opciones a elejir al usurio
 *
 * @componet
 * @param {Object} props
 * @param {string} props.id - Identificador unico del elemento
 * @param {string} props.name
 * @param {string} props.label - Tilulo del componente
 * @param {Event} props.onChange
 * @param {Array} props.options
 * @param {string} props.className - Class para personalisar el componente
 * @param {string} props.value
 * @returns {JSX.Element}
 */
export default function Selector({
  id,
  name,
  label,
  onChange,
  options = [],
  className = "text-slate-600 dark:text-zinc-300",
  value,
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className={`ml-1 text-sm font-semibold ${className}`}>
        {label}
      </label>
      <select
        name={name}
        value={value || ""}
        id={id}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 text-slate-700 dark:text-slate-50 ..."
        required
      >
        <option value="" disabled hidden>
          Seleccione una opción
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
