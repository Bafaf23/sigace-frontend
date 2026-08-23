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
  // Manejador para cuando hacen clic en buscar
  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full sm:max-w-md">
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="button"
        onClick={handleSearchSubmit}
        icon={faSearch}
        classNameBtn="bg-cyan-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 h-full hover:bg-cyan-600 transition-colors whitespace-nowrap"
      >
        Buscar
      </Button>
    </div>
  );
}
