import type { NextConfig } from "next";

// En producción, apuntará al dominio público de SEGUROS
const SEGUROS_URL =
  process.env.NODE_ENV === "production"
    ? process.env.SEGUROS_DOMAIN
    : "http://localhost:3001"; // Puerto donde corre SEGUROS en dev

const BACKOFFICE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BACKOFFICE_DOMAIN
    : "http://localhost:3002"; // Puerto donde corre BACKOFFICE en dev

// Validación obligatoria en producción
if (process.env.NODE_ENV === "production" && !process.env.SEGUROS_DOMAIN) {
  throw new Error(
    "Falta la variable SEGUROS_DOMAIN para la zona secundaria (seguros)."
  );
}
// Validación obligatoria en producción
if (process.env.NODE_ENV === "production" && !process.env.BACKOFFICE_DOMAIN) {
  throw new Error(
    "Falta la variable BACKOFFICE_DOMAIN para la zona secundaria (backoffice)."
  );
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ➤ 1. Assets estáticos (CSS, JS)
      {
        source: "/seguros/_next/static/:path*",
        destination: `${SEGUROS_URL}/_next/static/:path*`,
      },

      // ➤ 2. Imágenes optimizadas
      {
        source: "/seguros/_next/image",
        destination: `${SEGUROS_URL}/_next/image`,
      },

      // ➤ 3. Página principal de SEGUROS
      {
        source: "/seguros",
        destination: `${SEGUROS_URL}`,
      },

      // ➤ 4. Todas las rutas internas de SEGUROS
      {
        source: "/seguros/:path*",
        destination: `${SEGUROS_URL}/:path*`,
      },
      // ➤ 1. Assets estáticos (CSS, JS)
      {
        source: "/backoffice/_next/static/:path*",
        destination: `${BACKOFFICE_URL}/_next/static/:path*`,
      },

      // ➤ 2. Imágenes optimizadas
      {
        source: "/backoffice/_next/image",
        destination: `${BACKOFFICE_URL}/_next/image`,
      },

      // ➤ 3. Página principal de BACKOFFICE
      {
        source: "/backoffice",
        destination: `${BACKOFFICE_URL}`,
      },

      // ➤ 4. Todas las rutas internas de SEGUROS
      {
        source: "/backoffice/:path*",
        destination: `${BACKOFFICE_URL}/:path*`,
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
