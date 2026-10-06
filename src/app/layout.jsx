import { ThemeProvider } from "@/context/ThemeProvider";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: "SIGACE | a un click",
  description:
    "Plataforma para inscripción, notas y reportes académicos en instituciones educativas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-zinc-100 dark:bg-zinc-900 antialiased">
        <ThemeProvider>
          <main className="flex min-h-dvh flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
