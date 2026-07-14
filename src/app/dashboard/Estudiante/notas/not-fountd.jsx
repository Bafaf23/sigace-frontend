import Icon from "@/components/atoms/Icon";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata = {
  title: "Página no encontrada | SIGACE",
  description: "La página que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <Header />
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <Icon icon={faHammer} className="text-cyan-600 text-2xl" />
        <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase">
          Construcción en proceso
        </p>
        <h1 className="max-w-xl text-3xl font-bold text-slate-800 md:text-4xl">
          En breve estará disponible, no te preocupes.
        </h1>
        <p className="max-w-md text-slate-600">
          Estamos trabajando en el sistema más moderno para tu institución,
          pronto lo tendrás disponible.
          <br />
          <span className="text-cyan-600">
            Haz clik en el boton de registro para registrar tu institución
          </span>
        </p>
        <Link
          href="/"
          className="rounded-xl bg-cyan-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-cyan-500"
        >
          Volver al inicio
        </Link>
      </section>
      <Footer />
    </main>
  );
}
