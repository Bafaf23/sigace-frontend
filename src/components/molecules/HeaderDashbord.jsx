import Selector from "../atom/Selector";
import Link from "next/link";

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
      <div className="w-full px-4 py-2 text-slate-500">
        <div className="flex w-full items-center justify-between gap-2">
          {user ? (
            <div className="flex flex-col justify-between w-full">
              <div className="flex items-center gap-2">
                <Link href="/dashboard/profile">
                  <div className="w-10 h-10 p-2 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600">
                    <span className="text-xl font-bold text-white">
                      {user?.user.name.charAt(0)}
                      {user?.user.last_name.charAt(0)}
                    </span>
                  </div>
                </Link>
                <div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <h1 className="text-2xl font-bold text-slate-400 md:text-3xl md:text-indigo-700 dark:text-slate-600">
                        Hola,
                      </h1>
                      <span className="text-2xl font-bold text-slate-600 normal-case md:text-3xl md:text-indigo-700 dark:text-slate-600">
                        {user?.user.name} {user?.user.last_name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-500 dark:text-slate-500">
                      Bienvenido a tu panel de control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-bold uppercase md:text-3xl">
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
