import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

export const metadata = {
  title: {
    template: "SIGACE | %s",
    default: "Sigace - Gestión Escolar",
  },
  description: "Sistema de control de Estudios para Liceos",
};

export default function RootLayout({ children }) {
  return (
    <div className="bg-gray-100 transition dark:bg-slate-800">
      <main className="flex min-h-screen items-center justify-center">
        {children}
      </main>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "rounded-xl border border-slate-100 shadow-lg font-medium",
          duration: 4000,
        }}
      />
    </div>
  );
}
