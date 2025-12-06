# Configuración Multi-Zone en AWS Amplify

## 📋 Resumen
Este proyecto usa **Next.js Multi-Zone** con dos aplicaciones independientes desplegadas en Amplify.

## 🏗️ Arquitectura
- **apps/web** (Zona Principal): `https://main.xxxxx.amplifyapp.com`
- **apps/docs** (Zona Secundaria): `https://main.yyyyy.amplifyapp.com`

## 🚀 Pasos de Configuración

### 1. Crear Dos Aplicaciones en Amplify

#### App 1: Web (Zona Principal)
1. En AWS Amplify Console, conecta tu repositorio
2. Selecciona la rama `main`
3. En **Build Settings**:
   - Amplify detectará automáticamente `amplify.yml`
   - Asegúrate de seleccionar: **Connecting a monorepo? Pick a folder**
   - Especifica: `apps/web`

#### App 2: Docs (Zona Secundaria)
1. En la misma aplicación Amplify, haz clic en **Add app** o crea una nueva app
2. Conecta el mismo repositorio
3. Selecciona la rama `main`
4. En **Build Settings**:
   - Selecciona: **Connecting a monorepo? Pick a folder**
   - Especifica: `apps/docs`

### 2. Configurar Variables de Entorno

#### En la App "web":
```
NODE_ENV=production
DOCS_DOMAIN=https://main.yyyyy.amplifyapp.com
```
> ⚠️ Reemplaza `https://main.yyyyy.amplifyapp.com` con la URL real de tu app docs

#### En la App "docs":
```
NODE_ENV=production
```

### 3. Configurar `AMPLIFY_MONOREPO_APP_ROOT`

#### Para App "web":
1. Ve a **App settings > Build settings**
2. En **App build specification**, edita y agrega:
```yaml
env:
  variables:
    AMPLIFY_MONOREPO_APP_ROOT: apps/web
```

#### Para App "docs":
1. Ve a **App settings > Build settings**
2. En **App build specification**, edita y agrega:
```yaml
env:
  variables:
    AMPLIFY_MONOREPO_APP_ROOT: apps/docs
```

### 4. Desplegar

1. Haz commit y push de los cambios:
```bash
git add .
git commit -m "feat: configure multi-zone for amplify"
git push
```

2. Amplify automáticamente desplegará ambas aplicaciones

3. Una vez desplegadas, copia la URL de la app **docs** y actualiza la variable de entorno `DOCS_DOMAIN` en la app **web**

4. Re-deploya la app **web** para que tome la nueva variable de entorno

## 🔗 Cómo Funciona

1. Usuario visita `https://main.xxxxx.amplifyapp.com/` → Sirve **apps/web**
2. Usuario navega a `https://main.xxxxx.amplifyapp.com/docs` → Rewrite a **apps/docs**
3. Next.js hace un proxy interno a `https://main.yyyyy.amplifyapp.com/docs`

## ✅ Verificación

Después del despliegue, verifica:
- [ ] `https://main.xxxxx.amplifyapp.com/` muestra la app web
- [ ] `https://main.yyyyy.amplifyapp.com/docs` muestra la app docs
- [ ] `https://main.xxxxx.amplifyapp.com/docs` hace rewrite y muestra docs

## 🐛 Troubleshooting

### Error 404 en /docs
- Verifica que `DOCS_DOMAIN` en app web apunte a la URL correcta de app docs
- Asegúrate de que ambas apps estén desplegadas y funcionando
- Revisa los logs de build en Amplify Console

### Build falla
- Verifica que `AMPLIFY_MONOREPO_APP_ROOT` esté configurado correctamente
- Revisa que `amplify.yml` esté en la raíz del proyecto
- Confirma que `pnpm-lock.yaml` esté actualizado

### Rewrites no funcionan
- Confirma que `DOCS_DOMAIN` esté configurado como variable de entorno
- Verifica que no haya trailing slash en `DOCS_DOMAIN`
- Revisa la configuración de CORS si hay errores de red
