import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración Multi-Zone: zona secundaria
  basePath: '/docs',
  assetPrefix: '/docs-static',
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
