# Configuración Multi-Zone para AWS Amplify

Este proyecto utiliza una arquitectura **Multi-Zone Next.js** con Turborepo y pnpm.

## 📋 Estructura de Zonas

- **`apps/web`** - Zona principal (puerto 3001) - Actúa como router central
- **`apps/docs`** - Zona secundaria (puerto 3000) - Documentación con `assetPrefix: '/docs-static'`

## 🚀 Configuración para Desarrollo

1. **Copiar archivos de variables de entorno:**
   ```bash
   # En la raíz del proyecto
   cp .env.example .env.local
   
   # En cada aplicación
   cp apps/web/.env.local.example apps/web/.env.local
   cp apps/docs/.env.local.example apps/docs/.env.local
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   # Ejecutar ambas apps en paralelo
   pnpm dev
   
   # O ejecutar individualmente
   cd apps/web && pnpm dev   # http://localhost:3001
   cd apps/docs && pnpm dev  # http://localhost:3000
   ```

## 🌐 Configuración Multi-Zone

### Zona Principal (apps/web)
La aplicación `web` actúa como router central y maneja:
- Rutas raíz: `/`, `/about`, etc.
- Reescribe rutas `/docs/*` hacia la aplicación docs
- Configuración de rewrites en `next.config.ts`

### Zona Secundaria (apps/docs)
La aplicación `docs` maneja:
- Rutas de documentación: `/docs`, `/docs/*`
- `assetPrefix: '/docs-static'` para evitar conflictos de activos
- Activos servidos en `/docs-static/_next/...`

## ☁️ Despliegue en AWS Amplify

### Configuración Requerida

1. **Crear dos aplicaciones separadas en Amplify:**
   - **App 1**: `web` (aplicación principal)
   - **App 2**: `docs` (aplicación de documentación)

2. **Configurar variables de entorno en Amplify:**

   **Para la app `web`:**
   ```
   DOCS_DOMAIN=https://docs.tu-dominio.amplifyapp.com
   ALLOWED_ORIGINS=tu-dominio.amplifyapp.com,docs.tu-dominio.amplifyapp.com
   ```

   **Para la app `docs`:**
   ```
   ALLOWED_ORIGINS=tu-dominio.amplifyapp.com,docs.tu-dominio.amplifyapp.com
   ```

3. **Archivo de configuración:**
   - Usa el archivo `amplify.yml` en la raíz del proyecto
   - Actualiza las URLs de dominio en las variables de entorno

### Importante: Navegación entre Zonas

⚠️ Para navegar entre zonas diferentes, usa `<a>` en lugar de `<Link>`:

```tsx
// ❌ NO usar Link de Next.js para rutas en otras zonas
import Link from 'next/link';
<Link href="/docs">Docs</Link>

// ✅ Usar etiqueta <a> estándar
<a href="/docs">Docs</a>
```

Esto evita problemas con la precarga y la navegación suave entre aplicaciones separadas.

## 📝 Notas Importantes

- **Server Actions**: Configuradas en ambas zonas con `allowedOrigins`
- **Asset Prefix**: Solo en la zona secundaria (`docs`) para evitar conflictos
- **Cache**: Configurado para `.next/cache` y `.pnpm-store` en Amplify
- **Build**: Usa Turbo con filtros específicos para cada app

## 🔧 Troubleshooting

### Error: "Server Actions are not allowed from this origin"
- Verifica que `ALLOWED_ORIGINS` incluya todos tus dominios
- En producción, usa solo el dominio sin protocolo: `tu-dominio.com`

### Activos 404 en producción
- Verifica que `assetPrefix` en docs coincida con las rewrites en web
- Debe ser `/docs-static` en ambos lugares

### Build falla en Amplify
- Verifica que `pnpm-lock.yaml` esté comprometido en el repo
- Usa `--frozen-lockfile` en el comando de instalación
