import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const getAssetPrefix = () => {
  if (isDevelopment) return '/docs-static';
  if (isProduction) return '/docs';
  return undefined;
};

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración Multi-Zone: Esta es una zona secundaria
  basePath: isProduction ? '/docs' : undefined,
  assetPrefix: getAssetPrefix(),
  
  // Configuración para Server Actions en Multi-Zone
  experimental: {
    serverActions: {
      allowedOrigins: process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',') 
        : ['localhost:3001', 'localhost:3000'],
    },
  },
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
