// next.config.js de la Zona Secundaria (/seguros)

import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.SEGUROS_DOMAIN) {
  throw new Error("Falta la variable SEGUROS_DOMAIN en producción");
}

// Define el dominio público del Router Principal (la aplicación raíz)
const PUBLIC_HOST =
  process.env.NODE_ENV === "production"
    ? (process.env.SEGUROS_DOMAIN ?? "")
    : "http://localhost:3000";

const nextConfig: NextConfig = {
  // Multi-Zone: Next debe buscar los assets en el dominio del Home (solo en desarrollo)
  // ...(process.env.NODE_ENV === "development" && {
  //   assetPrefix: `${PUBLIC_HOST}/seguros`,
  // }),

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
