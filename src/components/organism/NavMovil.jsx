"use client";

import Icon from "../atom/Icon";
import { menuLink } from "./NabarSidebar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMovil() {
  const { user } = useAuth();
  const pathname = usePathname();

  const rawRole = user?.user?.role || user?.role;
  const role = rawRole === "director" ? "administrador" : rawRole;

  const currentLinks = menuLink[role] || [];

  if (!user || currentLinks.length === 0) {
    return null;
  }

  return (
  
    <nav className="fixed bottom-0 left-0 w-full z-50 p-2 md:hidden">
      <div className="flex items-center justify-around gap-1 rounded-2xl border border-zinc-200 bg-white/90 p-2 backdrop-blur-md shadow-lg dark:border-zinc-800 dark:bg-zinc-900/90">
        {currentLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              href={link.href}
              key={link.href || index}
              className={`flex flex-1 flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? "bg-orange-500/10 font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <Icon icon={link.icon} className="text-xl" />
              {link.label && (
                <span className="mt-0.5 text-[10px] whitespace-nowrap">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
