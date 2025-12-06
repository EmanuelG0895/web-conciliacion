import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La zona principal NO necesita assetPrefix
  
  // Configuración de rewrites para enrutar a otras zonas
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: `${process.env.DOCS_DOMAIN}/docs`,
      },
      {
        source: '/docs/:path+',
        destination: `${process.env.DOCS_DOMAIN}/docs/:path+`,
      },
      {
        source: '/docs-static/:path+',
        destination: `${process.env.DOCS_DOMAIN}/docs-static/:path+`,
      },
    ];
  },
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
