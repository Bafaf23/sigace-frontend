import Icon from "@/components/atom/Icon";
import SchoPackLogo from "@/components/atom/SchoPackLogo";
import {
  faLinkedin,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const DEVELOPER = {
  name: "Bryant Facenda",
  socials: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/bafaf03",
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
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-300 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Identidad y Lema */}
        <SchoPackLogo className="text-slate-900" />

        {/* Derechos de Autor */}
        <p className="text-center text-xs text-slate-600">
          Desarrollado por{" "}
          <span className="font-semibold text-slate-900">{DEVELOPER.name}</span>{" "}
          — Todos los derechos reservados © {new Date().getFullYear()}
        </p>

        <Link
          href={"/legal"}
          className="text-sm text-slate-800 hover:text-salte-600 hover:underline"
          target="_black"
        >
          Terminos y condiciones
        </Link>

        {/* Redes Sociales Dinámicas */}
        <div className="flex items-center gap-2">
          {DEVELOPER.socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all ${social.hoverBg}`}
            >
              <Icon icon={social.icon} className="text-xl" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
