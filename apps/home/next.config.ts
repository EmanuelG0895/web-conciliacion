import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona principal con rewrites a docs
  async rewrites() {
    // En desarrollo usa el puerto directo, en producción usa el dominio
    const docsUrl = process.env.SEGUROS_DOMAIN || 'http://localhost:3000';

    // FIX: Use a ternary operator to ensure docsPath is an empty string in development.
    const docsPath = process.env.NODE_ENV === 'production' ? '/seguros' : '';

    return [
      // REGLA NUEVA Y CRÍTICA: Reescribe los activos estáticos a la zona secundaria.
      // This rule looks faulty: it should likely point to the root zone, not static assets.
      // If 'seguros' is another Next.js app, its static assets path should be correct.
      {
        source: '/seguros/_next/static/:path*',
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