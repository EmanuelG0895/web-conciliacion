import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona principal con rewrites a docs
  async rewrites() {
    const docsUrl = process.env.DOCS_DOMAIN || 'http://localhost:3000';
    
    return [
      {
        source: '/docs',
        destination: `${docsUrl}/docs`,
      },
      {
        source: '/docs/:path*',
        destination: `${docsUrl}/docs/:path*`,
      },
    ];
  },
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
