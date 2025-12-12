import type { NextConfig } from "next";

// En producción esta variable debe apuntar a la URL pública de SEGUROS (Amplify)
const SEGUROS_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.SEGUROS_DOMAIN ?? "")
    : "http://localhost:3001"; // Puerto donde corre seguros en dev

// Validación opcional pero recomendada
if (process.env.NODE_ENV === "production" && !process.env.SEGUROS_DOMAIN) {
  throw new Error(
    "Falta la variable SEGUROS_DOMAIN para la zona secundaria (seguros)."
  );
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ✔️ 1. Reenvía los assets de la zona secundaria al servidor de seguros
      {
        source: "/seguros/_next/static/:path*",
        destination: `${SEGUROS_URL}/_next/static/:path*`,
      },

      // ✔️ 2. Reenvía las imágenes optimizadas (_next/image)
      {
        source: "/seguros/_next/image",
        destination: `${SEGUROS_URL}/_next/image`,
      },

      // ✔️ 3. Página raíz de la zona secundaria
      {
        source: "/seguros",
        destination: `${SEGUROS_URL}`,
      },

      // ✔️ 4. Todas las rutas internas de la zona secundaria
      {
        source: "/seguros/:path*",
        destination: `${SEGUROS_URL}/:path*`,
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
