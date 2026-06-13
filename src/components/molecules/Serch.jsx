import Button from "../atom/Button";
import Input from "../atom/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de busqueda
 * @param {Object} props
 * @param {string} props.search - Valor de la busqueda
 * @param {Function} props.setSearch - Funcion para setear el valor de la busqueda
 * @param {string} props.placeholder - Texto de ayuda para el usuario (ej: Buscar institucion por SIG)
 * @returns {JSX.Element}
 */
export default function Serch({ search, setSearch, placeholder }) {
  return (
    <div className="flex items-center gap-2">
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
        onClick={() => setSearch("")}
        icon={faSearch}
        classNameBtn="bg-cyan-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 h-full hover:bg-cyan-600 transition-colors"
      >
        Buscar
      </Button>
    </div>
  );
}
