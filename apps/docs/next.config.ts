import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona secundaria para /docs
  // Solo usa basePath en producción, no en desarrollo
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '',
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
