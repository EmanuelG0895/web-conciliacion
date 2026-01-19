"use client";
import { type FC } from "react";
import { useTheme } from "../theme-provider/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: FC = () => {
  // 1. Acceder al tema actual y a la función de alternancia
  const { theme, toggleTheme } = useTheme(); 

  // 2. Determinar qué ícono mostrar basado en el tema actual
  // Si el tema es 'dark', mostramos el Sol (para cambiar a 'light').
  // Si el tema es 'light', mostramos la Luna (para cambiar a 'dark').
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      onClick={toggleTheme} // 3. Usar la función toggleTheme en el evento click
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <Icon className="w-5 h-5 text-foreground text-gs-text-dark dark:text-gs-text-light" />
    </button>
  );
};

export default ThemeToggle;