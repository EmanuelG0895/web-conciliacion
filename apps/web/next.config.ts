import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La zona principal NO necesita assetPrefix
  
  // Configuración de rewrites para enrutar a otras zonas
  async rewrites() {
    const docsUrl = process.env.DOCS_DOMAIN || 'http://localhost:3000';
    
    return [
      {
        source: '/docs',
        destination: `${docsUrl}/docs`,
      },
      {
        source: '/docs/:path+',
        destination: `${docsUrl}/docs/:path+`,
      },
      {
        source: '/docs-static/:path+',
        destination: `${docsUrl}/docs-static/:path+`,
      },
    ];
  },
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
