import Profile from "../atom/Profile";
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

export default function HeaderDashbord({ user, nameI }) {
  return (
    <section className="flex w-full justify-end md:flex-row md:justify-between md:items-center bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 p-4 rounded-3xl shadow gap-1">
      {nameI && (
        <h3 className="text-zinc-900 dark:text-zinc-200 font-extrabold uppercase text-2xl hidden md:block">
          {nameI}
        </h3>
      )}
      <Profile user={user?.user} />
    </section>
  );
}
