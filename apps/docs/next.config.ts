import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración Multi-Zone: Esta es una zona secundaria
  // El assetPrefix asegura que los activos no entren en conflicto con otras zonas
  assetPrefix: '/docs-static',
  
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
