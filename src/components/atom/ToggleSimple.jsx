/**
 *
 *
 * @componet
 * @param {object} props
 * @param {string} props.label - Titulo del taggle
 * @param {string} props.value
 * @param {Event} props.onChange
 * @param {string} props.name
 * @returns {JSX.Element}
 */
export default function ToggleSimple({ label, value, onChange, name }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl transition-all">
      <span className="text-sm font-bold text-slate-700">{label}</span>

      <div className="relative">
        {/* Input oculto para manejar el estado */}
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          className="sr-only"
        />

        {/* Línea de fondo del switch */}
        <div
          className={`h-7 w-14 rounded-full transition-colors duration-300 ${
            value ? "bg-green-500" : "bg-zinc-300"
          }`}
        ></div>

        {/* Círculo deslizable */}
        <div
          className={`absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
            value ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
}
