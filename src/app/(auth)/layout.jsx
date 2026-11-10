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
      <div className="min-h-dvh overflow-hidden relative">
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
      <div className="grid md:grid-cols-2 grid-cols-1 absolute w-full h-full p-12 z-20">
        <div className="flex-col justify-between h-full text-white md:flex hidden ">
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
        <div className="flex justify-center items-center">
          <section className="max-w-md w-full bg-white dark:bg-zinc-700 p-12 rounded-2xl">
            {children}
          </section>
        </div>
      </div>
    </RememberProvider>
  );
}
