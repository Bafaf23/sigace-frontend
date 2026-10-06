"use client";

/**
 * Input estilado y adaptable con tipo, para el menejo de datos, tambien recibe onChange.
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - Titulo del input (ej: nombre)
 * @param {string} props.type - El tipo de input (ej: text, number, data, etc)
 * @param {string} props.placeholder - Texte de ayuda para el usuario (ej: user@ejemplo.com)
 * @param {string} props.name
 * @param {string} props.value
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  ref,
  onKeyDown,
  id,
  value,
  onChange,
  className,
  readOnly = false,
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className={`ml-1 text-sm font-semibold ${readOnly ? "text-zinc-500" : "text-slate-600 dark:text-zinc-300"}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        ref={ref}
        value={value}
        onWheel={(e) => e.target.blur()}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-400 dark:focus:border-orange-500 dark:focus:ring-2 dark:focus:ring-orange-500/50 dark:focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${readOnly ? "cursor-not-allowed text-gray-400" : " text-slate-900 dark:text-zinc-100"} ${className}`}
        readOnly={readOnly}
      />
    </div>
  );
}
