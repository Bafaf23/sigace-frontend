import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: "SIGACE — Control de estudios inteligente",
  description:
    "Plataforma para inscripción, notas y reportes académicos en instituciones educativas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
