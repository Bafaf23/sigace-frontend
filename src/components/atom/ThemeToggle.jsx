"use client";

import Button from "./Button";
import { useTheme } from "@/context/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

/**
 * Toggle para alternar entre modo claro y oscuro.
 *
 * @returns {JSX.Element}
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div>
      <Button
        icon={faMoon}
        onClick={toggleTheme}
        aria-label="Cambiar a modo oscuro"
        classNameBtn={`rounded-full transition-all focus:outline-none w-10 transition-all duration-200 ${
          !isLight
            ? "rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
            : "hidden"
        }`}
      />
      <Button
        icon={faSun}
        onClick={toggleTheme}
        aria-label="Cambiar a modo claro"
        classNameBtn={`rounded-full transition-all focus:outline-none w-10 transition-all duration-200 ${
          isLight
            ? "rounded-full bg-amber-500/20 text-amber-500  border border-amber-200/80"
            : "hidden"
        }`}
      />
    </div>
  );
}
