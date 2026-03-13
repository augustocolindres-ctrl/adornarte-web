# AdornArte Web — Guía de Despliegue en Vercel

## ¿Qué es esto?
Esta es la versión web de AdornArte. Funciona en cualquier celular, tablet o PC
desde el navegador, sin instalar nada. Conecta al mismo Supabase que el .exe.

---

## PASO 1 — Crear cuenta en GitHub
1. Ve a https://github.com
2. Crea una cuenta gratis (si no tienes)
3. Clic en **"New repository"** (botón verde)
4. Nombre: `adornarte-web`
5. Selecciona **Private** (privado, solo tú lo ves)
6. Clic en **"Create repository"**

---

## PASO 2 — Subir los archivos a GitHub
GitHub te mostrará instrucciones. Si nunca has usado Git, usa **GitHub Desktop**:

1. Descarga GitHub Desktop: https://desktop.github.com
2. Instálalo e inicia sesión con tu cuenta de GitHub
3. Clic en **"Add an Existing Repository"**
4. Selecciona esta carpeta (`adornarte-web`)
5. Clic en **"Publish repository"**
6. Asegúrate que diga **Private** → Clic **Publish**

---

## PASO 3 — Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Clic en **"Sign Up"**
3. Elige **"Continue with GitHub"** (importante: usa la misma cuenta de GitHub)
4. Autoriza Vercel

---

## PASO 4 — Conectar tu repositorio
1. En Vercel, clic en **"Add New Project"**
2. Busca y selecciona `adornarte-web`
3. Clic en **"Import"**

---

## PASO 5 — Agregar variables de entorno (¡MUY IMPORTANTE!)
Antes de desplegar, agrega tus credenciales de Supabase:

1. En la pantalla de configuración del proyecto, busca **"Environment Variables"**
2. Agrega estas dos variables:

| Name | Value |
|------|-------|
| `REACT_APP_SUPABASE_URL` | Tu URL de Supabase (ej: https://xxxx.supabase.co) |
| `REACT_APP_SUPABASE_ANON_KEY` | Tu anon key de Supabase |

> Encuentra estos valores en: https://app.supabase.com → tu proyecto → Settings → API

3. Clic en **"Deploy"**

---

## PASO 6 — ¡Listo! 🎉
Vercel construirá la app (tarda ~2 minutos).
Al terminar te da un link tipo: `https://adornarte-web.vercel.app`

Ese link funciona en cualquier celular o PC con internet. ¡Compártelo con tus vendedoras!

---

## Actualizar la app en el futuro
Cuando hagamos cambios al código:
1. Abre GitHub Desktop
2. Clic en **"Commit to main"**
3. Clic en **"Push origin"**
4. Vercel detecta el cambio y actualiza automático en ~1 minuto ✅

---

## Seguridad
- El link de Vercel requiere login (usuario + contraseña de AdornArte)
- Los datos están en Supabase con cifrado
- Usa contraseñas fuertes para tus usuarios de AdornArte

---

## ¿Problemas?
- Si la app dice "Sin conexión": verifica que las variables de entorno en Vercel sean correctas
- Si no carga: espera 2 minutos, Vercel puede estar construyendo
- Si cambias la URL o Key de Supabase: actualiza las variables en Vercel → Settings → Environment Variables
