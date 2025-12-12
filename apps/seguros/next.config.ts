// next.config.js de la Zona Secundaria (/seguros)

import type { NextConfig } from "next";

// Define el dominio público del Router Principal (la aplicación raíz)
const PUBLIC_HOST =
  process.env.NODE_ENV === "production"
    ? (process.env.SEGUROS_DOMAIN ?? "http://localhost:3000")
    : "http://localhost:3000";

const nextConfig: NextConfig = {
  // 1. Multi-Zone: assetPrefix ahora es una URL ABSOLUTA que apunta al Router Principal.
  // Esto obliga al navegador a no cambiar de host y usar el dominio del Router para los activos.
  assetPrefix: `${PUBLIC_HOST}/seguros-static`,

  // 2. Paso 3: Server Actions (solo si las usas)
  // Nota: Usa solo el dominio base aquí, no el prefijo.
  experimental: {
    serverActions: {
      allowedOrigins: [PUBLIC_HOST],
    },
  },

  // 3. Optimizaciones generales...
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
