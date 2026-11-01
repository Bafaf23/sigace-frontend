import Button from "../atom/Button";
import Input from "../atom/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de búsqueda
 * @param {Object} props
 * @param {string} props.search - Valor de la búsqueda
 * @param {Function} props.setSearch - Función para setear el valor de la búsqueda
 * @param {string} props.placeholder - Texto de ayuda para el usuario
 * @param {Function} [props.onSearch] - Función opcional para disparar al hacer clic en Buscar
 * @returns {JSX.Element}
 */
export default function Search({ search, setSearch, placeholder, onSearch }) {
  // Manejador para ejecutar la búsqueda
  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  // Disparar búsqueda al presionar Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full sm:max-w-md">
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-200 dark:border-zinc-700/60 focus:border-cyan-500 dark:focus:border-cyan-500"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="button"
        onClick={handleSearchSubmit}
        icon={faSearch}
        classNameBtn="bg-cyan-600 hover:bg-cyan-500 text-white font-medium  rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm dark:shadow-cyan-950/20"
      >
        Buscar
      </Button>
    </div>
  );
}
