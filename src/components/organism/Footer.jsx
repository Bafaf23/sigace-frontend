import Icon from "@/components/atom/Icon";
import SchoPackLogo from "@/components/atom/Logo";
import {
  faLinkedin,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLocation, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/sigace.ed",
    icon: faInstagram,
    hoverBg: "hover:bg-pink-500/20 hover:text-pink-600",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bryant-facenda-a078ab279/",
    icon: faLinkedin,
    hoverBg: "hover:bg-sky-500/20 hover:text-sky-600",
  },
  {
    name: "WhatsApp",
    url: "https://w.app/p945hj",
    icon: faWhatsapp,
    hoverBg: "hover:bg-emerald-500/20 hover:text-emerald-600",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-200 dark:bg-zinc-950 text-slate-800 dark:text-zinc-300 px-6 py-10 rounded-t-3xl border-t border-zinc-300 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* Sección Superior: Logo y Enlaces */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Identidad y Lema */}
          <div className="flex flex-col gap-3 max-w-sm">
            <SchoPackLogo className="text-slate-900 dark:text-zinc-100" />
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Sistema de Gestión Académica y Control de Estudios.
            </p>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              <Icon icon={faLocationArrow} /> El hatillo, Miranda Venezuela.
            </p>
          </div>

          {/* Columnas de Navegación */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
            {/* Columna: Plataforma */}
            <div className="flex flex-col gap-2.5">
              <h2 className="text-slate-900 dark:text-zinc-100 font-semibold text-sm uppercase tracking-wider">
                Plataforma
              </h2>
              <Link
                href="/"
                className="text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                Inicio
              </Link>
              <h2 className="text-slate-900 dark:text-zinc-100 font-semibold text-sm uppercase tracking-wider">
                Soporte
              </h2>
              <Link
                href="mailto:bryantffacen@gmail.com"
                className="text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                bryantffacen@gmail.com
              </Link>
            </div>

            {/* Columna: Legal */}
            <div className="flex flex-col gap-2.5">
              <h2 className="text-slate-900 dark:text-zinc-100 font-semibold text-sm uppercase tracking-wider">
                Legal
              </h2>
              <Link
                href="/legal"
                className="text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                Aviso legal
              </Link>
              <Link
                href="/legal"
                className="text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                Términos y condiciones
              </Link>
              <Link
                href="/legal"
                className="text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>

        {/* Sección Inferior: Copyright */}
        <div className="pt-6 border-t border-zinc-300 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-zinc-100 text-base">
              SIGACE
            </span>
            <span>© {currentYear}. Todos los derechos reservados.</span>
            <div className="space-x-1">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_black"
                  className={`text-lg p-1 rounded-2xl ${social.hoverBg}`}
                >
                  <Icon icon={social.icon} />
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs">
            Desarrollado por {""}
            <Link
              href="https://www.instagram.com/bafaf03/"
              className="font-bold dark:text-zinc-100 text-zinc-900 hover:underline"
            >
              Bryant Facenda
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
