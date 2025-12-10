import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona principal con rewrites a docs
  rewrites() {
    // En desarrollo usa el puerto directo, en producción usa el dominio
    const docsUrl = process.env.SEGUROS_DOMAIN || 'http://localhost:3000';
    const docsPath = process.env.NODE_ENV === 'production' && '/seguros';
    return [
      // REGLA NUEVA Y CRÍTICA: Reescribe los activos estáticos a la zona secundaria.
      {
        source: '/seguros/:path*',
        destination: `${docsUrl}/_next/static/:path*`,
      },
      // Reglas existentes para las páginas
      {
        source: '/seguros',
        destination: `${docsUrl}${docsPath}`,
      },
      {
        source: '/seguros/:path*',
        destination: `${docsUrl}${docsPath}/:path*`,
      },
    ];
  },

  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
