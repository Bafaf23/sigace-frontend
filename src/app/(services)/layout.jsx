import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <section className="flex flex-col flex-1 items-center justify-center min-h-screen p-4 gap-6">
      {children}
      {/* Footer / Enlace secundario */}
      <Link
        href="/legal"
        className="text-sm text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors underline-offset-4 hover:underline"
      >
        Términos y Condiciones
      </Link>

      {/* Configuración de Notificaciones */}
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          className:
            "rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-lg font-medium transition-colors",
          duration: 4000,
        }}
      />
    </section>
  );
}
