import Selector from "../atom/Selector";

/**
 * Titulos de las paginas que suporta el saludo al usuario o el titulo de la pagian.
 *
 * @componet
 * @param {object} props
 * @param {object} props.user - Objeto con los datos del Usuario
 * @param {string} props.titelPage - Titulo de la pagina
 * @returns {JSX.Element}
 */

export default function HeaderDashbord({ user, titelPage }) {
  const formatLastLogin = (date) => {
    if (!date) return "Primera conexión";

    return new Intl.DateTimeFormat("es-VE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Caracas", // Forzamos la hora de Venezuela
    }).format(new Date(date));
  };

  return (
    <section className="flex w-full flex-col md:flex-row md:justify-between">
      <div className="w-full rounded-b-2xl bg-indigo-500 p-3 text-slate-100 shadow-indigo-400 md:bg-transparent lg:bg-transparent dark:bg-indigo-600 dark:shadow-indigo-400">
        <div className="mb-2 flex w-full items-center justify-between gap-2">
          {user ? (
            <div className="flex flex-col justify-between w-full">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-50 md:text-3xl md:text-indigo-300 dark:text-slate-500">
                  Hola,
                </h1>
                <span className="text-2xl font-bold text-slate-50 normal-case md:text-3xl md:text-indigo-500 dark:text-slate-500">
                  {user.user.name} {user.user.lastName}
                </span>
              </div>
              <div>
                <p className="text-slate-300 dark:text-slate-500">
                  Bienvenido a tu panel de controle.
                </p>
                <div className="flex items-center justify-between rounded-xl bg-indigo-600 p-1 md:bg-transparent">
                  {/* ultima conexcion */}
                  <div>
                    <p className="text-xs italic md:text-gray-400/40">
                      Tu ultima coneccion
                    </p>
                    <span className="text-xs italic md:text-gray-400/40">
                      {formatLastLogin(user?.lastLogin)}
                    </span>
                  </div>
                  {/* selector de materias */}
                  {user?.materias && (
                    <div className="md:hidden">
                      <Selector
                        id={"materias"}
                        name={"Materia"}
                        options={user.materias || []}
                        label={"Materias"}
                        className={"text-slate-100"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-slate-50 uppercase md:text-slate-500 lg:text-slate-500 dark:md:text-slate-400">
              {titelPage}
            </h1>
          )}
        </div>
      </div>

      {user?.materias && (
        <div className="hidden p-3 md:flex">
          <Selector
            id={"materias"}
            name={"Materia"}
            options={user.materias || []}
            label={"Materias"}
          />
        </div>
      )}
    </section>
  );
}
