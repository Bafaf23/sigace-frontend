"use client";
import Icon from "../atom/Icon";
import { menuLink } from "./NabarSidebar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMovil() {
  const { user } = useAuth();
  const pathname = usePathname();
  const currentLinks = menuLink[user?.user?.role || "Estudiante"] || [];
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around items-center gap-3 md:hidden lg:hidden">
      {currentLinks.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={`flex flex-col items-center justify-center ${pathname === link.href ? "text-indigo-500 bg-indigo-500/10 rounded-full p-2" : "text-gray-500"}`}
        >
          <Icon icon={link.icon} className="text-2xl" />
        </Link>
      ))}
    </nav>
  );
}
