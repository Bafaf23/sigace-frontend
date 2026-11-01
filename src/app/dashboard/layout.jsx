import NavbarSidebar from "@/components/organism/NabarSidebar";
import NavMovil from "@/components/organism/NavMovil";
import { AuthProvider } from "@/context/AuthContext";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

export const metadata = {
  titel: {
    template: "SchoPack | %s",
    default: "SchoPack",
  },
  description: "Sistema de control de Estudios para Liceos",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-1 gap-2 dark:bg-zinc-950">
        <NavbarSidebar />
        <div className="flex h-dvh  w-full flex-col pb-24 md:pb-0">
          <div className="flex h-full w-full flex-col overflow-y-auto scroll-smooth p-4">
            {children}
          </div>
          <NavMovil />
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className:
              "rounded-xl border border-slate-100 shadow-lg font-medium",
            duration: 4000,
          }}
        />
      </div>
    </AuthProvider>
  );
}
