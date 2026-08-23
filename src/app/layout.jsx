import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: "SchoPack — La escula en un solo paquete",
  description:
    "Plataforma para inscripción, notas y reportes académicos en instituciones educativas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex min-h-full flex-col font-sans antialiased text-slate-800 bg-zinc-100">
        {children}
      </body>
    </html>
  );
}
