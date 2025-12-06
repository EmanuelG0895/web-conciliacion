import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona secundaria para /docs
  basePath: '/docs',
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
