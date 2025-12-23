1  Crea la nueva carpeta que contendrá el micro frontend esta carpeta debe ir dentro de la carpeta apps.

2 Agrega los archivos base para el funcionamiento de la nueva zona, puedes utilizar el siguiente ejemplo.

apps/
└── [nombre-nueva-zona]/     # ej: "inventario", etc.
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── eslint.config.js
    ├── postcss.config.js
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    └── public/
        └── redirects.json

3 Configura los archivos 

3.1 Configurar package.json
  Copiar estructura desde package.json o package.json
  Cambiar el nombre del package
  Asignar un puerto único (ej: 3002, 3003, etc.)
  Configurar scripts de dev, build, lint y check-types

3.2 Configurar next.config.ts
  Decidir si será zona principal (router) o zona secundaria
  Si es zona secundaria: configurar assetPrefix apuntando a la zona principal
  Si es zona principal: configurar rewrites para dirigir a otras zonas
  Configurar variables de entorno necesarias
  Configurar allowedOrigins para Server Actions

3.3 Configurar TypeScript y ESLint
  Copiar y adaptar tsconfig.json desde otra app
  Copiar y adaptar eslint.config.js
  Copiar postcss.config.js para Tailwind CSS

3.4 Actualizar Workspace del Monorepo (en la raíz del proyecto)
  Verificar que pnpm-workspace.yaml incluya apps/*.
  Agrega las nuevas variables de entorno que utilizaras en el archivo turbo.json, asegúrate de agregarlas en "env", a continuación un ejemplo de donde deberías agregarlo
{
  "tasks": {
    "build": {
      "env": [
        "NODE_ENV",
        "SEGUROS_DOMAIN",
        "ALLOWED_ORIGINS",
        "HOME_DOMAIN",
        "[TUNUEVAZONA_DOMAIN]"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "env": [
        "NODE_ENV",
        "DOCS_DOMAIN",
        "[TUNUEVAZONA_DOMAIN]",
        "ALLOWED_ORIGINS"
      ]
    }
  }
}

4 Actualizar Amplify.yml
  Agregar nueva aplicación en el archivo amplify.yml
  Configurar comandos de build específicos
  Configurar variables de entorno para producción
  Configurar rutas de cache y artifacts
  Puedes copiar y pegar las configuraciones de la sección anterior.
  Asegúrate de cambiar el nombre con tu nueva zona

5 Configurar Navegación Multi-Zone
  Zona principal(Home): agregar rewrites en next.config.ts
  Zona secundaria: configurar assetPrefix correcto
  Navegación: usar <a> tags en lugar de <Link> para rutas entre zonas 