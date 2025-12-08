import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-Zone: Zona principal con rewrites a docs
  async rewrites() {
    // En desarrollo usa el puerto directo, en producción usa el dominio
    const docsUrl = process.env.DOCS_DOMAIN || 'http://localhost:3000';
    const docsPath = process.env.NODE_ENV === 'production' ? '/docs' : '';
    console.log('Rewriting /docs to:', `${docsUrl}${docsPath}`);
    return [
      {
        source: '/docs',
        destination: `${docsUrl}${docsPath}`,
      },
      {
        source: '/docs/:path*',
        destination: `${docsUrl}${docsPath}/:path*`,
      },
    ];
  },

  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
