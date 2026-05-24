import Icon from "../atom/Icon";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

/**
 * Pantalla de visualización para accesos denegados.
 * Se muestra cuando un usuario intenta acceder a una ruta que no corresponde a su role.
 * Generalmente se activa mediante un middleware o un guard de rutas.
 * @component
 * @returns {JSX.Element}
 */
const AccessDenied = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto backdrop-blur-sm dark:bg-slate-900/60">
      <div className="flex items-center justify-center gap-2 text-2xl text-orange-500">
        <Icon icon={faExclamationTriangle} />
        <h2 className="text-2xl font-semibold text-orange-500">
          Access denied
        </h2>
      </div>
      <p className="text-lg font-semibold text-red-600">
        Redireccionando... No tienes permiso para estar aquí.
      </p>
    </div>
  );
};

export default AccessDenied;
