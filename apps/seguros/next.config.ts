// next.config.js de la Zona Secundaria (/seguros)

import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.HOME_DOMAIN) {
  throw new Error("Falta la variable HOME_DOMAIN en producción");
}

// Define el dominio público del Router Principal (la aplicación HOME, no SEGUROS)
const PUBLIC_HOST =
  process.env.NODE_ENV === "production"
    ? (process.env.HOME_DOMAIN ?? "")
    : "http://localhost:3001";

const nextConfig: NextConfig = {
  // Multi-Zone: Next debe buscar los assets en el dominio del Home (siempre)
  assetPrefix: `${PUBLIC_HOST}/seguros`,

  experimental: {
    serverActions: {
      allowedOrigins: [PUBLIC_HOST],
    },
  },

  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
