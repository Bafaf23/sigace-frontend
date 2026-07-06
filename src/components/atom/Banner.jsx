import Icon from "./Icon";
/**
 * Banner Informativo, soporta iconos dinamicos
 * @param {object} param0
 * @param {string} param0.titel
 * @param {string} param0.message
 * @param {string} param0.icon
 * @returns
 */
export default function Banner({ titel, message, icon }) {
  return (
    <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 flex items-start gap-3  shadow-sm">
      <div className="flex p-2 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-lg shrink-0 mt-0.5">
        <Icon icon={icon} className="w-4 h-4 text-xs" />
      </div>

      <div className="space-y-0.5">
        <h2 className="text-sm font-bold text-cyan-950 dark:text-cyan-200">
          {titel}
        </h2>
        <p className="text-xs text-cyan-700/90 dark:text-cyan-400/80 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
