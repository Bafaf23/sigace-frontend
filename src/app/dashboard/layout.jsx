import NavbarSidebar from "@/components/organism/NabarSidebar";
import NavMovil from "@/components/organism/NavMovil";
import { AuthProvider } from "@/context/AuthContext";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

export const metadata = {
  title: {
    template: "Sigace | %s",
    default: "Sigace - Gestión Académica",
  },
  description: "Sistema de control de Estudios para Liceos",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-1 gap-2 bg-gray-100 ">
        <NavbarSidebar />
        <div className="h-screen flex flex-col w-full">
          <main className="flex flex-col overflow-hidden overflow-y-auto scrolel-smooth h-full w-full">
            {children}
          </main>
          <NavMovil />
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </AuthProvider>
  );
}
