"use client";

/**
 * Componente ItemProfile para el Sidebar/Navbar.
 * Maneja de forma segura los estados indefinidos o nulos de la sesión
 * del usuario para evitar errores fatales de "charAt" de undefined.
 * Soporta tanto la estructura de usuario directa { name, email } como la anidada { user: { name, email } }
 * Usa un enlace estándar de HTML para evitar problemas de resolución en entornos de empaquetado independientes.
 */
export default function ItemProfile({ user }) {
  // CORRECCIÓN DE COMPATIBILIDAD CON AUTHCONTEXT:
  // Si el objeto de sesión viene con la propiedad interna 'user' (ej: user.user.name),
  // extraemos la información de este subobjeto; de lo contrario, usamos el objeto principal.
  // Extraemos de manera segura los datos con optional chaining (?.) y valores por defecto (|| "")
  const name = user?.name || "";
  const lastName = user?.last_name || "";
  const role = user?.role || "Sin correo asignado";

  // Obtenemos las iniciales de forma segura evitando charAt de undefined
  const firstInitial = name ? name.charAt(0).toUpperCase() : "";
  const secondInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  const inicial = firstInitial + secondInitial || "U"; // "U" como inicial por defecto para "Usuario"

  // Si no hay datos de usuario cargados en absoluto, mostramos un diseño de carga (skeleton)
  if (!user) {
    return (
      <div className="w-full block p-2">
        <div className="flex items-center gap-3 p-2 rounded-lg animate-pulse bg-slate-50/50 border border-slate-100/50">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-2 bg-slate-200 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <a href="/dashboard/profile" className="w-full block p-2">
      <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-slate-100/60 cursor-pointer w-full">
        {/* Contenedor del Avatar circular con iniciales seguras */}
        <div className="w-10 h-10 shrink-0 rounded-full bg-cyan-500/70 text-white font-black text-sm flex items-center justify-center shadow-sm select-none uppercase">
          <span>{inicial}</span>
        </div>

        {/* Información textual de sesión del usuario */}
        <div className="flex flex-col min-w-0 flex-1 gap-0.5">
          <h1 className="text-sm font-bold text-slate-700 truncate uppercase tracking-wide">
            {name || lastName ? `${name} ${lastName}` : "Invitado"}
          </h1>
          <span className="text-xs text-slate-400 truncate max-w-[150px] font-medium">
            {role}
          </span>
        </div>
      </div>
    </a>
  );
}
