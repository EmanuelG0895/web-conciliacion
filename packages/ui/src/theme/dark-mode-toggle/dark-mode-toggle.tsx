'use client';
import type { FC } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '../theme-provider/theme-provider';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      // He añadido 'transition-colors' y 'duration-200' para suavizar el cambio de color de fondo del botón
      className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;