import Icon from "../atom/Icon";
import {
  faLocationDot,
  faPhone,
  faIdCard,
  faBook,
  faBuilding,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function TableInsti({
  titelTable = [],
  data = [],
  loading = false,
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
          data.map((institucion) => (
            <div
              key={`card-${institucion.SIG}`}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Encabezado de la Card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    SIG: {institucion.SIG}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {institucion.nombre}
                  </h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${institucion.tipo === "pública" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
                >
                  {institucion.tipo}
                </span>
              </div>

              {/* Detalles en filas */}
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <Icon icon={faBuilding} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      Razón Social
                    </span>
                    {institucion.razon_social}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon
                    icon={faLocationDot}
                    className="mt-0.5 text-slate-400"
                  />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      Dirección
                    </span>
                    {institucion.direccion}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon icon={faPhone} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      Contacto
                    </span>
                    <p>{institucion.telefono}</p>
                    <p className="text-xs text-slate-400">
                      {institucion.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                  <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      {institucion.tipo === "pública" ? "Código DEA" : "RIF"}
                    </span>
                    <span className="font-mono font-semibold">
                      {institucion.tipo === "pública"
                        ? institucion.codigo_DEA
                        : institucion.rif}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
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
