# Guía Completa de Despliegue en AWS Amplify - Turborepo Monorepo

## 📋 Resumen
Documentación paso a paso de cómo configurar y desplegar exitosamente un proyecto **Turborepo monorepo** con múltiples aplicaciones Next.js en AWS Amplify.

---

## 🔧 ARCHIVOS MODIFICADOS Y RAZONES

### 1. `amplify.yml` - Configuración de Build
**Ubicación:** Raíz del proyecto `/amplify.yml`

**Cambios Realizados:**
```yaml
version: 1

applications:
  # Zona Principal: WEB
  - appRoot: apps/web
    env:
      variables:
        NODE_ENV: production
    frontend:
      phases:
        preBuild:
          commands:
            - npm install -g pnpm@10.19.0
            - cd ../../ && pnpm install && cd apps/web
        build:
          commands:
            - cd ../../ && pnpm turbo run build --filter=web
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - ../../node_modules/**/*
          - .next/cache/**/*

  # Zona Secundaria: DOCS
  - appRoot: apps/docs
    env:
      variables:
        NODE_ENV: production
    frontend:
      phases:
        preBuild:
          commands:
            - npm install -g pnpm@10.19.0
            - cd ../../ && pnpm install && cd apps/docs
        build:
          commands:
            - cd ../../ && pnpm turbo run build --filter=docs
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - ../../node_modules/**/*
          - .next/cache/**/*
```

**¿Por qué estos cambios?**

1. **`appRoot: apps/web` y `appRoot: apps/docs`**
   - Define el directorio raíz de cada aplicación en el monorepo
   - AWS Amplify ejecuta los comandos desde este directorio

2. **`cd ../../ && pnpm install && cd apps/web`**
   - **Problema Original**: Cuando `appRoot` está configurado, Amplify ejecuta comandos desde `apps/web` o `apps/docs`
   - **Solución**: Navegamos a la raíz del proyecto (`../../`) para ejecutar `pnpm install` en todo el monorepo
   - El `&& cd apps/web` al final vuelve al directorio correcto para que Amplify sepa dónde estamos

3. **`cd ../../ && pnpm turbo run build --filter=web`**
   - Ejecutamos Turbo desde la raíz del proyecto
   - `--filter=web` asegura que solo se compile la app específica
   - Turbo maneja automáticamente las dependencias entre paquetes

4. **`baseDirectory: .next`**
   - Next.js genera los archivos compilados en `.next`
   - Es relativo al `appRoot`, por lo que apunta a `apps/web/.next`

5. **Cache paths: `../../node_modules/**/*`**
   - Cachea los node_modules de la raíz del proyecto
   - Acelera builds futuros significativamente

**Errores Previos Solucionados:**
- ❌ `pnpm exec turbo` → ✅ `pnpm turbo` (más directo)
- ❌ `cd ../..` → ✅ `cd ../../ && ... && cd apps/web` (asegura contexto correcto)
- ❌ `npx pnpm install` → ✅ `npm install -g pnpm` + `pnpm install` (pnpm global disponible)

---

## 🚀 PASOS DETALLADOS PARA EL DESPLIEGUE

### PASO 1: Configurar el Repositorio Local
```bash
# 1. Asegúrate de estar en la raíz del proyecto
cd limpieza-proyecto

# 2. Verifica que el archivo amplify.yml esté en la raíz
ls amplify.yml

# 3. Confirma que los cambios estén guardados
git add amplify.yml
git commit -m "fix: correct relative paths for monorepo build"
git push origin main
```

---

### PASO 2: Crear la Aplicación en AWS Amplify

#### 2.1. Acceder a AWS Amplify Console
1. Inicia sesión en **AWS Console**
2. Busca y selecciona **AWS Amplify**
3. Haz clic en **"Get Started"** o **"Create new app"**

#### 2.2. Conectar el Repositorio
1. Selecciona **"GitHub"** como proveedor
2. Autoriza AWS Amplify en GitHub (si es la primera vez)
3. Selecciona el repositorio: **`EmanuelG0895/limpieza-proyecto`**
4. Selecciona la rama: **`main`**
5. Haz clic en **"Next"**

#### 2.3. Configurar Build Settings

**Pantalla 1: Agregar repositorio y ramificación**
```
✅ Repositorio: EmanuelG0895/limpieza-proyecto
✅ Ramificación: main
✅ [X] Mi aplicación es un Monorepo
✅ Directorio raíz de Monorepo: apps/web
```

**Pantalla 2: Configuración de la aplicación**
```
Nombre de la aplicación: limpieza-proyecto

--- Configuración de compilación ---
✅ Marcos detectados: Next.js
✅ Comando de compilación de frontend: npx turbo run build --filter=web
✅ Compilar el directorio de salida: apps/web/.next

--- Configuración avanzada (expandir acordeón) ---
Variables de entorno:
  AMPLIFY_DIFF_DEPLOY: false
  AMPLIFY_MONOREPO_APP_ROOT: apps/web

✅ [X] Habilitar los registros de la aplicación SSR
```

**⚠️ IMPORTANTE:** NO usar barras iniciales:
- ❌ `/apps/web` 
- ✅ `apps/web`
- ❌ `/apps/web/.next`
- ✅ `apps/web/.next`

#### 2.4. Revisar y Desplegar
1. Revisa toda la configuración en la pantalla de "Revisar"
2. Haz clic en **"Guardar y desplegar"**
3. Espera a que el build complete (5-10 minutos aproximadamente)

---

### PASO 3: Verificar el Despliegue

#### 3.1. Monitorear el Build
1. En la consola de Amplify, ve a la sección **"Builds"**
2. Observa el progreso en tiempo real
3. Verifica que cada fase se complete correctamente:
   - ✅ Provision
   - ✅ Build (preBuild → build → artifacts)
   - ✅ Deploy
   - ✅ Verify

#### 3.2. Logs Esperados (Exitosos)
```
[INFO]: # Starting phase: preBuild
[INFO]: # Executing command: npm install -g pnpm@10.19.0
[INFO]: added 1 package in 13s
[INFO]: # Executing command: cd ../../ && pnpm install && cd apps/web
[INFO]: Scope: all 7 workspace projects
[INFO]: Progress: resolved 0, reused 0, downloaded 313, added 313, done
[INFO]: Done in 5.4s using pnpm v10.19.0
[INFO]: # Completed phase: preBuild
[INFO]: # Starting phase: build
[INFO]: # Executing command: cd ../../ && pnpm turbo run build --filter=web
[INFO]: • Packages in scope: web
[INFO]: • Running build in 1 packages
[INFO]: web:build: ✓ Compiled successfully
[INFO]: # Completed phase: build
```

#### 3.3. Acceder a la Aplicación
1. Copia la URL de despliegue (ej: `https://main.d1clbmtva8g48k.amplifyapp.com`)
2. Abre en el navegador
3. Verifica que la aplicación cargue correctamente

---

## 📊 ESTRUCTURA DEL PROYECTO

```
limpieza-proyecto/
├── amplify.yml                 # ← Configuración de build de Amplify
├── package.json                # Configuración raíz del workspace
├── pnpm-workspace.yaml         # Configuración del workspace de pnpm
├── pnpm-lock.yaml              # Lockfile de dependencias
├── turbo.json                  # Configuración de Turborepo
├── apps/
│   ├── web/                    # ← App principal (Zona Principal)
│   │   ├── app/
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── .next/              # ← Directorio de salida (generado)
│   └── docs/                   # ← App de documentación (Zona Secundaria)
│       ├── app/
│       ├── next.config.ts
│       ├── package.json
│       └── .next/              # ← Directorio de salida (generado)
└── packages/
    ├── ui/                     # Componentes compartidos
    ├── typescript-config/      # Configuraciones TypeScript compartidas
    └── tailwind-config/        # Configuraciones Tailwind compartidas
```

---

## 🔍 DETALLES TÉCNICOS IMPORTANTES

### Stack Tecnológico
- **Node.js**: v18+
- **pnpm**: v10.19.0
- **Turborepo**: v2.6.3
- **Next.js**: v16.0.7
- **React**: v19.2.0

### Flujo de Compilación
1. **Provision**: AWS prepara el entorno de build
2. **Clone**: Descarga el código del repositorio
3. **preBuild**:
   - Instala pnpm globalmente
   - Navega a la raíz del proyecto
   - Ejecuta `pnpm install` (instala todas las dependencias del monorepo)
   - Vuelve al directorio de la app
4. **Build**:
   - Navega a la raíz del proyecto
   - Ejecuta Turborepo con el filtro específico (`--filter=web`)
   - Turbo compila solo la app solicitada y sus dependencias
5. **Artifacts**:
   - Empaqueta el directorio `.next`
   - Prepara los archivos para despliegue
6. **Deploy**:
   - Sube los artifacts a la CDN de Amplify
   - Configura el entorno de SSR
7. **Verify**:
   - Valida que el despliegue sea exitoso

### Variables de Entorno Clave

| Variable | Valor | Propósito |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Optimizaciones de producción |
| `AMPLIFY_DIFF_DEPLOY` | `false` | Desactiva deploys incrementales |
| `AMPLIFY_MONOREPO_APP_ROOT` | `apps/web` | Raíz de la app en el monorepo |

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de desplegar, asegúrate de:
- [ ] `amplify.yml` está en la raíz del proyecto
- [ ] Todas las rutas en `amplify.yml` son relativas (sin `/` inicial)
- [ ] `pnpm-lock.yaml` está actualizado
- [ ] Código commitado y pusheado a GitHub
- [ ] Variables de entorno configuradas en Amplify
- [ ] SSR logs habilitados

Durante el despliegue:
- [ ] Build completa sin errores
- [ ] Logs muestran "Compiled successfully"
- [ ] Deploy phase completa exitosamente

Después del despliegue:
- [ ] URL de Amplify carga la aplicación
- [ ] Página se renderiza correctamente
- [ ] No hay errores en la consola del navegador

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### Error: "cannot find binary path"
**Causa**: Turborepo no encuentra pnpm  
**Solución**: Usar `npm install -g pnpm` antes de ejecutar comandos

### Error: "No package.json found"
**Causa**: Ruta incorrecta al directorio raíz  
**Solución**: Usar `cd ../../` correctamente y verificar que vuelve a la app con `&& cd apps/web`

### Error: "baseDirectory not found"
**Causa**: Directorio de salida incorrecto  
**Solución**: Usar `apps/web/.next` (no `/apps/web`)

### Build se queda en "preBuild"
**Causa**: Instalación de dependencias falla  
**Solución**: Verificar `pnpm-lock.yaml` y limpiar caché de Amplify

### SSR no funciona
**Causa**: Logs de SSR no habilitados  
**Solución**: Activar "Habilitar los registros de la aplicación SSR" en configuración avanzada

---

## 📚 RECURSOS ADICIONALES

- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Turborepo Docs](https://turborepo.com/docs)
- [Next.js on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/server-side-rendering-amplify.html)
- [pnpm Workspace](https://pnpm.io/workspaces)

---

## 🎉 RESULTADO FINAL

Una vez completados todos los pasos, tendrás:
- ✅ Aplicación Next.js desplegada en AWS Amplify
- ✅ Build automático en cada push a `main`
- ✅ SSR (Server-Side Rendering) habilitado
- ✅ Caché optimizado para builds rápidos
- ✅ Monorepo Turborepo funcionando correctamente

**URL de ejemplo**: `https://main.d1clbmtva8g48k.amplifyapp.com`
