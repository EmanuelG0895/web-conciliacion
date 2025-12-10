## 📘 Documentación Completa: Configuración de Paquetes en Turborepo

### Para agregar y configurar correctamente una nueva carpeta de paquete (módulo) dentro de su monorepo **Turborepo** para que sea consumida globalmente por sus aplicaciones (micro-frontends), debe seguir el protocolo de **Workspaces** (espacios de trabajo) del gestor de paquetes (como `pnpm` o `npm`) y configurar la gestión de tareas con `turbo.json`.

-----

### Paso I: Creación y Definición del Nuevo Paquete Interno

Debe tratar `packages/tuNuevaCarpeta` como un paquete independiente dentro del monorepo.

#### 1\. Crear el Archivo `package.json` del Nuevo Módulo

Debe crear un archivo `package.json` dentro de su nueva carpeta (`packages/tuNuevaCarpeta`). Este archivo le da al paquete un nombre único (convencionalmente usando el prefijo `@repo`) y define sus puntos de entrada.

| Archivo            | Ruta Esperada (Creación)                                   |
| :----------------- | :--------------------------------------------------------- |
| **`package.json`** | `<Raíz_del_Proyecto>/packages/tuNuevaCarpeta/package.json` |

**Contenido clave:**

Debe definir el nombre del paquete para que las aplicaciones puedan referenciarlo (ej. `"@repo/tuNuevaCarpeta"`), y especificar dónde se encuentra su código fuente (`main` y `types`).

```json
{
  "name": "@repo/tuNuevaCarpeta",
  "version": "0.0.0",
  "main": "./src/index.ts", // Define el punto de entrada principal
  "types": "./src/index.ts", // Define el punto de entrada de tipos (si usa TypeScript)
  "license": "MIT",
  "scripts": {
    "build": "echo 'Compilando tuNuevaCarpeta'"
  },
  "dependencies": {
    // Agregue aquí cualquier dependencia que este paquete necesite.
  }
}
```

#### 2\. Crear el Punto de Entrada del Código Compartido

Cree el archivo de índice (o el archivo principal) donde se exportará toda la lógica o los componentes que desea compartir.

| Archivo        | Ruta Esperada (Creación)                                   | Propósito                                  |
| :------------- | :--------------------------------------------------------- | :----------------------------------------- |
| **`index.ts`** | `<Raíz_del_Proyecto>/packages/tuNuevaCarpeta/src/index.ts` | Contiene la lógica exportable del paquete. |

-----

### Paso II: Configuración del Monorepo (Nivel Raíz)

Debe informar a su gestor de paquetes (`pnpm`) y a Turborepo sobre la existencia del nuevo paquete para que pueda ser reconocido y enlazado con el comando `pnpm install`.

#### 3\. Actualizar la Definición de Workspaces (Espacios de Trabajo)

Debe asegurarse de que la carpeta `packages/` esté definida como un espacio de trabajo en el archivo `pnpm-workspace.yaml` en la raíz del proyecto.

| Archivo                   | Ruta Esperada (Modificación)              |
| :------------------------ | :---------------------------------------- |
| **`pnpm-workspace.yaml`** | `<Raíz_del_Proyecto>/pnpm-workspace.yaml` |

**Ejemplo de Código (`pnpm-workspace.yaml`):**

```yaml
packages:
  - "apps/*"
  - "packages/*" # Esta línea es esencial para incluir su carpeta 'tuNuevaCarpeta'
```

#### 4\. Configurar Tareas en `turbo.json`

Debe asegurarse de que Turborepo sepa cómo manejar y, lo que es más importante, **cómo cachear** las tareas relacionadas con su nuevo paquete. Si el paquete `@repo/tuNuevaCarpeta` necesita ser construido antes que las aplicaciones que lo consumen, debe incluirlo en la tarea `build` del archivo `turbo.json` en la raíz.

| Archivo          | Ruta Esperada (Modificación)     |
| :--------------- | :------------------------------- |
| **`turbo.json`** | `<Raíz_del_Proyecto>/turbo.json` |

**Extracto de Código (`turbo.json`):**

Asegúrese de que la tarea de compilación de las aplicaciones (`^build`) dependa de la compilación de todos los paquetes internos.

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"], // Depende de la compilación de todos los paquetes internos
      "outputs": ["dist/**"] // Si su paquete emite archivos de compilación en 'dist'
    }
    // ... otras tareas
  }
}
```

-----

### Paso III: Configuración del Tipado Global de TypeScript

Este paso es **crítico** para evitar el error `Cannot find module` y debe realizarse en el archivo base que todas sus configuraciones de TypeScript heredan (generalmente `base.json`).

#### 5\. Agregar Mapeo de Workspaces a `base.json` (Solución TS)

Debe agregar las propiedades **`baseUrl`** y **`paths`** al archivo más base de su jerarquía (asumiendo que es `base.json`), dentro de **`compilerOptions`**.

| Archivo          | Ruta Esperada (Modificación)                               |
| :--------------- | :--------------------------------------------------------- |
| **`base.json`**  | `<Raíz_del_Proyecto>/packages/typescript-config/base.json` |

**Contenido Corregido y Completo (`base.json`):**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    // ... otras configuraciones existentes ...
    
    // ⚠️ CRUCIAL: Necesario para que paths funcione
    "baseUrl": ".", 
    
    // 🚀 La definición global de alias para el monorepo
    "paths": {
      // 💡 Agregar aquí el nuevo paquete
      "@repo/tuNuevaCarpeta": [
        "../tuNuevaCarpeta/src/index.ts" 
      ],
      // Y los paquetes existentes (ej. @repo/providers, @repo/ui)
      "@repo/providers": [
        "../providers/src/index.ts" 
      ],
      "@repo/ui": [
        "../ui/src/index.ts" 
      ]
    },

    // ... otras configuraciones existentes ...
  }
}
```

-----

### Paso IV: Habilitar Acceso Local y Global

Finalmente, debe declarar que sus aplicaciones consumirán este nuevo paquete y forzar la actualización de los enlaces.

#### 6\. Agregar el Paquete como Dependencia Local

En el archivo `package.json` de cada aplicación (o paquete interno) que necesite acceder a su lógica compartida, agregue `@repo/tuNuevaCarpeta` a la sección `dependencies`.

| Archivo                             | Ruta Esperada (Modificación)                               |
| :---------------------------------- | :--------------------------------------------------------- |
| **`package.json` de la aplicación** | `<Raíz_del_Proyecto>/apps/<nombre_de_la_app>/package.json` |

**Ejemplo de Código (Extracto de `apps/web/package.json`):**

```json
{
  "name": "web",
  "dependencies": {
    "next": "...",
    "react": "...",
    "@repo/tuNuevaCarpeta": "workspace:*" // Referencia al nuevo paquete interno
    // ... otras dependencias
  }
}
```

#### 7\. Instalar y Enlazar el Nuevo Paquete

Ejecute el comando de instalación de su gestor de paquetes desde la raíz de su monorepo:

```bash
pnpm install
```

Este comando:

1.  Actualiza los enlaces de *workspace* para su nuevo paquete.
2.  Ahora, sus micro-frontends pueden importar y utilizar la lógica compartida, y TypeScript podrá resolver la ruta gracias a la configuración en `base.json`.

<!-- end list -->

```typescript
import { miProviderExportado } from "@repo/tuNuevaCarpeta";
// ... usar miProviderExportado en la aplicación
```