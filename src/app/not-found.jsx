import Icon from "@/components/atom/Icon";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata = {
  title: "Página no encontrada | SIGACE",
  description: "La página que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <Icon icon={faCompass} className="text-6xl text-cyan-600" />

        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase">
            Error 404
          </p>
          <h1 className="max-w-xl text-3xl font-bold text-slate-800 md:text-4xl">
            Parece que te has perdido
          </h1>
        </div>

        <p className="max-w-md text-slate-600">
          La página que estás buscando no existe, fue eliminada o cambió de
          dirección.
        </p>

        <Link
          href="/"
          className="rounded-xl bg-cyan-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-cyan-500"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
