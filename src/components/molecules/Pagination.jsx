import Button from "../atom/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

/**
 *
 * @param {object} param0
 * @param {object} param0.pagination - objeto de la paginacion de la API
 * @param {Function} param0.onPageChange - funcion para cambiar las paginas
 */
export default function Pagination({ pagination, onPageChange, loading }) {
  return (
    <div className="flex items-center gap-2">
      {/* Botón Anterior */}
      <Button
        icon={faChevronLeft}
        onClick={() => onPageChange(pagination?.prevPage)}
        classNameBtn={`cursor-pointer text-lg ${
          pagination.hasPrevPage && !loading
            ? "dark:text-zinc-200 text-slate-600 hover:-translate-x-1"
            : "dark:text-zinc-600 text-slate-300 opacity-50 cursor-not-allowed"
        } transition-all`}
      />

      {/* Indicador de Rango */}
      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800/80 p-3 rounded-xl border border-slate-200 dark:border-zinc-700/60 whitespace-nowrap text-center sm:text-left">
        Mostrando:{" "}
        <span className="text-slate-900 dark:text-zinc-100 font-bold">
          {pagination?.page}
        </span>{" "}
        de {pagination.totalPage}
      </p>

      {/* Botón Siguiente */}
      <Button
        icon={faChevronRight}
        onClick={() => onPageChange(pagination?.netxPage)}
        classNameBtn={`text-lg cursor-pointer ${
          pagination.hasNextPage && !loading
            ? "dark:text-zinc-200 text-slate-600 hover:translate-x-1"
            : "dark:text-zinc-600 text-slate-300 opacity-50 cursor-not-allowed"
        } transition-all`}
      />
    </div>
  );
}
