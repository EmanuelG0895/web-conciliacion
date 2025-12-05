import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración necesaria para AWS Amplify
  output: 'standalone',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración Multi-Zone: Esta es la aplicación principal (router central)
  async rewrites() {
    const docsUrl = process.env.DOCS_DOMAIN || 'http://localhost:3000';
    
    return [
      // Reescribir rutas de /docs a la zona de documentación
      {
        source: '/docs',
        destination: `${docsUrl}/docs`,
      },
      {
        source: '/docs/:path+',
        destination: `${docsUrl}/docs/:path+`,
      },
      // Reescribir activos estáticos de la zona docs (usando assetPrefix)
      {
        source: '/docs-static/:path+',
        destination: `${docsUrl}/docs-static/:path+`,
      },
    ];
  },
  
  // Configuración para Server Actions en Multi-Zone
  experimental: {
    serverActions: {
      allowedOrigins: process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',') 
        : ['localhost:3001', 'localhost:3000'],
    },
  },
};

export default nextConfig;
