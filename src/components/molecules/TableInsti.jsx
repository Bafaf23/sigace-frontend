import Icon from "../atom/Icon";
import { faBook, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {array} titelTable - Array de objetos con las propiedades label y key
 * @param {array} data
 * @param {boolean} loading
 * @param {function} renderMovilCard
 * @param {function} renderTableRows
 * @returns {JSX.Element}
 *
 * @expal
 * <TableInsti
 *  titelTable={[
 *    { name: "Nombre", icon: icon },
 *    { name: "Dirección", icon: icon },
 *    { name: "Teléfono", icon: icon },
 *  ]}
 *  data={data}
 * />
 */
export default function TableInsti({
  titelTable = [],
  data = [],
  loading = false,
  renderMovilCard = () => {},
  renderTableRows = () => {},
}) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-900 p-6 text-center text-slate-500 dark:text-zinc-400 shadow-sm border border-slate-200 dark:border-zinc-700/60">
        Cargando instituciones...
      </div>
    );
  }

  return (
    <div>
      {/* lista de instituciones mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.length === 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-700/70 bg-slate-50 dark:bg-zinc-900/50 p-12 text-center">
              <Icon
                icon={faBook}
                className="mb-4 text-4xl text-slate-300 dark:text-zinc-500"
              />
              <p className="text-lg font-medium text-slate-500 dark:text-zinc-300">
                No hay información que mostrar
              </p>
              <p className="text-sm text-slate-400 dark:text-zinc-400 mt-1">
                Comienza haciendo un registro con el botón de arriba.
              </p>
            </div>
          </div>
        ) : (
          data.map((institucion) => {
            return renderMovilCard(institucion);
          })
        )}
      </div>

      {/* Tabla de instituciones PC */}
      <div>
        <div className="overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-slate-200 dark:border-zinc-700/60 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-700/60 bg-slate-50 dark:bg-zinc-800/80">
                {titelTable.map((titel, index) => (
                  <th
                    key={index}
                    className={`${titel.className} px-6 py-4 text-sm font-semibold text-slate-600 dark:text-zinc-200`}
                  >
                    {titel.icon && <Icon icon={titel.icon} className="mr-2" />}
                    {titel.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={titelTable.length}
                    className="px-6 py-10 text-center text-slate-400 dark:text-zinc-400"
                  >
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <Icon
                        icon={faBoxOpen}
                        className="text-4xl text-slate-400 dark:text-zinc-500"
                      />
                      <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
                        Parece que no hay datos cargados. Espera un momento y
                        vuelve a cargar la página.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((institucion, index) => {
                  return renderTableRows(institucion, index);
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
