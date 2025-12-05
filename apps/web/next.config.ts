import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  // Configuración Multi-Zone: Esta es la aplicación principal (router central)
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';
    const docsUrl = process.env.DOCS_DOMAIN || 'http://localhost:3000';
    
    return [
      // Reescribir rutas de /docs a la zona de documentación
      {
        source: '/docs',
        destination: isProduction 
          ? `${docsUrl}/docs`
          : `${docsUrl}`,
      },
      {
        source: '/docs/:path*',
        destination: isProduction
          ? `${docsUrl}/docs/:path*`
          : `${docsUrl}/:path*`,
      },
      // Reescribir activos estáticos de la zona docs (usando assetPrefix)
      {
        source: '/docs-static/:path*',
        destination: `${docsUrl}/docs-static/:path*`,
      },
    ];
  },

  // Configuración para Server Actions en Multi-Zone
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
