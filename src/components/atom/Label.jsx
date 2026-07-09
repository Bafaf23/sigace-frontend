/**
 * Componente de etiqueta (Label) para resaltar estados o categorías.
 * Permite personalizar colores mediante Tailwind y asegura un formato de texto consistente.
 * * @component
 * @param {Object} props
 * @param {string} props.label - El texto o contenido a mostrar dentro de la etiqueta.
 * @param {string} [props.className] - Clases de Tailwind para colores de fondo y texto.
 * @returns {JSX.Element} Un span estilizado con bordes redondeados y texto en mayúsculas.
 */
export default function Label({ label, className }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {label}
    </span>
  );
}
