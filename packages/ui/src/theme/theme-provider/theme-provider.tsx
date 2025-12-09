'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { setCookie } from 'cookies-next';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_COOKIE_NAME = 'theme';
const BROADCAST_CHANNEL = 'theme-channel';

/**
 * Hook para acceder al tema.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

/**
 * Proveedor de tema que inicializa su estado con el valor del SSR (leído de la cookie).
 */
export default function ThemeProvider({
  children,
  initialTheme,
}: {
  readonly children: React.ReactNode;
  readonly initialTheme: Theme; // Recibido del Server Component
}) {
  // Inicializar el estado con el valor exacto que el servidor ya renderizó
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  // Función para aplicar el tema al DOM y guardar la cookie
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;

    // 1. Aplicar clase/atributo al DOM inmediatamente (para reflejar el cambio visual)
    root.dataset.theme = newTheme;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // 2. Guardar la preferencia en una cookie para que el servidor la lea en la próxima solicitud
    setCookie(THEME_COOKIE_NAME, newTheme, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 año
    });
  }, []);

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      applyTheme(newTheme);
      setTheme(newTheme);

      // Notificar a otras apps/tabs (sincronización)
      channel?.postMessage({ type: 'theme-change', theme: newTheme });
    },
    [applyTheme, channel],
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  }, [theme, updateTheme]);

  // Efecto para inicializar BroadcastChannel (sincronización entre pestañas)
  useEffect(() => {
    if (typeof globalThis !== 'undefined' && 'BroadcastChannel' in globalThis) {
      const bc = new BroadcastChannel(BROADCAST_CHANNEL);
      setChannel(bc);

      bc.onmessage = (event) => {
        if (event.data.type === 'theme-change' && event.data.theme !== theme) {
          applyTheme(event.data.theme);
          setTheme(event.data.theme);
        }
      };
    }
  }, [theme, applyTheme]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, setTheme: updateTheme }),
    [theme, toggleTheme, updateTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
