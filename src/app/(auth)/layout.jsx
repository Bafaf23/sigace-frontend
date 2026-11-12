"use client";
import Button from "@/components/atom/Button";
import VersionTag from "@/components/atom/VersionTag";
import { RememberProvider } from "@/context/RememberContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <RememberProvider>
      <div className="min-h-dvh w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-black/30 dark:bg-transparent transition-colors z-10" />
        {/* Fondo para Modo Claro */}
        <Image
          src="/bg-light.jpeg"
          alt="Fondo Sigace"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 dark:hidden"
          fill
          priority
        />

        {/* Fondo para Modo Oscuro */}
        <Image
          src="/bg-dark.jpg"
          alt="Fondo Sigace Oscuro"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 hidden dark:block dark:brightness-50 dark:opacity-80"
          fill
          priority
        />
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 absolute w-full h-full z-20">
        <div className="flex-col justify-between h-full text-white lg:flex md:hidden hidden p-12">
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="font-bold text-xl tracking-wider cursor-pointer"
            >
              Ir a la pagina web
            </Link>
          </div>

          <div className="max-w-md space-y-3">
            <h1 className="text-3xl font-extrabold leading-tight">
              Gestión académica simple en un solo lugar
            </h1>
            <p className="text-white text-sm leading-relaxed dark:text-zinc-300">
              Consulta calificaciones y más desde un solo lugar.
            </p>
          </div>

          <p className="text-xs text-white/80 dark:text-zinc-400">
            © {new Date().getFullYear()} SIGACE. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex md:justify-center md:items-center w-full h-full">
          <section className="max-w-xl w-full bg-white border border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 md:p-16 p-10 md:rounded-3xl dark:shadow-2xl shadow-xl flex justify-center items-center">
            {children}
          </section>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          className:
            "rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-lg font-medium transition-colors",
          duration: 4000,
        }}
      />
    </RememberProvider>
  );
}
