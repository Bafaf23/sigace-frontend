import Icon from "../atom/Icon";
import {
  faLocationDot,
  faPhone,
  faIdCard,
  faBook,
  faBuilding,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

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
 *    { label: "Nombre", key: "name" },
 *    { label: "Dirección", key: "address" },
 *    { label: "Teléfono", key: "phone" },
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
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
        Cargando instituciones...
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* lista de instituciones mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
            No hay instituciones cargadas.
          </div>
        ) : (
          data.map((institucion) => {
            return renderMovilCard(institucion);
          })
        )}
      </div>

      {/* Tabla de instituciones PC */}
      <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-900 hidden md:block">
        <table className={`w-full border-collapse text-left`}>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
              {titelTable.map((titel, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400"
                >
                  <Icon icon={titel.icon} />
                  {titel.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-slate-400"
                >
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <Icon
                      icon={faBoxOpen}
                      className="text-4xl text-slate-400"
                    />
                    <p className="text-sm text-slate-400 text-center">
                      Parece que no hay datos cargados. Espera un momento y
                      vuelve a cargar la página.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((institucion) => {
                return renderTableRows(institucion);
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
