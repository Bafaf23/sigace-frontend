import NavbarSidebar from "@/components/organism/NabarSidebar";
import { AuthProvider } from "@/context/AuthContext";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: {
    template: "Sigace | %s",
    default: "Sigace - Gestión Académica",
  },
  description: "Sistema de Controle de Estudios para Liceos",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <div className="flex flex-1 gap-2">
          <NavbarSidebar />
          <main className="flex h-screen flex-1 flex-col overflow-hidden overflow-y-auto scrolel-smooth">
            {children}
          </main>
        </div>
      </AuthProvider>
    </>
  );
}
